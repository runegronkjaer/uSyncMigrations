using Newtonsoft.Json.Linq;
using uSync.Migrations.Context;
using uSync.Migrations.Extensions;
using uSync.Migrations.Migrators.Models;

namespace uSync.Migrations.Migrators.Custom {
  [SyncMigrator( "Skybrud.CharLimitEditor" )]
  public class SkybrudCharLimitEditorToUmbracoTextBox : SyncPropertyMigratorBase {
    public override string GetEditorAlias( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) => "Umbraco.TextBox";

    public override string GetDatabaseType( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
      return "Ntext";
    }

    public override object GetConfigValues( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
      var config = new JObject();

      config.Add( "maxChars", dataTypeProperty.PreValues?.GetPreValueOrDefault( "limit", string.Empty ) ?? string.Empty );

      return config;
    }
  }
}
