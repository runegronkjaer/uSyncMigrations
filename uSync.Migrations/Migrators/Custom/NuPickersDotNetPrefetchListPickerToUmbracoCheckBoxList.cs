using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Umbraco.Cms.Core.PropertyEditors;
using uSync.Migrations.Context;
using uSync.Migrations.Extensions;
using uSync.Migrations.Migrators.Models;

namespace uSync.Migrations.Migrators.Custom {
  [SyncMigrator( "nuPickers.DotNetPrefetchListPicker" )]
  public class NuPickersDotNetPrefetchListPickerToUmbracoCheckBoxList : SyncPropertyMigratorBase {
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
          config.Add( "items", new JArray(
            new JObject { { "id", 1 }, { "value", "Elradiator" } },
            new JObject { { "id", 2 }, { "value", "Naturgas" } },
            new JObject { { "id", 3 }, { "value", "Olie" } },
            new JObject { { "id", 4 }, { "value", "Træpiller" } },
            new JObject { { "id", 5 }, { "value", "Varmepumpe" } }
          ) );

          break;
      }

      return config;
    }

    private string? GetClassName( SyncMigrationDataTypeProperty dataTypeProperty ) {
      string? dataSourceStr = dataTypeProperty.PreValues?.GetPreValueOrDefault( "dataSource", string.Empty );
      JObject? obj = string.IsNullOrEmpty( dataSourceStr ) ? null : (JObject?)JsonConvert.DeserializeObject( dataSourceStr );
      return (string?)obj?.Properties()?.FirstOrDefault( p => p.Name == "className" )?.Value;
    }
  }
}
