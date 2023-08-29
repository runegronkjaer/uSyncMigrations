using Newtonsoft.Json;
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
using Newtonsoft.Json.Linq;
using static Umbraco.Cms.Core.PropertyEditors.ListViewConfiguration;
using Umbraco.Extensions;
using uSync.Migrations.Models;
using System.Globalization;
using System.Text.RegularExpressions;
using System.Text;
using Lucene.Net.Util;

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

    var layouts = gridToBlockContext.GridConfiguration.GetItemBlock( "layouts" );
    JArray? configSettings = layouts?.Root.Value<JArray>( "config" );
    JArray? stylesSettings = layouts?.Root.Value<JArray>( "styles" );
    configSettings.AddRange( stylesSettings );

    List<NewContentTypeProperty> configRowProperties = new();
    List<NewContentTypeProperty> configCellProperties = new();
    if ( configSettings?.Count > 0 ) {
      foreach ( JToken property in configSettings ) {
        string? label = property.Value<string>( "label" );
        if ( !string.IsNullOrEmpty( label ) ) {
          string? view = property.Value<string>( "view" );
          if ( string.IsNullOrEmpty( view ) ) {
            continue;
          }

          Guid? dataTypeGuid = null;
          if ( view.Contains( "margin", StringComparison.InvariantCultureIgnoreCase ) ) {
            dataTypeGuid = new Guid( "85ac9fd1-b825-4723-9044-77262626be01" );
          } else if ( view.Contains( "padding", StringComparison.InvariantCultureIgnoreCase ) ) {
            dataTypeGuid = new Guid( "dee9ba01-a0b3-43d7-8c38-56b345d5939c" );
          } else if ( view.Contains( "colorpicker", StringComparison.InvariantCultureIgnoreCase ) ) {
            dataTypeGuid = new Guid( "57fe41a1-1c5b-490f-88a7-b904c70a7d38" );
          } else if ( view.Contains( "textstring", StringComparison.InvariantCultureIgnoreCase ) ) {
            dataTypeGuid = new Guid( "0cc0eba1-9960-42c9-bf9b-60e150b429ae" );
          } else if ( view.Contains( "imagepicker", StringComparison.InvariantCultureIgnoreCase ) ) {
            dataTypeGuid = new Guid( "ad9f0cf2-bda2-45d5-9ea1-a63cfc873fd3" );
          }

          if ( dataTypeGuid == null ) {
            continue;
          }

          NewContentTypeProperty newContentTypeProperty = new() {
            Name = label,
            Alias = GetFriendlyUrl( label ),
            Description = property.Value<string>( "description" ) ?? "",
            DataTypeGuid = (Guid)dataTypeGuid
          };

          string? applyTo = property.Value<string>( "applyTo" );
          if ( string.IsNullOrEmpty( applyTo ) ) {
            configRowProperties.Add( newContentTypeProperty );
            configCellProperties.Add( newContentTypeProperty );
          } else if ( applyTo.Equals( "row", StringComparison.InvariantCultureIgnoreCase ) ) {
            configRowProperties.Add( newContentTypeProperty );
          } else if ( applyTo.Equals( "cell", StringComparison.InvariantCultureIgnoreCase ) ) {
            configCellProperties.Add( newContentTypeProperty );
          }
        }
      }
    }

    // prep the layouts 
    layoutBlockHelper.AddLayoutBlocks( gridToBlockContext, context, dataTypeProperty.DataTypeAlias, configRowProperties );

    // finding settingKey for cell settings
    Guid? settingKey = null;
    if ( configCellProperties.Count > 0 ) {
      string friendlyAlias = GetFriendlyUrl( dataTypeProperty.DataTypeAlias ) + "CellSettings";
      settingKey = context.GetContentTypeKeyOrDefault( friendlyAlias, friendlyAlias.ToGuid() );
      context.ContentTypes.AddNewContentType( new() {
        Key = (Guid)settingKey,
        Alias = friendlyAlias,
        Name = dataTypeProperty.DataTypeAlias + " - Settings (cell)",
        Description = "Grid cell setting",
        Folder = "BlockGrid/Settings",
        Icon = "icon-brush color-purple",
        IsElement = true,
        Properties = configCellProperties
      } );
    }

    // Add the content blocks
    contentBlockHelper.AddContentBlocks( gridToBlockContext, context, settingKey );

    // Add the root blocks
    contentBlockHelper.AddRootBlocks( gridToBlockContext, context, settingKey );

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

  private static string RemoveAccent( string text ) {
    string normalizedString = text.Normalize( NormalizationForm.FormD );
    StringBuilder stringBuilder = new();

    foreach ( char c in normalizedString ) {
      UnicodeCategory unicodeCategory = CharUnicodeInfo.GetUnicodeCategory( c );
      if ( unicodeCategory != UnicodeCategory.NonSpacingMark ) {
        stringBuilder.Append( c );
      }
    }

    return stringBuilder.ToString().Normalize( NormalizationForm.FormC );
  }

  private static string GetFriendlyUrl( string url ) {
    if ( string.IsNullOrWhiteSpace( url ) ) {
      return "";
    }

    url = url.ToLowerInvariant();
    url = url.Replace( "æ", "ae" );
    url = url.Replace( "ø", "oe" );
    url = url.Replace( "å", "aa" );
    url = RemoveAccent( url );
    url = Regex.Replace( url, @"[^a-z0-9\s-/]", "" ); // Remove all non valid chars          
    url = Regex.Replace( url, @"\s+", " " ).Trim(); // convert multiple spaces into one space  
    url = Regex.Replace( url, @"\s", "-" ); // //Replace spaces by dashes

    while ( url.Contains( "--" ) ) {
      url = url.Replace( "--", "-" );
    }

    return url;
  }
}
