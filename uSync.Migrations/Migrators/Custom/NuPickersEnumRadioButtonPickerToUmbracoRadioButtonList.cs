using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using uSync.Migrations.Context;
using uSync.Migrations.Extensions;
using uSync.Migrations.Migrators.Models;

namespace uSync.Migrations.Migrators.Custom {
  [SyncMigrator( "nuPickers.EnumRadioButtonPicker" )]
  public class NuPickersEnumRadioButtonPickerToUmbracoRadioButtonList : SyncPropertyMigratorBase {
    public override string GetEditorAlias( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) => "Umbraco.RadioButtonList";

    public override string GetDatabaseType( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
      return "Nvarchar";
    }

    public override object GetConfigValues( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
      var config = new JObject();

      JObject? obj = (JObject?)JsonConvert.DeserializeObject( dataTypeProperty.PreValues.GetPreValueOrDefault( "dataSource", string.Empty ) );
      string? enumName = (string?)obj?.Properties()?.FirstOrDefault( p => p.Name == "enumName" )?.Value;

      if ( enumName?.Equals( "DffEdb.Umb.Api.DataSources.LinkBoxMode" ) == true ) {
        config.Add( "items", new JArray( new JObject { { "id", 1 }, { "value", "Tekst" } }, new JObject { { "id", 2 }, { "value", "Billeder" } } ) );
        context.Migrators.AddCustomValues( $"radio_{dataTypeProperty.DataTypeAlias}", new() { { "Text", "Tekst" }, { "Images", "Billeder" } } );
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
