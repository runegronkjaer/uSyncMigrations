using Microsoft.Extensions.Logging;
using uSync.Migrations.Composing;
using uSync.Migrations.Context;
using uSync.Migrations.Migrators.Models;

namespace uSync.Migrations.Migrators.Community {
  [SyncMigrator( "Novicell.IconPicker" )]
  public class NovicellIconPickerMigrator : SyncPropertyMigratorBase {
    private readonly Lazy<SyncPropertyMigratorCollection> _migrators;
    private readonly ILogger<NovicellIconPickerMigrator> _logger;

    public NovicellIconPickerMigrator( Lazy<SyncPropertyMigratorCollection> migrators, ILogger<NovicellIconPickerMigrator> logger ) {
      _migrators = migrators;
      _logger = logger;
    }

    public override string GetEditorAlias( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
      return "Novicell.IconPicker";
    }

    public override string GetContentValue( SyncMigrationContentProperty contentProperty, SyncMigrationContext context ) {
      if ( string.IsNullOrWhiteSpace( contentProperty.Value ) ) {
        return string.Empty;
      }

      return contentProperty.Value;
    }
  }
}
