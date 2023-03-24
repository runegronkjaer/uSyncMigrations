﻿using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Runtime.Serialization;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core;
using uSync.Migrations.Context;
using uSync.Migrations.Migrators.Models;
using uSync.Migrations.Extensions;
using Umbraco.Extensions;

namespace uSync.Migrations.Migrators.Community;

[SyncMigrator( "Novicell.LinkPicker" )]
public class NovicellLinkPickerToUmbMultiUrlPickerMigrator : SyncPropertyMigratorBase {
  public override string GetEditorAlias( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context )
      => UmbConstants.PropertyEditors.Aliases.MultiUrlPicker;

  public override object GetConfigValues( SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context ) {
    var minNumberOfItems = dataTypeProperty.PreValues?.GetPreValueOrDefault( "minNumberOfItems", string.Empty );
    var maxNumberOfItems = dataTypeProperty.PreValues?.GetPreValueOrDefault( "maxNumberOfItems", string.Empty );
    var hideQuerystring = dataTypeProperty.PreValues?.GetPreValueOrDefault( "hideQuerystring", string.Empty );

    // No comparable prevalue
    // var hideTarget = dataTypeProperty.PreValues?.GetPreValueOrDefault("hideTarget", string.Empty);
    // var version = dataTypeProperty.PreValues?.GetPreValueOrDefault("version", string.Empty);

    var config = new JObject {
            { "minNumber", int.TryParse(minNumberOfItems, out var min) ? min: 0 },
            { "maxNumber", int.TryParse(maxNumberOfItems, out var max) ? max: 0 },
            { "overlaySize", "small" },
            { "hideAnchor", bool.TryParse(hideQuerystring, out var hideQs) && hideQs },
            { UmbConstants.DataTypes.ReservedPreValueKeys.IgnoreUserStartNodes, false }
        };

    return config;
  }

  public override string GetContentValue( SyncMigrationContentProperty contentProperty, SyncMigrationContext context ) {
    if ( string.IsNullOrWhiteSpace( contentProperty.Value ) ) {
      return string.Empty;
    }

    var sourceLinks = contentProperty.Value.IfNotNull( v => JsonConvert.DeserializeObject<NovicellLinkDto>( v ) );

    var destinationLinks = ConvertLinkDto( sourceLinks );

    return JsonConvert.SerializeObject( destinationLinks, Formatting.Indented, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore } );
  }

  private static IEnumerable<MultiUrlPickerValueEditor.LinkDto> ConvertLinkDto( NovicellLinkDto sourceDto ) {

    var umbLinkDto = new MultiUrlPickerValueEditor.LinkDto {
      Name = sourceDto.Name.IfNullOrWhiteSpace( null ),
      QueryString = sourceDto.Querystring.IfNullOrWhiteSpace( null ),
      Target = sourceDto.Target.IfNullOrWhiteSpace( null )
    };

    if ( sourceDto.Udi != default ) {
      umbLinkDto.Udi = sourceDto.Udi;
    }
    // In some versions of RJP.MultiUrlPicker, the Id is a Guid
    else if ( Guid.TryParse( sourceDto.Id, out var guid ) ) {
      var entityType = sourceDto.IsMedia == true ?
          UmbConstants.UdiEntityType.Media :
          UmbConstants.UdiEntityType.Document;
      umbLinkDto.Udi = new GuidUdi( entityType, guid );
    } else {
      // The Id can apparently be an int.
      // I'm not clear if this is an IPublishedContent.Id, but those will be different so a fallback to the Url is probably best
      // (also external urls)
      umbLinkDto.Url = sourceDto.Url.IfNullOrWhiteSpace( null );
    }

    yield return umbLinkDto;
  }

  [DataContract]
  internal class NovicellLinkDto {
    // Not used properties: Icon & Published

    // Id appears to sometimes be a Guid, and sometimes an int (depending on the version of RJP.MultiUrlPicker I assume)
    [DataMember( Name = "id" )]
    public string? Id { get; set; }

    [DataMember( Name = "isMedia" )]
    public bool? IsMedia { get; set; }

    [DataMember( Name = "name" )]
    public string? Name { get; set; }

    [DataMember( Name = "target" )]
    public string? Target { get; set; }

    [DataMember( Name = "udi" )]
    public GuidUdi? Udi { get; set; }

    [DataMember( Name = "url" )]
    public string? Url { get; set; }

    [DataMember( Name = "querystring" )]
    public string? Querystring { get; set; }
  }
}