using Newtonsoft.Json.Linq;
using Umbraco.Cms.Core.Configuration.Grid;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Strings;
using Umbraco.Extensions;
using uSync.Migrations.Composing;
using uSync.Migrations.Context;
using uSync.Migrations.Migrators.BlockGrid.Extensions;
using uSync.Migrations.Migrators.Models;
using uSync.Migrations.Models;
using static Umbraco.Cms.Core.Constants.HttpContext;

namespace uSync.Migrations.Migrators.BlockGrid.BlockMigrators;

/// <summary>
///  base for 'simple' grid things (like text, quote, etc) they all follow a pattern.
/// </summary>
public abstract class GridBlockMigratorSimpleBase {
  protected readonly IShortStringHelper _shortStringHelper;

  public GridBlockMigratorSimpleBase( IShortStringHelper shortStringHelper ) {
    _shortStringHelper = shortStringHelper;
  }

  public abstract string GetEditorAlias( IGridEditorConfig editor );

  /// <summary>
  ///  for the simple migrators we create a new doctype to try and migrate the data into.
  /// </summary>
  /// <param name="editorConfig"></param>
  /// <returns></returns>
  public IEnumerable<NewContentTypeInfo> AdditionalContentTypes( IGridEditorConfig editor, SyncMigrationContext context ) {
    var alias = this.GetContentTypeAlias( editor );

    List<NewContentTypeProperty> properties = new()      {
        new NewContentTypeProperty {
          Alias = editor.Alias,
          Name = editor.Name ?? editor.Alias,
          DataTypeAlias = this.GetEditorAlias(editor)
        }
      };
    if ( editor.Config?.Any() == true && editor.Config.TryGetValue( "editors", out object? val ) && val is JArray editorsJson ) {
      foreach ( JToken editorJson in editorsJson ) {
        string? name = editorJson.Value<string>( "name" );
        string? propAlias = editorJson.Value<string>( "alias" );
        string? dataTypeGuidStr = editorJson.Value<string>( "dataType" );
        string? description = editorJson.Value<string>( "description" );

        if ( !string.IsNullOrEmpty( propAlias ) && !string.IsNullOrEmpty( dataTypeGuidStr ) && Guid.TryParse( dataTypeGuidStr, out Guid dataTypeGuid ) ) {
          Guid finalDataTypeGuid = context.DataTypes.GetReplacement( dataTypeGuid );
          DataTypeInfo? originalDefinition = context.DataTypes.GetByDefinition( dataTypeGuid );
          ISyncPropertyMigrator? migrator = context.Migrators.TryGetMigrator( originalDefinition?.EditorAlias );
          string newDataTypeAlias = context.DataTypes.GetAlias( finalDataTypeGuid );
          string? newEditorAlias = migrator?.GetEditorAlias( new SyncMigrationDataTypeProperty( newDataTypeAlias, originalDefinition?.EditorAlias, "", "" ), context );

          context.ContentTypes.AddProperty( alias, propAlias, dataTypeGuid == finalDataTypeGuid ? originalDefinition?.EditorAlias : null, newEditorAlias );
          properties.Add( new NewContentTypeProperty {
            Alias = propAlias,
            Name = name ?? propAlias,
            DataTypeGuid = finalDataTypeGuid,
          } );
        }
      }
    }

    return new NewContentTypeInfo {
      Key = alias.ToGuid(),
      Alias = alias,
      Name = editor.Name ?? editor.Alias,
      Description = $"Converted from Grid {editor.Name} element",
      Icon = $"{editor.Icon ?? "icon-book"} color-purple",
      IsElement = true,
      Folder = "BlockGrid/Elements",
      Properties = properties,
    }.AsEnumerableOfOne();
  }

  public virtual IEnumerable<string> GetAllowedContentTypes( IGridEditorConfig config, SyncMigrationContext context )
    => GetContentTypeAlias( config ).AsEnumerableOfOne();

  public virtual string GetContentTypeAlias( GridValue.GridControl control )
    => control.Editor.Alias.GetBlockElementContentTypeAlias( _shortStringHelper );

  public virtual string GetContentTypeAlias( IGridEditorConfig editorConfig )
    => editorConfig.Alias.GetBlockElementContentTypeAlias( _shortStringHelper );

  public virtual Dictionary<string, object> GetPropertyValues( GridValue.GridControl control, SyncMigrationContext context ) {
    //return new Dictionary<string, object>
    //{
    //  { control.Editor.Alias, control.Value ?? string.Empty }
    //};


    Dictionary<string, object> propertyValues = new();

    string contentTypeAlias = GetContentTypeAlias( control );
    if ( string.IsNullOrWhiteSpace( contentTypeAlias ) ) return propertyValues;

    JArray? controlValues = control.Value as JArray;
    if ( controlValues == null ) return propertyValues;

    foreach ( JObject test in controlValues ) {
      var elementValue = test.ToObject<IDictionary<string, object>>();

      if ( elementValue == null ) return propertyValues;

      foreach ( var (propertyAlias, value) in elementValue ) {
        var editorAlias = context.ContentTypes.GetEditorAliasByTypeAndProperty( contentTypeAlias, propertyAlias );

        if ( editorAlias == null ) continue;

        var migrator = context.Migrators.TryGetMigrator( editorAlias.OriginalEditorAlias );

        var propertyValue = value;

        if ( migrator != null ) {
          var property = new SyncMigrationContentProperty(
            contentTypeAlias,
            propertyAlias,
            editorAlias.OriginalEditorAlias,
            value?.ToString() ?? string.Empty );

          propertyValue = migrator.GetContentValue( property, context );
        }

        propertyValues[propertyAlias] = propertyValue;
      }
    }

    return propertyValues;
  }
}


