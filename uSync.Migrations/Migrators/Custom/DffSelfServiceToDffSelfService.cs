using Newtonsoft.Json;
using Umbraco.Cms.Core;
using uSync.Migrations.Context;
using uSync.Migrations.Migrators.Models;
using uSync.Migrations.Migrators.Models.Custom;

namespace uSync.Migrations.Migrators.Custom {
  [SyncMigrator( "Dff.SelfService" )]
  public class DffSelfServiceToDffSelfService : SyncPropertyMigratorBase {
    public override string GetEditorAlias( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) => "Dff.SelfService";

    public override string GetDatabaseType( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
      return "Ntext";
    }

    public override string GetContentValue( SyncMigrationContentProperty contentProperty, SyncMigrationContext context ) {
      if ( contentProperty.ContentTypeAlias == "selfServiceConfigBlock" && contentProperty.PropertyAlias == "selvbetjeningsMenupunkt" ) {
        if ( !string.IsNullOrEmpty( contentProperty.Value ) ) {
          SelfServiceItem? selfServiceItem = JsonConvert.DeserializeObject<SelfServiceItem>( contentProperty.Value );
          if ( selfServiceItem?.Id > 0 ) {
            Guid guid = context.GetKey( selfServiceItem.Id );
            if ( guid != Guid.Empty ) {
              return new GuidUdi( "Document", guid ).ToString();
            }
          }
        }
      }

      return "";
    }
  }
}
