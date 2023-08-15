using Umbraco.Cms.Core.Configuration.Grid;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Strings;
using uSync.Migrations.Context;

namespace uSync.Migrations.Migrators.BlockGrid.BlockMigrators;

public class GridTerratypeBlockMigrator : GridBlockMigratorSimpleBase, ISyncBlockMigrator {

  public GridTerratypeBlockMigrator( IShortStringHelper shortStringHelper )
    : base( shortStringHelper ) { }

  public string[] Aliases => new[] { "terratype" };

  public override string GetEditorAlias( IGridEditorConfig editor ) => "Terratype Map 1";

  public override Dictionary<string, object> GetPropertyValues( GridValue.GridControl control, SyncMigrationContext context ) {
    var properties = new Dictionary<string, object>();
    if ( control.Value == null ) return properties;

    properties.Add( "terratype", control.Value );
    return properties;
  }
}


