using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;

using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.Blocks;
using Umbraco.Cms.Core.Services;
using Umbraco.Extensions;

using uSync.Migrations.Context;
using uSync.Migrations.Migrators.BlockGrid.BlockMigrators;
using uSync.Migrations.Migrators.BlockGrid.Extensions;
using uSync.Migrations.Migrators.BlockGrid.Models;
using uSync.Migrations.Migrators.Models;
using uSync.Migrations.Models;

namespace uSync.Migrations.Migrators.BlockGrid.Content;

/// <summary>
///  helper class that actually gets content from the grid and puts it into the blocklist. 
/// </summary>
internal class GridToBlockContentHelper {
  private readonly SyncBlockMigratorCollection _blockMigrators;
  private readonly GridConventions _conventions;
  private readonly ILogger<GridToBlockContentHelper> _logger;
  private readonly IContentTypeService _contentTypeService;
  private Dictionary<string, Dictionary<string, Guid>>? AllElementTypeDataTypeKeys;
  private Dictionary<string, IContentType>? AllElementTypes;

  public GridToBlockContentHelper(
        GridConventions gridConventions,
        SyncBlockMigratorCollection blockMigrators,
        ILogger<GridToBlockContentHelper> logger,
        IContentTypeService contentTypeService ) {
    _blockMigrators = blockMigrators;
    _conventions = gridConventions;
    _logger = logger;
    _contentTypeService = contentTypeService;
  }

  /// <summary>
  ///  convert a grid value (so with sections, rows, areas and controls) into a block value for a grid.
  /// </summary>
  public BlockValue? ConvertToBlockValue( GridValue source, SyncMigrationContext context ) {
    // empty grid check
    if ( source.Sections.Any() != true ) return null;

    var sectionContentTypeAlias = _conventions.SectionContentTypeAlias( source.Name );

    var sections = source.Sections
        .Select( x => (Grid: x.Grid.GetIntOrDefault( 0 ), x.Rows) )
        .ToArray();

    var gridColumns = sections.Sum( x => x.Grid );

    var block = new BlockValue();

    var blockLayouts = new List<BlockGridLayoutItem>();

    foreach ( var (sectionColums, rows) in sections ) {
      var sectionIsFullWidth = sectionColums == gridColumns;

      foreach ( var row in rows ) {
        var areas = row.Areas.Select( ( x, i ) => (x, i) );

        var rowColumns = row.Areas.Sum( x => x.Grid.GetIntOrDefault( 0 ) );
        var rowIsFullWidth = sectionIsFullWidth && rowColumns == gridColumns;

        var rowLayoutAreas = new List<BlockGridLayoutAreaItem>();

        foreach ( var area in row.Areas.Select( ( value, index ) => (value, index) ) ) {
          var areaIsFullWidth = rowIsFullWidth && area.value.Grid.GetIntOrDefault( 0 ) == gridColumns;

          // get the content
          var contentAndSettings = GetGridAreaBlockContent( area.value, context ).ToList();
          if ( !contentAndSettings.Any() ) continue;

          // get the layouts 
          var layouts = GetGridAreaBlockLayouts( area.value, contentAndSettings ).ToList();
          if ( !layouts.Any() ) continue;

          if ( areaIsFullWidth ) {
            blockLayouts.AddRange( layouts );
          } else {
            var areaItem = new BlockGridLayoutAreaItem {
              Key = _conventions.LayoutAreaAlias( row.Name, _conventions.AreaAlias( area.index ) ).ToGuid(),
              Items = layouts.ToArray()
            };

            rowLayoutAreas.Add( areaItem );
          }

          // add the content and settings to the block. 
          contentAndSettings.ForEach( x => {
            block.ContentData.Add( x.Content );
            if ( x.Settings != null ) {
              block.SettingsData.Add( x.Settings );
            }
          } );
        }

        // row 
        if ( !rowLayoutAreas.Any() ) continue;

        var rowContent = GetGridRowBlockContent( row, context );

        block.ContentData.Add( rowContent );
        blockLayouts.Add( GetGridRowBlockLayout( rowContent, rowLayoutAreas, rowColumns ) );
      }

      // section 
    }

    // end - process layouts into block format. 
    block.Layout = new Dictionary<string, JToken>
    {
            { UmbConstants.PropertyEditors.Aliases.BlockGrid, JToken.FromObject(blockLayouts) }
        };

    return block;
  }

  private IEnumerable<BlockContentPair> GetGridAreaBlockContent( GridValue.GridArea area, SyncMigrationContext context ) {
    foreach ( var control in area.Controls ) {
      var content = GetBlockItemDataFromGridControl( control, context );
      if ( content == null ) continue;

      BlockItemData? settings = null;
      // TODO Settings ? 

      yield return new BlockContentPair( content, settings );
    }
  }

  private IEnumerable<BlockGridLayoutItem> GetGridAreaBlockLayouts( GridValue.GridArea area, IEnumerable<BlockContentPair> contentAndSettings ) {
    foreach ( var item in contentAndSettings ) {
      var layout = new BlockGridLayoutItem {
        ContentUdi = item.Content.Udi,
        SettingsUdi = item.Settings?.Udi,
        ColumnSpan = area.Grid.GetIntOrDefault( 0 ),
        RowSpan = 1
      };

      yield return layout;
    }
  }

  private BlockItemData GetGridRowBlockContent( GridValue.GridRow row, SyncMigrationContext context ) {
    var rowLayoutContentTypeAlias = _conventions.LayoutContentTypeAlias( row.Name );
    var rowContentTypeKey = context.GetContentTypeKeyOrDefault( rowLayoutContentTypeAlias, rowLayoutContentTypeAlias.ToGuid() );

    return new BlockItemData {
      Udi = Udi.Create( UmbConstants.UdiEntityType.Element, row.Id ),
      ContentTypeKey = rowContentTypeKey,
      ContentTypeAlias = rowLayoutContentTypeAlias
    };
  }

  private BlockGridLayoutItem GetGridRowBlockLayout( BlockItemData rowContent, List<BlockGridLayoutAreaItem> rowLayoutAreas, int? rowColumns ) {
    return new BlockGridLayoutItem {
      ContentUdi = rowContent.Udi,
      Areas = rowLayoutAreas.ToArray(),
      ColumnSpan = rowColumns,
      RowSpan = 1,
    };
  }

  private BlockItemData? GetBlockItemDataFromGridControl( GridValue.GridControl control, SyncMigrationContext context ) {
    if ( control.Value == null ) return null;

    var blockMigrator = _blockMigrators.GetMigrator( control.Editor );
    if ( blockMigrator == null ) {
      _logger.LogWarning( "No Block Migrator for [{editor}/{view}]", control.Editor.Alias, control.Editor.View );
      return null;
    }

    var contentTypeAlias = blockMigrator.GetContentTypeAlias( control );
    if ( contentTypeAlias == null ) {
      _logger.LogWarning( "No contentTypeAlias from migrator {migrator}", blockMigrator.GetType().Name );
      return null;
    }

    Guid contentTypeKey = context.ContentTypes.GetKeyByAlias( contentTypeAlias );
    if ( contentTypeKey == Guid.Empty && GetAllElementTypes().TryGetValue( contentTypeAlias, out IContentType? contentType ) && contentType != null ) {
      //Some grid elements have been created on the fly by the settings migration and might not be available at this point
      //Luckily we can get the new content type from Umbraco instead
      contentTypeKey = contentType?.GetUdi().Guid ?? Guid.Empty;
    }

    if ( contentTypeKey == Guid.Empty ) {
      _logger.LogWarning( "Cannot find content type key from alias {alias}", contentTypeAlias );
      return null;
    }

    var data = new BlockItemData {
      Udi = Udi.Create( UmbConstants.UdiEntityType.Element, Guid.NewGuid() ),
      ContentTypeAlias = contentTypeAlias,
      ContentTypeKey = contentTypeKey
    };

    foreach ( var (gridProperty, value) in blockMigrator.GetPropertyValues( control, context ) ) {
      try {
        Migrations.Models.EditorAliasInfo? editorAlias = null;
        string? propertyValue = null;
        string? propertyAlias = null;
        if ( value is JObject valueAsObject && valueAsObject.Value<string>( "editorAlias" ) != null ) {
          //If this is hit we have a LeBlender grid element

          string? newDataTypeGuidString = valueAsObject.Value<string>( "dataTypeGuid" );
          propertyAlias = valueAsObject.Value<string>( "editorAlias" );
          propertyValue = valueAsObject.Value<object>( "value" )?.ToString();
          string? propertyName = valueAsObject.Value<string>( "editorName" );

          AddRawPropertyValues( data, propertyAlias, propertyValue );
        } else if ( value is JValue jValue ) {
          //If this is hit we have a LeBlender grid element

          propertyAlias = gridProperty;
          AddRawPropertyValues( data, propertyAlias, jValue.Value<string>() );
        } else if ( value is JToken valueAsToken && valueAsToken.Values().FirstOrDefault() is JProperty ) {
          //If this is hit we have a LeBlender grid element

          foreach ( JProperty childToken in valueAsToken.Values() ) {
            string? newDataTypeGuidString = childToken.Value["dataTypeGuid"]?.Value<string>();
            propertyAlias = childToken.Value["editorAlias"]?.Value<string>();
            propertyValue = childToken.Value["value"]?.ToString();
            string? propertyName = childToken.Value["editorName"]?.Value<string>();

            AddRawPropertyValues( data, propertyAlias, propertyValue );
          }
        } else if ( value is string valueAsStr ) {
          //This is the default grid elements
          Dictionary<string, Dictionary<string, Guid>> allElementTypes = GetAllElementTypeDataTypeKeys();
          propertyAlias = gridProperty;
          propertyValue = valueAsStr;

          AddRawPropertyValues( data, propertyAlias, propertyValue );
        } else if ( value is JToken valueAsToken2 ) {
          //This is the default grid elements
          Dictionary<string, Dictionary<string, Guid>> allElementTypes = GetAllElementTypeDataTypeKeys();
          propertyAlias = gridProperty;
          propertyValue = valueAsToken2.ToString();
          if ( allElementTypes.TryGetValue( contentTypeAlias, out Dictionary<string, Guid>? contentTypeProperties ) && contentTypeProperties?.Any() == true ) {
            if ( contentTypeProperties.TryGetValue( propertyAlias, out Guid newDataTypeGuid ) ) {
              Guid oldDataTypeGuid = context.DataTypes.GetReplacement( newDataTypeGuid );
              string? oldEditorAlias = context.DataTypes.GetByDefinition( oldDataTypeGuid )?.EditorAlias;

              ISyncPropertyMigrator? migrator = context.Migrators.TryGetMigrator( oldEditorAlias );

              if ( migrator != null ) {
                SyncMigrationContentProperty property = new(
                    contentTypeAlias, propertyAlias,
                    oldEditorAlias, propertyValue );
                propertyValue = migrator.GetContentValue( property, context );
                _logger.LogDebug( "Migrator: {migrator} returned {value}", migrator.GetType().Name, propertyValue );
              } else {
                _logger.LogDebug( "No Block Migrator found for [{alias}] (value will be passed through)", editorAlias.OriginalEditorAlias );
              }
            }
          }
          AddRawPropertyValues( data, propertyAlias, propertyValue );
        }
      } catch ( Exception ex ) {
        throw new Exception( $"gridProperty: {gridProperty} - value: {value}", ex );
      }
    }

    return data;
  }

  private Dictionary<string, Dictionary<string, Guid>> GetAllElementTypeDataTypeKeys() {
    if ( AllElementTypeDataTypeKeys != null ) {
      return AllElementTypeDataTypeKeys;
    }
    AllElementTypeDataTypeKeys = GetAllElementTypes().ToDictionary( et => et.Key, et => et.Value.PropertyGroups.SelectMany( pg => pg.PropertyTypes?.ToList() ?? new List<IPropertyType>() ).ToDictionary( pt => pt.Alias, pt => pt.DataTypeKey ) );

    return AllElementTypeDataTypeKeys;
  }

  private Dictionary<string, IContentType> GetAllElementTypes() {
    if ( AllElementTypes != null ) {
      return AllElementTypes;
    }
    AllElementTypes = _contentTypeService.GetAllElementTypes().ToDictionary( et => et.Alias, et => et );

    return AllElementTypes;
  }

  private EditorAliasInfo? GetEditorAliasInfo( SyncMigrationContext context, string? newDataTypeGuidString, string? propertyAlias ) {
    if ( Guid.TryParse( newDataTypeGuidString, out Guid newDataTypeGuid ) && !string.IsNullOrEmpty( propertyAlias ) ) {
      Guid oldDataTypeGuid = context.DataTypes.GetReplacement( newDataTypeGuid );
      string? oldEditorAlias = context.DataTypes.GetByDefinition( oldDataTypeGuid )?.EditorAlias;
      return context.ContentTypes.GetEditorAliasByNewEditorAlias( oldEditorAlias );
    }

    return null;
  }

  private void AddRawPropertyValues( BlockItemData data, string? propertyAlias, string? propertyValue ) {
    if ( !string.IsNullOrEmpty( propertyAlias ) ) {
      data.RawPropertyValues[propertyAlias] = propertyValue;
    }
  }
}

internal static class GridToBlockContentExtensions {
  public static int GetIntOrDefault( this string? value, int defaultValue )
      => int.TryParse( value, out var intValue ) ? intValue : defaultValue;
}
