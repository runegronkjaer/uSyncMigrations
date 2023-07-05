//using Newtonsoft.Json;
//using Newtonsoft.Json.Linq;
//using uSync.Migrations.Context;
//using uSync.Migrations.Extensions;
//using uSync.Migrations.Migrators.Models;

//namespace uSync.Migrations.Migrators.Custom {
//  [SyncMigrator( "nuPickers.EnumDropDownPicker" )]
//  public class NuPickersEnumDropDownPickerToUmbracoDropDownFlexible : SyncPropertyMigratorBase {
//    public override string GetEditorAlias( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) => "Umbraco.DropDown.Flexible";

//    public override string GetDatabaseType( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
//      return "Nvarchar";
//    }

//    public override object GetConfigValues( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
//      var config = new JObject();

//      JObject? obj = (JObject?)JsonConvert.DeserializeObject( dataTypeProperty.PreValues?.GetPreValueOrDefault( "dataSource", string.Empty ) );
//      string? enumName = (string?)obj?.Properties()?.FirstOrDefault( p => p.Name == "enumName" )?.Value;

//      if ( enumName?.Equals( "DffEdb.Umb.Helper.FeatureToggleStatus" ) == true ) {
//        config.Add( "multiple", false );
//        config.Add( "items", new JArray( new JObject { { "id", 1 }, { "value", "Aktiveret" } }, new JObject { { "id", 2 }, { "value", "Deaktiveret" } } ) );
//      }

//      return config;
//    }
//  }
//}
