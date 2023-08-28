using Newtonsoft.Json;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.PropertyEditors;
using uSync.Migrations.Context;
using uSync.Migrations.Extensions;
using uSync.Migrations.Migrators.Models;

namespace uSync.Migrations.Migrators;

[SyncMigrator( "Umbraco.ContentPickerAlias" )]
public class ContentPickerAliasMigrator : SyncPropertyMigratorBase {
  public override string GetEditorAlias( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context )
      => UmbConstants.PropertyEditors.Aliases.ContentPicker;
  public override string GetDatabaseType( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context )
=> nameof( ValueStorageType.Ntext );

  public override object GetConfigValues( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
    var config = new ContentPickerConfiguration();

    var mappings = new Dictionary<string, string>
    {
            { "showOpenButton", nameof(config.ShowOpenButton) },
            { "startNodeId", nameof(config.StartNodeId) }
        };

    return config.MapPreValues( dataTypeProperty.PreValues, mappings );
  }

  public override string GetContentValue( SyncMigrationContentProperty contentProperty, SyncMigrationContext context ) {
    if ( string.IsNullOrWhiteSpace( contentProperty.Value ) ) return string.Empty;

    if ( !Guid.TryParse( contentProperty.Value, out Guid value ) || value == Guid.Empty ) return string.Empty;

    return Udi.Create( "document", value ).ToString();
  }
}
