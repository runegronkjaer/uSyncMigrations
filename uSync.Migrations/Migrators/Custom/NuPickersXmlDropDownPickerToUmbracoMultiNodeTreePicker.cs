using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.PropertyEditors;
using uSync.Migrations.Context;
using uSync.Migrations.Extensions;
using uSync.Migrations.Migrators.Models;

namespace uSync.Migrations.Migrators.Custom {
  [SyncMigrator( "nuPickers.XmlDropDownPicker" )]
  public class NuPickersXmlDropDownPickerToUmbracoMultiNodeTreePicker : SyncPropertyMigratorBase {
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

      if ( xPath?.Equals( "//eForsyningTheme" ) == true ) {
        return new MultiNodePickerConfiguration() {
          TreeSource = new MultiNodePickerConfigurationTreeSource() {
            ObjectType = "content",
            StartNodeQuery = "$root/globalSettings/eForsyningThemes"
          },
          Filter = "eForsyningTheme",
          MinNumber = 0,
          MaxNumber = 1,
          ShowOpen = false,
          IgnoreUserStartNodes = false
        };
      } else if ( xPath?.Equals( "//cssKlasse" ) == true ) {
        return new MultiNodePickerConfiguration() {
          TreeSource = new MultiNodePickerConfigurationTreeSource() {
            ObjectType = "content",
            StartNodeQuery = "$root/globalSettings/cssKlasser"
          },
          Filter = "cssKlasse",
          MinNumber = 0,
          MaxNumber = 1,
          ShowOpen = false,
          IgnoreUserStartNodes = false
        };
      } else if ( xPath?.Equals( "$ancestorOrSelf/ancestor-or-self::vaerk[position()=1]//data//forms//form" ) == true ) {
        return new MultiNodePickerConfiguration() {
          TreeSource = new MultiNodePickerConfigurationTreeSource() {
            ObjectType = "content",
            StartNodeQuery = "$current/ancestor-or-self::vaerk[position()=1]//data//forms"
          },
          Filter = "form",
          MinNumber = 0,
          MaxNumber = 1,
          ShowOpen = false,
          IgnoreUserStartNodes = false
        };
      }

      return config;
    }

    public override string GetContentValue( SyncMigrationContentProperty contentProperty, SyncMigrationContext context ) {
      if ( contentProperty.ContentTypeAlias == "eforsyning" && contentProperty.PropertyAlias == "tema" ) {
        if ( !string.IsNullOrEmpty( contentProperty.Value ) && int.TryParse( contentProperty.Value, out int value ) ) {
          Guid guid = context.GetKey( value );
          if ( guid != Guid.Empty ) {
            return new GuidUdi( "Document", guid ).ToString();
          }
        }
      } else if ( contentProperty.ContentTypeAlias == "customCssBlock" && contentProperty.PropertyAlias == "cssKlasse" ) {
        if ( !string.IsNullOrEmpty( contentProperty.Value ) && int.TryParse( contentProperty.Value, out int value ) ) {
          Guid guid = context.GetKey( value );
          if ( guid != Guid.Empty ) {
            return new GuidUdi( "Document", guid ).ToString();
          }
        }
      } else if ( contentProperty.ContentTypeAlias == "BlockElement_formular" && contentProperty.PropertyAlias == "form" ) {
        if ( !string.IsNullOrEmpty( contentProperty.Value ) && int.TryParse( contentProperty.Value, out int value ) ) {
          Guid guid = context.GetKey( value );
          if ( guid != Guid.Empty ) {
            return new GuidUdi( "Document", guid ).ToString();
          }
        }
      }

      return "";
    }
  }
}
