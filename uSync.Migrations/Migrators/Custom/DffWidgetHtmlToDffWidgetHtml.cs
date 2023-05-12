using uSync.Migrations.Context;
using uSync.Migrations.Migrators.Models;

namespace uSync.Migrations.Migrators.Custom {
  [SyncMigrator( "Dff.WidgetHtml" )]
  public class DffWidgetHtmlToDffWidgetHtml : SyncPropertyMigratorBase {
    public override string GetEditorAlias( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) => "Dff.WidgetHtml";

    public override string GetDatabaseType( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
      return "Ntext";
    }
  }
}
