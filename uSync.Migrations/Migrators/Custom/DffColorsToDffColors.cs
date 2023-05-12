using uSync.Migrations.Context;
using uSync.Migrations.Migrators.Models;

namespace uSync.Migrations.Migrators.Custom {
  [SyncMigrator( "Dff.Colors" )]
  public class DffColorsToDffColors : SyncPropertyMigratorBase {
    public override string GetEditorAlias( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) => "Dff.Colors";

    public override string GetDatabaseType( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
      return "Ntext";
    }
  }
}
