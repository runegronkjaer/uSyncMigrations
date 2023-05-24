using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using uSync.Migrations.Context;
using uSync.Migrations.Extensions;
using uSync.Migrations.Migrators.Models;

namespace uSync.Migrations.Migrators.Custom {
  [SyncMigrator( "nuPickers.XmlRadioButtonPicker" )]
  public class NuPickersXmlRadioButtonPickerToUmbracoRadioButtonList : SyncPropertyMigratorBase {
    public override string GetEditorAlias( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) => "Umbraco.RadioButtonList";

    public override string GetDatabaseType( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
      return "Nvarchar";
    }

    public override object GetConfigValues( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
      var config = new JObject();

      JObject? obj = (JObject?)JsonConvert.DeserializeObject( dataTypeProperty.PreValues?.GetPreValueOrDefault( "dataSource", string.Empty ) );
      string? xPath = (string?)obj?.Properties()?.FirstOrDefault(p => p.Name == "xPath")?.Value;

      if ( xPath == null ) {
        return config;
      }

      if ( xPath?.Equals( "//bannerSize" ) == true ) {
        config.Add( "items", new JArray( new JObject { { "id", 1 }, { "value", "Lav" } }, new JObject { { "id", 2 }, { "value", "Medium (default)" } }, new JObject { { "id", 3 }, { "value", "Stor" } }, new JObject { { "id", 4 }, { "value", "Original" } } ) );
      } else if ( xPath?.Equals( "//buttonSize" ) == true ) {
        config.Add( "items", new JArray( new JObject { { "id", 1 }, { "value", "Lille" } }, new JObject { { "id", 2 }, { "value", "Normal (default)" } }, new JObject { { "id", 3 }, { "value", "Stor" } } ) );
      } else if ( xPath?.Equals( "//paddingHorizontalItem" ) == true ) {
        config.Add( "items", new JArray( new JObject { { "id", 1 }, { "value", "Ingen (default)" } }, new JObject { { "id", 2 }, { "value", "Lidt" } }, new JObject { { "id", 3 }, { "value", "Meget" } } ) );
      } else if ( xPath?.Equals( "//paddingVerticalItem" ) == true ) {
        config.Add( "items", new JArray( new JObject { { "id", 1 }, { "value", "Ingen (default)" } }, new JObject { { "id", 2 }, { "value", "Mindre" } }, new JObject { { "id", 3 }, { "value", "Normal" } }, new JObject { { "id", 4 }, { "value", "Mere" } } ) );
      }

      return config;
    }
  }
}
