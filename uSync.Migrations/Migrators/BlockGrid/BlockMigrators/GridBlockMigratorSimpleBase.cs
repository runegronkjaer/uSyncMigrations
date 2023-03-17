﻿using Newtonsoft.Json.Linq;
using Umbraco.Cms.Core.Configuration.Grid;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Strings;
using Umbraco.Extensions;
using uSync.Migrations.Context;
using uSync.Migrations.Migrators.BlockGrid.Extensions;
using uSync.Migrations.Models;

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
  public IEnumerable<NewContentTypeInfo> AdditionalContentTypes( IGridEditorConfig editor ) {
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
          properties.Add(  new NewContentTypeProperty {
            Alias = propAlias,
            Name = name ?? propAlias,
            DataTypeGuid = dataTypeGuid,
          });
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
    return new Dictionary<string, object>
    {
      { control.Editor.Alias, control.Value ?? string.Empty }
    };
  }
}


