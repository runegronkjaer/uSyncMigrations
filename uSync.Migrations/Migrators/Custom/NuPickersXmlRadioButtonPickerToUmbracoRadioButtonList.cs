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
      string? xPath = (string?)obj?.Properties()?.FirstOrDefault( p => p.Name == "xPath" )?.Value;

      if ( xPath == null ) {
        return config;
      }

      if ( xPath?.Equals( "//bannerSize" ) == true ) {
        config.Add( "items", new JArray( new JObject { { "id", 1 }, { "value", "Lav" } }, new JObject { { "id", 2 }, { "value", "Medium (default)" } }, new JObject { { "id", 3 }, { "value", "Stor" } }, new JObject { { "id", 4 }, { "value", "Original" } } ) );
        context.Migrators.AddCustomValues( $"radio_{dataTypeProperty.DataTypeAlias}", new() { { "1418", "Lav" }, { "1419", "Medium (default)" }, { "1420", "Stor" }, { "1423", "Original" } } );
      } else if ( xPath?.Equals( "//buttonSize" ) == true ) {
        config.Add( "items", new JArray( new JObject { { "id", 1 }, { "value", "Lille" } }, new JObject { { "id", 2 }, { "value", "Normal (default)" } }, new JObject { { "id", 3 }, { "value", "Stor" } } ) );
        context.Migrators.AddCustomValues( $"radio_{dataTypeProperty.DataTypeAlias}", new() { { "1718", "Lille" }, { "1719", "Normal (default)" }, { "1720", "Stor" } } );
      } else if ( xPath?.Equals( "//paddingHorizontalItem" ) == true ) {
        config.Add( "items", new JArray( new JObject { { "id", 1 }, { "value", "Ingen (default)" } }, new JObject { { "id", 2 }, { "value", "Lidt" } }, new JObject { { "id", 3 }, { "value", "Meget" } } ) );
        context.Migrators.AddCustomValues( $"radio_{dataTypeProperty.DataTypeAlias}", new() { { "1430", "Ingen (default)" }, { "1431", "Lidt" }, { "1432", "Meget" } } );
      } else if ( xPath?.Equals( "//paddingVerticalItem" ) == true ) {
        config.Add( "items", new JArray( new JObject { { "id", 1 }, { "value", "Ingen (default)" } }, new JObject { { "id", 2 }, { "value", "Mindre" } }, new JObject { { "id", 3 }, { "value", "Normal" } }, new JObject { { "id", 4 }, { "value", "Mere" } } ) );
        context.Migrators.AddCustomValues( $"radio_{dataTypeProperty.DataTypeAlias}", new() { { "2148", "Ingen (default)" }, { "1437", "Mindre" }, { "1436", "Normal" }, { "1438", "Mere" } } );
      }

      return config;
    }

    public override string GetContentValue( SyncMigrationContentProperty contentProperty, SyncMigrationContext context ) {
      string dataTypeAlias = context.ContentTypes.GetDataTypeAlias( contentProperty.ContentTypeAlias, contentProperty.PropertyAlias );
      Dictionary<string, object> values = context.Migrators.GetCustomValues( $"radio_{dataTypeAlias}" );

      if ( !string.IsNullOrEmpty( contentProperty.Value ) && values.TryGetValue( contentProperty.Value, out object? value ) ) {
        string? valueStr = value?.ToString();
        if ( valueStr != null ) {
          return valueStr;
        }
      }

      return "";
    }
  }
}
