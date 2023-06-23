using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NUglify.Helpers;
using NUglify.JavaScript.Syntax;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.PropertyEditors;
using uSync.Migrations.Context;
using uSync.Migrations.Extensions;
using uSync.Migrations.Migrators.Models;
using uSync.Migrations.Migrators.Models.UrlPicker;

namespace uSync.Migrations.Migrators.Custom {
  [SyncMigrator( "nuPickers.DotNetPrefetchListPicker" )]
  public class NuPickersDotNetPrefetchListPickerToUmbracoTypes : SyncPropertyMigratorBase {
    private readonly ILogger _logger;
    private readonly Dictionary<int, string> dict = new() {
            { 1, "Elradiator" },
            { 2, "Naturgas" },
            { 3, "Olie" },
            { 4, "Træpiller" },
            { 5, "Varmepumpe" }
    };

    public NuPickersDotNetPrefetchListPickerToUmbracoTypes( ILogger<NuPickersDotNetPrefetchListPickerToUmbracoTypes> logger ) {
      _logger = logger;
    }
    public override string GetEditorAlias( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
      string? className = GetClassName( dataTypeProperty );

      if ( className == null ) {
        return "";
      }

      switch ( className ) {
        case "DffEdb.Umb.Api.DataSources.ContentTypeDotnetDataSource":
          return "Umbraco.TextArea";
        case "DffEdb.Umb.Api.DataSources.DocTypeDotNetDataSource":
          return "Umbraco.MultiNodeTreePicker";
        case "DffEdb.Umb.Api.DataSources.PrisberegnerVarmekildeDotNetDataSource":
          return "Umbraco.CheckBoxList";
      }

      return "";
    }

    public override string GetDatabaseType( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
      string? className = GetClassName( dataTypeProperty );

      if ( className?.Equals( "DffEdb.Umb.Api.DataSources.PrisberegnerVarmekildeDotNetDataSource" ) == true ) {
        return "Nvarchar";
      } else {
        return "Ntext";
      }
    }

    public override object GetConfigValues( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
      string? className = GetClassName( dataTypeProperty );

      var config = new JObject();
      if ( className == null ) {
        return config;
      }

      switch ( className ) {
        case "DffEdb.Umb.Api.DataSources.ContentTypeDotnetDataSource":
          return config;
        case "DffEdb.Umb.Api.DataSources.DocTypeDotNetDataSource":
          return new MultiNodePickerConfiguration() {
            TreeSource = new MultiNodePickerConfigurationTreeSource() {
              ObjectType = "content",
              StartNodeQuery = "$root/vaerk[1]/eforsyning[1]"
            },
            MinNumber = 0,
            MaxNumber = 0,
            ShowOpen = false,
            IgnoreUserStartNodes = false
          };
        case "DffEdb.Umb.Api.DataSources.PrisberegnerVarmekildeDotNetDataSource":
          JArray prisberegnerValues = new();
          dict.ForEach( d => prisberegnerValues.Add( new JObject { { "id", d.Key }, { "value", d.Value } } ) );
          config.Add( "items", prisberegnerValues );

          break;
      }

      return config;
    }

    public override string GetContentValue( SyncMigrationContentProperty contentProperty, SyncMigrationContext context ) {
      //_logger.LogWarning( "NuPickersDotNetPrefetchListPickerToUmbracoTypes: " + contentProperty.Value );
      string? contentPropertyValue = contentProperty.Value;

      if ( string.IsNullOrEmpty( contentPropertyValue ) ) {
        return "";
      } else if ( contentPropertyValue.StartsWith( "MitForbrug" ) ) {
        _logger.LogWarning( "NuPickersDotNetPrefetchListPickerToUmbracoTypes value starts with 'MitForbrug': " + contentProperty.Value );
        return "";
      } else if ( contentPropertyValue.Split( "," ).All( i => int.TryParse( i, out int result ) && result < 6 ) ) {
        int[] ids = Array.ConvertAll( contentPropertyValue.Split( "," ), s => int.Parse( s ) );
        List<string> returnData = new();
        foreach ( int id in ids ) {
          if ( dict.TryGetValue( id, out string value ) ) {
            returnData.Add( value );
          }
        }

        return JsonConvert.SerializeObject( returnData );
      } else if ( contentPropertyValue.Split( "," ).All( i => int.TryParse( i, out int result ) ) ) {
        int[] ids = Array.ConvertAll( contentPropertyValue.Split( "," ), s => int.Parse( s ) );

        return string.Join( "\n", ids );
      } else {
        _logger.LogWarning( "NuPickersDotNetPrefetchListPickerToUmbracoTypes could not identify value: " + contentProperty.Value );
      }

      //var urlPicker = JsonConvert.DeserializeObject<UrlPicker>( contentProperty.Value );

      //var values = new Dictionary<string, string>();
      //if ( urlPicker != null ) {
      //  values.Add( "name", urlPicker.Value.Meta.Title );
      //  bool.TryParse( urlPicker.Value.Meta.NewWindow, out var newWindow );

      //  if ( newWindow ) { values.Add( "target", "_blank" ); }

      //  switch ( urlPicker.Value.Type ) {
      //    case UrlPickerTypes.Content:

      //      var guid = context.GetKey( int.Parse( urlPicker.Value.TypeData.ContentId ) );
      //      if ( guid != Guid.Empty ) {
      //        var contentUdi = Udi.Create( UmbConstants.UdiEntityType.Document, guid );
      //        values.Add( "udi", contentUdi.ToString() );
      //      }

      //      break;
      //    case UrlPickerTypes.Media:

      //      guid = context.GetKey( int.Parse( urlPicker.Value.TypeData.MediaId ) );
      //      if ( guid != Guid.Empty ) {
      //        var contentUdi = Udi.Create( UmbConstants.UdiEntityType.Media, guid );
      //        values.Add( "udi", contentUdi.ToString() );
      //      }
      //      break;

      //    case UrlPickerTypes.Url:
      //      values.Add( "url", urlPicker.Value.TypeData.Url );
      //      break;

      //    default: break;
      //  }
      //}
      //return JsonConvert.SerializeObject( values );

      return "";
    }

    private string? GetClassName( SyncMigrationDataTypeProperty dataTypeProperty ) {
      string? dataSourceStr = dataTypeProperty.PreValues?.GetPreValueOrDefault( "dataSource", string.Empty );
      JObject? obj = string.IsNullOrEmpty( dataSourceStr ) ? null : (JObject?)JsonConvert.DeserializeObject( dataSourceStr );
      return (string?)obj?.Properties()?.FirstOrDefault( p => p.Name == "className" )?.Value;
    }
  }
}
