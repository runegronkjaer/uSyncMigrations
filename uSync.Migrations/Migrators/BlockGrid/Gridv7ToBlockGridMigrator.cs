﻿using Newtonsoft.Json;

using Umbraco.Cms.Core.Configuration.Grid;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.Strings;

using uSync.Migrations.Migrators.BlockGrid.BlockMigrators;
using uSync.Migrations.Migrators.BlockGrid.Content;
using uSync.Migrations.Migrators.BlockGrid.Config;
using uSync.Migrations.Migrators.BlockGrid.Extensions;
using uSync.Migrations.Migrators.Models;
using uSync.Migrations.Context;
using Microsoft.Extensions.Logging;
using static Umbraco.Cms.Core.Constants.HttpContext;
using uSync.Migrations.Extensions;
using Umbraco.Cms.Core.Services;

namespace uSync.Migrations.Migrators.BlockGrid;

[SyncMigrator( UmbConstants.PropertyEditors.Aliases.Grid )]
[SyncMigrator( "our.umbraco.templatablegrid" )]
[SyncMigratorVersion( 7 )]
public class Gridv7ToBlockGridMigrator : SyncPropertyMigratorBase {
  private readonly IGridConfig _gridConfig;
  private readonly SyncBlockMigratorCollection _blockMigrators;
  private readonly ILoggerFactory _loggerFactory;
  private readonly ILogger<Gridv7ToBlockGridMigrator> _logger;
  private readonly IContentTypeService _contentTypeService;

  private readonly GridConventions _conventions;

  public Gridv7ToBlockGridMigrator(
      IGridConfig gridConfig,
      SyncBlockMigratorCollection blockMigrators,
      IShortStringHelper shortStringHelper,
      ILoggerFactory loggerFactory,
      IContentTypeService contentTypeService ) {
    _gridConfig = gridConfig;
    _blockMigrators = blockMigrators;
    _conventions = new GridConventions( shortStringHelper );
    _loggerFactory = loggerFactory;
    _logger = loggerFactory.CreateLogger<Gridv7ToBlockGridMigrator>();
    _contentTypeService = contentTypeService;
  }

  public override string GetEditorAlias( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context )
  => UmbConstants.PropertyEditors.Aliases.BlockGrid;

  public override string GetDatabaseType( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context )
    => nameof( ValueStorageType.Ntext );

  public override object GetConfigValues( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
    string gridItemsConfig = dataTypeProperty.PreValues?.GetPreValueOrDefault( "items", "{}" ) ?? "{}";
    string gridRteConfig = dataTypeProperty.PreValues?.GetPreValueOrDefault( "rte", "{}" ) ?? "{}";
    string gridConfig = "{\"items\":" + gridItemsConfig + ",\"rte\":" + gridRteConfig + "}";
    //items
    var gridConfiguration = JsonConvert
      .DeserializeObject<GridConfiguration>( gridConfig );

    if ( gridConfiguration == null )
      return new BlockGridConfiguration();

    var gridToBlockContext = new GridToBlockGridConfigContext( gridConfiguration, _gridConfig );

    var contentBlockHelper = new GridToBlockGridConfigBlockHelper( _blockMigrators, _loggerFactory.CreateLogger<GridToBlockGridConfigBlockHelper>() );
    var layoutBlockHelper = new GridToBlockGridConfigLayoutBlockHelper( _conventions, _loggerFactory.CreateLogger<GridToBlockGridConfigLayoutBlockHelper>() );

    // adds content types for the core elements (headline, rte, etc)
    contentBlockHelper.AddConfigDataTypes( gridToBlockContext, context );

    // prep the layouts 
    layoutBlockHelper.AddLayoutBlocks( gridToBlockContext, context );

    // Add the content blocks
    contentBlockHelper.AddContentBlocks( gridToBlockContext, context );

    // Add the root blocks
    contentBlockHelper.AddRootBlocks( gridToBlockContext, context );

    // Get resultant configuration
    BlockGridConfiguration result = gridToBlockContext.ConvertToBlockGridConfiguration();

    // Make sure all the block elements have been added to the migration context.
    context.ContentTypes.AddElementTypes( result.Blocks.Select( x => x.ContentElementTypeKey ), true );

    return result;
  }

  public override string GetContentValue( SyncMigrationContentProperty contentProperty, SyncMigrationContext context ) {
    if ( string.IsNullOrWhiteSpace( contentProperty.Value ) )
      return string.Empty;

    // has already been converted. 
    if ( contentProperty.Value.Contains( "\"Umbraco.BlockGrid\"" ) ) {
      _logger.LogDebug( "Property [{name}] is already BlockGrid", contentProperty.EditorAlias );
      return contentProperty.Value;
    }

    var source = JsonConvert.DeserializeObject<GridValue>( contentProperty.Value );
    if ( source == null ) {
      _logger.LogDebug( "Property {alias} is empty", contentProperty.EditorAlias );
      return string.Empty;
    }

    var helper = new GridToBlockContentHelper( _conventions, _blockMigrators,
      _loggerFactory.CreateLogger<GridToBlockContentHelper>(), _contentTypeService );

    var blockValue = helper.ConvertToBlockValue( source, context );
    if ( blockValue == null ) {
      _logger.LogDebug( "Converted value for {alias} is empty", contentProperty.EditorAlias );
      return string.Empty;
    }

    return JsonConvert.SerializeObject( blockValue, Formatting.Indented );
  }
}

