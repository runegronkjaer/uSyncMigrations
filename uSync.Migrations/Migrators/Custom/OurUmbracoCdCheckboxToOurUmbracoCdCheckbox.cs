using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Umbraco.Cms.Core;
using uSync.Migrations.Context;
using uSync.Migrations.Extensions;
using uSync.Migrations.Migrators.Models;

namespace uSync.Migrations.Migrators.Custom {
  [SyncMigrator( "Our.Umbraco.CdCheckbox" )]
  public class OurUmbracoCdCheckbox : SyncPropertyMigratorBase {
    public override string GetEditorAlias( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) => "Our.Umbraco.CdCheckbox";

    public override string GetDatabaseType( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
      return "Nvarchar";
    }

    public override object GetConfigValues( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
      return new JObject { { "default", dataTypeProperty.PreValues?.GetPreValueOrDefault( "default", 0 ).ToString() }, { "showIfChecked", dataTypeProperty.PreValues?.GetPreValueOrDefault( "showIfChecked", string.Empty ) }, { "showIfUnchecked", dataTypeProperty.PreValues?.GetPreValueOrDefault( "showIfUnchecked", string.Empty ) } }; ;
    }
  }
}
