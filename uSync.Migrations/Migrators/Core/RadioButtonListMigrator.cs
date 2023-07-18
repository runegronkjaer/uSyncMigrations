using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.PropertyEditors;
using uSync.Migrations.Context;
using uSync.Migrations.Migrators.Models;

namespace uSync.Migrations.Migrators;

[SyncMigrator( UmbConstants.PropertyEditors.Aliases.RadioButtonList )]
public class RadioButtonListMigrator : SyncPropertyMigratorBase {
  public override string GetDatabaseType( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context )
      => nameof( ValueStorageType.Nvarchar );

  public override object? GetConfigValues( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
    var config = new ValueListConfiguration();
    if ( dataTypeProperty.PreValues == null ) return config;


    Dictionary<string, object> customValues = new();

    foreach ( var item in dataTypeProperty.PreValues ) {
      config.Items.Add( new ValueListConfiguration.ValueListItem {
        Id = item.SortOrder,
        Value = item.Value
      } );

      customValues.Add( item.Alias, item.Value );
    }

    if ( customValues.Count > 0 ) {
      context.Migrators.AddCustomValues( $"radio_{dataTypeProperty.DataTypeAlias}", customValues );
    }

    return config;
  }

  public override string GetContentValue( SyncMigrationContentProperty contentProperty, SyncMigrationContext context ) {
    string dataTypeAlias = context.ContentTypes.GetDataTypeAlias( contentProperty.ContentTypeAlias, contentProperty.PropertyAlias );
    Dictionary<string, object> values = context.Migrators.GetCustomValues( $"radio_{dataTypeAlias}" );

    if ( !string.IsNullOrEmpty( contentProperty.Value ) && values.TryGetValue( contentProperty.Value, out object? value ) ) {
      string? valueStr = value?.ToString();
      if ( valueStr != null ) {
        return valueStr;
      }
    }

    return "";
  }
}
