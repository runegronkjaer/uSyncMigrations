﻿using System.Xml.Linq;

using Microsoft.Extensions.Logging;

using Newtonsoft.Json;

using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Services;

using uSync.Core;
using uSync.Migrations.Context;
using uSync.Migrations.Migrators;
using uSync.Migrations.Migrators.Models;
using uSync.Migrations.Serialization;
using uSync.Migrations.Services;

namespace uSync.Migrations.Handlers.Shared;
internal abstract class SharedDataTypeHandler : SharedHandlerBase<DataType> {
  protected readonly IDataTypeService _dataTypeService;
  protected readonly JsonSerializerSettings _jsonSerializerSettings;


  public SharedDataTypeHandler(
      IEventAggregator eventAggregator,
      ISyncMigrationFileService migrationFileService,
      IDataTypeService dataTypeService,
      ILogger<SharedDataTypeHandler> logger )
      : base( eventAggregator, migrationFileService, logger ) {
    _dataTypeService = dataTypeService;
    _jsonSerializerSettings = new JsonSerializerSettings() {
      ContractResolver = new SyncMigrationsContractResolver(),
      Formatting = Formatting.Indented,
    };

  }

  public override void Prepare( SyncMigrationContext context ) {
    foreach ( var datatype in _dataTypeService.GetAll() ) {
      context.DataTypes.AddDefinition( datatype.Key, datatype.EditorAlias );
    }
  }

  protected abstract string GetDatabaseType( XElement source );
  protected abstract ReplacementDataTypeInfo? GetReplacementInfo( string editorAlias, string databaseType, XElement source, SyncMigrationContext context );

  protected override void PrepareFile( XElement source, SyncMigrationContext context ) {
    (string alias, Guid dtd) = GetAliasAndKey( source );
    var editorAlias = GetEditorAlias( source );

    if ( dtd == Guid.Empty || string.IsNullOrEmpty( editorAlias ) ) return;

    var databaseType = GetDatabaseType( source );

    // replacements
    ReplacementDataTypeInfo? replacementInfo = GetReplacementInfo( editorAlias, databaseType, source, context );
    context.DataTypes.AddDefinition( dtd, editorAlias );
    if ( replacementInfo != null ) {
      context.DataTypes.AddReplacement( dtd, replacementInfo.Key );
      context.DataTypes.AddDefinition( dtd, replacementInfo.EditorAlias );

      if ( string.IsNullOrWhiteSpace( replacementInfo.Variation ) == false ) {
        context.DataTypes.AddVariation( dtd, replacementInfo.Variation );
      }
    }

    // add alias, (won't update if replacement was added)
    context.DataTypes.AddDefinition( dtd, editorAlias );
  }

  protected abstract string GetEditorAlias( XElement source );
  protected abstract string GetDataTypeName( XElement source );
  protected abstract string GetDataTypeFolder( XElement source );

  protected abstract SyncMigrationDataTypeProperty GetMigrationDataTypeProperty( string editorAlias, string database, XElement source );
  protected abstract object? GetDataTypeConfig( ISyncPropertyMigrator? migrator, SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context );
  protected abstract object? MakeEmptyLabelConfig( SyncMigrationDataTypeProperty dataTypeProperty );

  protected abstract string GetNewEditorAlias( ISyncPropertyMigrator? migrator, SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context );
  protected abstract string GetNewDatabaseType( ISyncPropertyMigrator? migrator, SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context );

  protected virtual int GetLevel( XElement source, int level ) => source.GetLevel();

  protected override XElement? MigrateFile( XElement source, int level, SyncMigrationContext context ) {
    var (alias, key) = GetAliasAndKey( source );
    var editorAlias = GetEditorAlias( source );

    if ( context.DataTypes.GetReplacement( key ) != key ) {
      // this data type has been replaced and isn't to be migrated
      return null;
    }

    var name = GetDataTypeName( source );
    var folder = GetDataTypeFolder( source );
    var databaseType = GetDatabaseType( source );

    var migrator = context.Migrators.TryGetMigrator( editorAlias );
    if ( migrator is null ) {
      // no migrator. 
    }

    var dataTypeProperty = GetMigrationDataTypeProperty( editorAlias, databaseType, source );
    var newEditorAlias = GetNewEditorAlias( migrator, dataTypeProperty, context );
    var newDatabaseType = GetNewDatabaseType( migrator, dataTypeProperty, context );
    var newConfig = GetDataTypeConfig( migrator, dataTypeProperty, context ) ?? MakeEmptyLabelConfig( dataTypeProperty );

    return MakeMigratedXml( key, name, GetLevel( source, level ), newEditorAlias, newDatabaseType, folder, newConfig );
  }

  protected virtual XElement MakeMigratedXml(
      Guid key, string name, int level, string newEditorAlias,
      string newDatabaseType, string folder, object? config ) {

    // now we write the new xml. 
    var target = new XElement( "DataType",
        new XAttribute( uSyncConstants.Xml.Key, key ),
        new XAttribute( uSyncConstants.Xml.Alias, name ),
        new XAttribute( uSyncConstants.Xml.Level, level ),
        new XElement( uSyncConstants.Xml.Info,
            new XElement( uSyncConstants.Xml.Name, name ),
            new XElement( "EditorAlias", newEditorAlias ),
            new XElement( "DatabaseType", newDatabaseType ) ) );

    if ( string.IsNullOrWhiteSpace( folder ) == false ) {
      target.Element( uSyncConstants.Xml.Info )?.Add( new XElement( "Folder", folder ) );
    }

    if ( config != null ) {
      target.Add( new XElement( "Config",
          new XCData( JsonConvert.SerializeObject( config, _jsonSerializerSettings ) ) ) );
    }

    return target;
  }

}
