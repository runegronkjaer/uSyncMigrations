using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using uSync.Migrations.Context;
using uSync.Migrations.Extensions;
using uSync.Migrations.Migrators.Models;

namespace uSync.Migrations.Migrators.Custom {
  [SyncMigrator( "Our.Umbraco.ColorPalettes" )]
  public class OurUmbracoColorPalettesToOurUmbracoColorPalettes : SyncPropertyMigratorBase {
    public override string GetEditorAlias( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) => "Our.Umbraco.ColorPalettes";

    public override string GetDatabaseType( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
      return "dataNtext";
    }

    public override object GetConfigValues( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
      var config = new JObject();

      string? hideRadioButtons = (string?)JsonConvert.DeserializeObject( dataTypeProperty.PreValues.GetPreValueOrDefault( "hideRadioButtons", "0" ) );
      JArray? palettes = (JArray?)JsonConvert.DeserializeObject( dataTypeProperty.PreValues.GetPreValueOrDefault( "palettes", string.Empty ) );

      config.Add( "hideRadioButtons", hideRadioButtons ?? "0" );
      config.Add( "palettes", palettes );

      return config;
    }
  }
}
