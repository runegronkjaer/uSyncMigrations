using Newtonsoft.Json;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Configuration.Grid;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Strings;
using uSync.Migrations.Context;

namespace uSync.Migrations.Migrators.BlockGrid.BlockMigrators;

public class GridEmbedBlockMigrator : GridBlockMigratorSimpleBase, ISyncBlockMigrator {

  public GridEmbedBlockMigrator( IShortStringHelper shortStringHelper )
    : base( shortStringHelper ) { }

  public string[] Aliases => new[] { "embed" };

  public override string GetEditorAlias( IGridEditorConfig editor ) => "Embed";

  public override Dictionary<string, object> GetPropertyValues( GridValue.GridControl control, SyncMigrationContext context ) {
    var properties = new Dictionary<string, object>();
    if ( control.Value == null ) return properties;

    properties.Add( "embedSnippet", control.Value.ToString() );
    return properties;
  }
}


