using Newtonsoft.Json.Linq;
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

    if ( dataTypeProperty.DataTypeAlias.Equals( "Image Row Picker" ) ) {
      context.Migrators.AddCustomValues( $"radio_{dataTypeProperty.DataTypeAlias}", new() { { "74", "1" }, { "75", "2" }, { "76", "3" }, { "77", "4" }, { "78", "6" } } );
    } else if ( dataTypeProperty.DataTypeAlias.Equals( "Button size picker" ) ) {
      context.Migrators.AddCustomValues( $"radio_{dataTypeProperty.DataTypeAlias}", new() { { "237", "color" }, { "238", "background-color" }, { "239", "border-color" } } );
    } else if ( dataTypeProperty.DataTypeAlias.Equals( "Person row picker" ) ) {
      context.Migrators.AddCustomValues( $"radio_{dataTypeProperty.DataTypeAlias}", new() { { "625", "1" }, { "626", "2" }, { "627", "3" }, { "628", "4" }, { "629", "5" }, { "630", "6" } } );
    } else if ( dataTypeProperty.DataTypeAlias.Equals( "Overvågningsvælger" ) ) {
      context.Migrators.AddCustomValues( $"radio_{dataTypeProperty.DataTypeAlias}", new() { { "966", "Standard" }, { "967", "Individuel" } } );
    } else if ( dataTypeProperty.DataTypeAlias.Equals( "Banner - Antal nyheder" ) ) {
      context.Migrators.AddCustomValues( $"radio_{dataTypeProperty.DataTypeAlias}", new() { { "1186", "0" }, { "1187", "1" }, { "1188", "2" }, { "1284", "3" } } );
    }

    foreach ( var item in dataTypeProperty.PreValues ) {
      config.Items.Add( new ValueListConfiguration.ValueListItem {
        Id = item.SortOrder,
        Value = item.Value
      } );
    }

    return config;
  }

  public override string GetContentValue( SyncMigrationContentProperty contentProperty, SyncMigrationContext context ) {
    string dataTypeAlias = context.ContentTypes.GetDataTypeAlias( contentProperty.ContentTypeAlias, contentProperty.PropertyAlias );
    Dictionary<string, object> values = context.Migrators.GetCustomValues( $"radio_{dataTypeAlias}" );

    if ( !string.IsNullOrEmpty( contentProperty.Value ) ) {
      if ( values.TryGetValue( contentProperty.Value, out object? value ) ) {
        string? valueStr = value?.ToString();
        if ( valueStr != null ) {
          return valueStr;
        }
      }

      if ( values.Any( v => v.Value.ToString() == contentProperty.Value ) ) {
        return contentProperty.Value;
      }
    }

    return "";
  }
}
