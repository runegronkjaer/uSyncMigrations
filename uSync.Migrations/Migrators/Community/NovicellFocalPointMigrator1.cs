using Newtonsoft.Json;
using Umbraco.Cms.Core;
using uSync.Migrations.Context;
using uSync.Migrations.Migrators.Models;

namespace uSync.Migrations.Migrators.Community {
  [SyncMigrator( "Novicell.FocalPoint" )]
  public class NovicellFocalPointMigrator : SyncPropertyMigratorBase {
    public override string GetEditorAlias( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
      return UmbConstants.PropertyEditors.Aliases.MediaPicker3;
    }

    public override string GetContentValue( SyncMigrationContentProperty contentProperty, SyncMigrationContext context ) {
      if ( string.IsNullOrWhiteSpace( contentProperty.Value ) ) {
        return string.Empty;
      }

      FocalPointImage? focalPointImage = JsonConvert.DeserializeObject<FocalPointImage>( contentProperty.Value );
      if ( focalPointImage?.Key != null ) {
        Udi udi = Udi.Create( "media", focalPointImage.Key.Value );
        return udi.ToString();
      }
      return string.Empty;
    }
  }

  public class FocalPointImage {
    public Udi? Udi { get; set; }
    public Guid? Key { get; set; }
  }
}
