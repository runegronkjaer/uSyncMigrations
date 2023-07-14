using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.PropertyEditors;
using uSync.Migrations.Context;
using uSync.Migrations.Extensions;
using uSync.Migrations.Migrators.Models;

namespace uSync.Migrations.Migrators.Custom {
  [SyncMigrator( "nuPickers.XmlPrefetchListPicker" )]
  public class NuPickersXmlPrefetchListPickerToUmbracoMultiNodeTreePicker : SyncPropertyMigratorBase {
    public override string GetEditorAlias( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) => "Umbraco.MultiNodeTreePicker";

    public override string GetDatabaseType( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
      return "Ntext";
    }

    public override object GetConfigValues( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
      var config = new JObject();

      JObject? obj = (JObject?)JsonConvert.DeserializeObject( dataTypeProperty.PreValues?.GetPreValueOrDefault( "dataSource", string.Empty ) );
      string? xPath = (string?)obj?.Properties()?.FirstOrDefault( p => p.Name == "xPath" )?.Value;

      if ( xPath == null ) {
        return config;
      }

      JObject? objListPicker = (JObject?)JsonConvert.DeserializeObject( dataTypeProperty.PreValues?.GetPreValueOrDefault( "listPicker", string.Empty ) );
      if ( xPath.Equals( "$ancestorOrSelf/ancestor-or-self::vaerk[position()=1]//data//personKategorier//personKategori" ) ) {
        return new MultiNodePickerConfiguration() {
          TreeSource = new MultiNodePickerConfigurationTreeSource() {
            ObjectType = "content",
            StartNodeQuery = "$current/ancestor-or-self::vaerk[position()=1]/data/personKategorier"
          },
          Filter = "personKategori",
          MinNumber = (int?)objListPicker?.Properties()?.FirstOrDefault( p => p.Name == "minItems" )?.Value ?? 0,
          MaxNumber = (int?)objListPicker?.Properties()?.FirstOrDefault( p => p.Name == "maxItems" )?.Value ?? 0,
          ShowOpen = false,
          IgnoreUserStartNodes = false
        };
      }

      return config;
    }

    public override string GetContentValue( SyncMigrationContentProperty contentProperty, SyncMigrationContext context ) {
      if ( contentProperty.ContentTypeAlias == "person" && contentProperty.PropertyAlias == "personKategori" ) {
        if ( !string.IsNullOrEmpty( contentProperty.Value ) ) {
          string[] values = contentProperty.Value.Split( ",", StringSplitOptions.RemoveEmptyEntries );

          if ( values.Length > 0 ) {
            List<string> udis = new();

            foreach ( string valueStr in values ) {
              if ( int.TryParse( valueStr, out int value ) ) {
                Guid guid = context.GetKey( value );
                if ( guid != Guid.Empty ) {
                  udis.Add( new GuidUdi( "Document", guid ).ToString() );
                }
              }
            }

            if ( udis.Count > 0 ) {
              return string.Join( ",", udis );
            }
          }
        }
      }

      return "";
    }
  }
}
