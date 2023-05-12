using uSync.Migrations.Context;
using uSync.Migrations.Migrators.Models;

namespace uSync.Migrations.Migrators.Custom {
  [SyncMigrator( "DFFEDB.Tiles" )]
  public class DFFEDBTilesToDFFEDBTiles : SyncPropertyMigratorBase {
    public override string GetEditorAlias( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) => "DFFEDB.Tiles";

    public override string GetDatabaseType( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
      return "Ntext";
    }
  }
}
