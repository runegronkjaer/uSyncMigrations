using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text;
using Umbraco.Cms.Core.PropertyEditors;
using uSync.Migrations.Context;
using uSync.Migrations.Extensions;
using uSync.Migrations.Migrators.Models;

namespace uSync.Migrations.Migrators.Custom {
  [SyncMigrator( "nuPickers.DotNetDropDownPicker" )]
  public class NuPickersDotNetDropDownPickerToUmbracoMultiNodeTreePicker : SyncPropertyMigratorBase {
    public override string GetEditorAlias( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) => "Umbraco.MultiNodeTreePicker";

    public override string GetDatabaseType( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
      return "Ntext";
    }

    public override object GetConfigValues( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
      var config = new JObject();

      JObject? obj = (JObject?)JsonConvert.DeserializeObject( dataTypeProperty.PreValues?.GetPreValueOrDefault( "dataSource", string.Empty ) );
      string? className = (string?)obj?.Properties()?.FirstOrDefault( p => p.Name == "className" )?.Value;

      if ( className == null ) {
        return config;
      }

      if ( className?.Equals( "DffEdb.Umb.Api.DataSources.EforsyningerDotNetDataSource" ) == true ) {
       return new MultiNodePickerConfiguration() {
          TreeSource = new MultiNodePickerConfigurationTreeSource() {
            ObjectType = "content",
            StartNodeQuery = "$current/ancestor::vaerk"
          },
          Filter = "eforsyning",
          MinNumber = 0,
          MaxNumber = 1,
          ShowOpen = false,
          IgnoreUserStartNodes = false
        };
      }

      return config;
    }
  }
}
