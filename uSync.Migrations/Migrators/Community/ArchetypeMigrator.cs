//using Microsoft.Extensions.Logging;
//using Newtonsoft.Json;
//using Newtonsoft.Json.Linq;
//using Umbraco.Cms.Core;
//using Umbraco.Cms.Core.Models.Blocks;
//using Umbraco.Cms.Core.PropertyEditors;
//using Umbraco.Extensions;
//using uSync.Migrations.Composing;
//using uSync.Migrations.Context;
//using uSync.Migrations.Extensions;
//using uSync.Migrations.Migrators.Models;

//namespace uSync.Migrations.Migrators.Community {
//  [SyncMigrator( "Imulus.Archetype" )]
//  public class ArchetypeMigrator : SyncPropertyMigratorBase {
//    Lazy<SyncPropertyMigratorCollection> _migrators;
//    ILogger<ArchetypeMigrator> _logger;

//    public ArchetypeMigrator( Lazy<SyncPropertyMigratorCollection> migrators, ILogger<ArchetypeMigrator> logger ) {
//      _migrators = migrators;
//      _logger = logger;
//    }

//    public override string GetEditorAlias( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context )
//        => Umbraco.Cms.Core.Constants.PropertyEditors.Aliases.BlockList;

//    public override object GetConfigValues( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
//      var archetypeConfig = dataTypeProperty.PreValues?.GetPreValueOrDefault( "archetypeConfig", "{}" ) ?? "{}";

//      ArchetypeConfigurationFieldsets? fieldsets = JsonConvert.DeserializeObject<ArchetypeConfigurationFieldsets>( archetypeConfig );
//      if ( fieldsets == null ) {
//        _logger.LogWarning( "No settings found for archetype" );
//        return new BlockListConfiguration {
//          ValidationLimit = new BlockListConfiguration.NumberRange { Min = 0, Max = null },
//        };
//      }

//      List<BlockListConfiguration.BlockConfiguration> blocks = new();
//      if ( fieldsets.Fieldsets?.Any() == true ) {
//        foreach ( ArchetypeConfigurationFieldset fieldset in fieldsets.Fieldsets ) {
//          string contentTypeAlias = fieldset.Alias + "Block";
//          Guid contentTypeGuid = context.ContentTypes.GetKeyByAlias( contentTypeAlias );
//          if ( contentTypeGuid == Guid.Empty ) {
//            _logger.LogWarning( "Could not find content type with alias '" + contentTypeAlias + "'" );
//            continue;
//          }

//          blocks.Add( new BlockListConfiguration.BlockConfiguration {
//            ContentElementTypeKey = contentTypeGuid,
//            Label = fieldset.Label,
//          } );
//        }
//      }

//      if ( blocks?.Any() == true ) {
//        foreach ( var elementTypeKey in blocks.Select( x => x.ContentElementTypeKey ) ) {
//          context.ContentTypes.AddElementType( elementTypeKey );
//        }
//      }

//      var validationLimit = fieldsets.MaxFieldsets != null && fieldsets.MaxFieldsets == 1
//           ? new BlockListConfiguration.NumberRange { Min = 0, Max = 1 }
//           : new BlockListConfiguration.NumberRange { Min = 0, Max = fieldsets.MaxFieldsets ?? null };

//      //TODO: Brug til at oprette content types
//      //context.ContentTypes.AddElementTypes( result.Blocks.Select( x => x.ContentElementTypeKey ), true );

//      return new BlockListConfiguration {
//        Blocks = blocks?.ToArray() ?? Array.Empty<BlockListConfiguration.BlockConfiguration>(),
//        ValidationLimit = validationLimit,
//      };
//    }

//    public override string GetContentValue( SyncMigrationContentProperty contentProperty, SyncMigrationContext context ) {
//      if ( string.IsNullOrWhiteSpace( contentProperty.Value ) ) {
//        return string.Empty;
//      }

//      var fieldsets = JsonConvert.DeserializeObject<ArchetypeConfigurationItems>( contentProperty.Value );
//      if ( fieldsets?.Fieldsets?.Any() != true ) {
//        return string.Empty;
//      }

//      List<BlockItemData> contentData = new();

//      List<BlockListLayoutItem> layout = new();

//      foreach ( ArcheTypeItem item in fieldsets.Fieldsets ) {
//        if ( item.Alias == null ) {
//          continue;
//        }

//        string contentTypeAlias = item.Alias + "Block";
//        Guid contentTypeKey = context.ContentTypes.GetKeyByAlias( contentTypeAlias );
//        var tes3 = context.ContentTypes.GetAllAliases();
//        var test4 = JsonConvert.SerializeObject( tes3, Formatting.Indented );
//        if ( contentTypeKey == Guid.Empty ) {
//          return "";
//        }

//        foreach ( ArchetypeValue keyValue in item.Values ) {
//          if ( contentTypeAlias == null || keyValue.Alias == null ) {
//            continue;
//          }

//          var editorAlias = context.ContentTypes.GetEditorAliasByTypeAndProperty( contentTypeAlias, keyValue.Alias );

//          if ( editorAlias == null ) {
//            continue;
//          }

//          var migrator = _migrators.Value
//              .FirstOrDefault( x => x.Editors.InvariantContains( editorAlias.OriginalEditorAlias ) );

//          if ( migrator == null ) {
//            continue;
//          }

//          var childProperty = new SyncMigrationContentProperty( editorAlias.OriginalEditorAlias,
//              keyValue.Value?.ToString() ?? string.Empty );

//          keyValue.Value = migrator.GetContentValue( childProperty, context );
//        }

//        Dictionary<string, object?> values = new();
//        foreach ( ArchetypeValue archetypeValue in item.Values ) {
//          if ( archetypeValue.Alias == null ) {
//            continue;
//          }
//          values.Add( archetypeValue.Alias, archetypeValue.Value );
//        }

//        var block = new BlockItemData {
//          ContentTypeKey = contentTypeKey,
//          Udi = Udi.Create( Umbraco.Cms.Core.Constants.UdiEntityType.Element, item.Key ),
//          RawPropertyValues = values,
//        };

//        layout.Add( new BlockListLayoutItem { ContentUdi = block.Udi } );

//        contentData.Add( block );
//      }

//      if ( contentData.Any() == false ) {
//        return string.Empty;
//      }

//      var model = new BlockValue {
//        ContentData = contentData,
//        Layout = new Dictionary<string, JToken>
//          {
//                { Umbraco.Cms.Core.Constants.PropertyEditors.Aliases.BlockList, JArray.FromObject(layout) },
//            },
//      };

//      return JsonConvert.SerializeObject( model, Formatting.Indented );
//    }

//    internal class ArchetypeConfigurationFieldsets {
//      [JsonProperty( "maxFieldsets" )]
//      public int? MaxFieldsets { get; set; }
//      [JsonProperty( "fieldsets" )]
//      public List<ArchetypeConfigurationFieldset>? Fieldsets { get; set; }
//    }

//    internal class ArchetypeConfigurationFieldset {
//      [JsonProperty( "collapse" )]
//      public bool Collapse { get; set; }
//      [JsonProperty( "alias" )]
//      public string? Alias { get; set; }
//      [JsonProperty( "label" )]
//      public string? Label { get; set; }
//      [JsonProperty( "labelTemplate" )]
//      public string? LabelTemplate { get; set; }
//      [JsonProperty( "icon" )]
//      public string? Icon { get; set; }
//      [JsonProperty( "properties" )]
//      public List<ArchetypeConfigurationProperty>? Properties { get; set; }
//    }

//    internal class ArchetypeConfigurationProperty {
//      [JsonProperty( "collapse" )]
//      public bool Collapse { get; set; }
//      [JsonProperty( "alias" )]
//      public string? Alias { get; set; }
//      [JsonProperty( "label" )]
//      public string? Label { get; set; }
//      [JsonProperty( "remove" )]
//      public bool Remove { get; set; }
//      [JsonProperty( "helpText" )]
//      public string? HelpText { get; set; }
//      [JsonProperty( "dataTypeGuid" )]
//      public Guid DataTypeGuid { get; set; }
//      [JsonProperty( "aliasIsDirty" )]
//      public bool AliasIsDirty { get; set; }
//      [JsonProperty( "value" )]
//      public string? Value { get; set; }
//    }

//    internal class ArchetypeConfigurationItems {
//      [JsonProperty( "fieldsets" )]
//      public List<ArcheTypeItem>? Fieldsets { get; set; }
//    }

//    internal class ArcheTypeItem {
//      //[JsonProperty( "icContentTypeGuid" )]
//      //public Guid ContentTypeKey { get; set; }

//      [JsonProperty( "id" )]
//      public Guid Key { get; set; }

//      [JsonProperty( "alias" )]
//      public string? Alias { get; set; }

//      //[JsonProperty( "name" )]
//      //public string? Name { get; set; }

//      //[JsonProperty( "icon" )]
//      //public string? Icon { get; set; }

//      [JsonProperty( "properties" )]
//      public List<ArchetypeValue> Values { get; set; } = null!;
//    }

//    internal class ArchetypeValue {
//      [JsonProperty( "alias" )]
//      public string? Alias { get; set; }
//      [JsonProperty( "value" )]
//      public object? Value { get; set; }
//    }
//  }
//}
