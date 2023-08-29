﻿using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Configuration.Grid;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Extensions;
using uSync.Migrations.Context;
using uSync.Migrations.Migrators.BlockGrid.BlockMigrators;
using uSync.Migrations.Migrators.BlockGrid.Extensions;

namespace uSync.Migrations.Migrators.BlockGrid.Config;
internal class GridToBlockGridConfigBlockHelper {
  private readonly SyncBlockMigratorCollection _syncBlockMigrators;
  private readonly ILogger<GridToBlockGridConfigBlockHelper> _logger;

  public GridToBlockGridConfigBlockHelper(
      SyncBlockMigratorCollection syncBlockMigrators,
      ILogger<GridToBlockGridConfigBlockHelper> logger ) {
    _syncBlockMigrators = syncBlockMigrators;
    _logger = logger;
  }

  /// <summary>
  ///  adds any datatypes we need to make the grid. 
  /// </summary>
  /// <param name="context"></param>
  public void AddConfigDataTypes( GridToBlockGridConfigContext gridToBlockContext, SyncMigrationContext context ) {
    // add each thing in the config, as a 'new' doctype
    // the content handler will then either create or ignore these if they are already there. 
    foreach ( var editor in gridToBlockContext.GridConfig.EditorsConfig.Editors ) {
      if ( editor.View == null ) {
        continue;
      }

      var blockMigrator = _syncBlockMigrators.GetMigrator( editor );
      if ( blockMigrator == null ) {
        _logger.LogDebug( "{editor}/{view} doesn't have a migrator", editor.Alias, editor.View );
        continue;
      }

      _logger.LogDebug( "{editor}/{view} has migrator {migrator}", editor.Alias, editor.View, blockMigrator.GetType().Name );

      var additionalContentTypes = blockMigrator.AdditionalContentTypes( editor, context );
      if ( additionalContentTypes == null ) {
        _logger.LogDebug( "Migrator {migrator} does not require additional doctypes", blockMigrator.GetType().Name );
        continue;
      }

      foreach ( var newContentType in additionalContentTypes ) {
        _logger.LogDebug( "Adding new doctype [{alias}] for blockgrid", newContentType.Alias );
        context.ContentTypes.AddNewContentType( newContentType );
        context.ContentTypes.AddAliasAndKey( newContentType.Alias, newContentType.Key );
      }
    }
  }

  public void AddContentBlocks( GridToBlockGridConfigContext gridBlockContext, SyncMigrationContext context, Guid? settingKey ) {
    // add the grid elements to the block config 
    var gridContentTypeKeys = AddGridContentBlocksToConfig( gridBlockContext.GridConfig, gridBlockContext, context, settingKey );

    // now add the editor to the right bit of the blocks.
    AddEditorsToAllowedAreasInBlocks( gridContentTypeKeys, gridBlockContext, context );
  }

  private void AddEditorsToAllowedAreasInBlocks( Dictionary<string, Guid[]> gridContentTypeKeys, GridToBlockGridConfigContext gridBlockContext, SyncMigrationContext migrationContext ) {
    foreach ( var (area, gridEditorAliases) in gridBlockContext.AllowedEditors ) {
      var allowedElementTypes = new List<Guid>();
      foreach ( var gridEditorAlias in gridEditorAliases ) {
        if ( gridContentTypeKeys.ContainsKey( gridEditorAlias ) ) {
          _logger.LogDebug( "Adding {alias} to allowedElementTypes for {area}", gridEditorAlias, area.Alias );
          allowedElementTypes.AddRange( gridContentTypeKeys[gridEditorAlias] );
        }
      }

      var allowedBlocks = gridBlockContext.ContentBlocks
          .Where( x => allowedElementTypes.Contains( x.ContentElementTypeKey ) )
          .ToArray();

      if ( !allowedBlocks.Any() ) continue;

      if ( area == gridBlockContext.RootArea ) {
        foreach ( var block in allowedBlocks ) {
          _logger.LogDebug( "Allowing {block} at root", block.View );
          block.AllowAtRoot = true;
        }
        continue;
      }

      area.SpecifiedAllowance = allowedBlocks
          .Select( x => new BlockGridConfiguration.BlockGridAreaConfigurationSpecifiedAllowance {
            ElementTypeKey = x.ContentElementTypeKey,
          } ).ToArray();
    }
  }

  /// <summary>
  ///  returns all the allowed/known content types for a section of the grid.
  /// </summary>
  private Dictionary<string, Guid[]> AddGridContentBlocksToConfig( IGridConfig gridConfig, GridToBlockGridConfigContext gridBlockContext, SyncMigrationContext context, Guid? settingKey ) {
    var referencedEditors = gridBlockContext.AllEditors().ToList();

    var allowedContentTypes = new Dictionary<string, Guid[]>();
    IEnumerable<IGridEditorConfig> editors = gridConfig.EditorsConfig.Editors.Where( x => referencedEditors.Contains( "*" ) || referencedEditors.InvariantContains( x.Alias ) )
                                                                             .DistinctBy( x => x.Alias )
                                                                             .ToList(); //ToList for easier debugging

    foreach ( var editor in editors ) {
      var blocks = editor.ConvertToBlockGridBlocks( context,
          _syncBlockMigrators,
          gridBlockContext.GridBlocksGroup.Key,
          settingKey ).ToList();

      _logger.LogDebug( "Adding {editor} to block config for {count} blocks", editor.Alias, blocks.Count );

      foreach ( var block in blocks ) {
        if ( gridBlockContext.ContentBlocks.Any( cb => cb.ContentElementTypeKey == block.ContentElementTypeKey ) ) {
          continue;
        }
        gridBlockContext.ContentBlocks.Add( block );
      }

      allowedContentTypes[editor.Alias] = blocks.Select( x => x.ContentElementTypeKey ).ToArray();
    }

    return allowedContentTypes;
  }

  public void AddRootBlocks( GridToBlockGridConfigContext gridBlockContext, SyncMigrationContext context, Guid? settingKey ) {
    // add the grid elements to the block config 
    var gridContentTypeKeys = AddGridRootBlocksToConfig( gridBlockContext.GridConfig, gridBlockContext, context, settingKey );
  }

  /// <summary>
  ///  returns all the allowed/known content types for a section of the grid.
  /// </summary>
  private Dictionary<string, Guid[]> AddGridRootBlocksToConfig( IGridConfig gridConfig, GridToBlockGridConfigContext gridBlockContext, SyncMigrationContext context, Guid? settingKey ) {
    List<string> referencedEditors = gridBlockContext.GetRootAllowedLayouts().ToList();

    var allowedContentTypes = new Dictionary<string, Guid[]>();

    IEnumerable<IGridEditorConfig> editors = gridConfig.EditorsConfig.Editors.Where( x => referencedEditors.Contains( "*" ) || referencedEditors.InvariantContains( x.Alias ) )
                                                                             .DistinctBy( x => x.Alias )
                                                                             .ToList(); //ToList for easier debugging
    foreach ( IGridEditorConfig? editor in editors ) {
      List<BlockGridConfiguration.BlockGridBlockConfiguration> blocks = editor.ConvertToBlockGridBlocks( context,
          _syncBlockMigrators,
          Guid.Empty,
          settingKey ).ToList();

      _logger.LogDebug( "Adding {editor} to block config for {count} blocks", editor.Alias, blocks.Count );

      foreach ( var block in blocks ) {
        if ( gridBlockContext.ContentBlocks.Any( cb => cb.ContentElementTypeKey == block.ContentElementTypeKey ) ) {
          continue;
        }
        gridBlockContext.ContentBlocks.Add( block );
      }

      allowedContentTypes[editor.Alias] = blocks.Select( x => x.ContentElementTypeKey ).ToArray();
    }

    return allowedContentTypes;
  }
}
