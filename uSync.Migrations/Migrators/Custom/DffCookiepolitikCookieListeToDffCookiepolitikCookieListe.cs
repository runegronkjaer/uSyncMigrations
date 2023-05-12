using uSync.Migrations.Context;
using uSync.Migrations.Migrators.Models;

namespace uSync.Migrations.Migrators.Custom {
  [SyncMigrator( "Dff.Cookiepolitik.CookieListe" )]
  public class DffCookiepolitikCookieListeToDffCookiepolitikCookieListe : SyncPropertyMigratorBase {
    public override string GetEditorAlias( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) => "Dff.Cookiepolitik.CookieListe";

    public override string GetDatabaseType( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
      return "Ntext";
    }
  }
}
