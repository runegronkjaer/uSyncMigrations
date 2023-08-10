using DffEdb.Umb.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Web.BackOffice.Controllers;
using Umbraco.Cms.Web.Common.Attributes;

namespace eForsyning.Code {
  [PluginController( "dff" )]
  public class DffApiController : UmbracoAuthorizedApiController {
    private readonly ColorService _colorService;
    private readonly SelfService _selfService;

    public DffApiController( ColorService colorService, SelfService selfService ) {
      _colorService = colorService;
      _selfService = selfService;
    }

    public List<string> GetThemeColors( int id, int addColors ) {
      IPublishedContent? rootNode = _colorService.GetRootNode( id );

      if ( rootNode != null ) {
        return _colorService.GetThemeColors( (Vaerk)rootNode, Convert.ToBoolean( addColors ) );
      } else {
        return new List<string>();
      }
    }

    public List<ColorItem> GetThemeTextColors( int id ) {
      IPublishedContent? rootNode = _colorService.GetRootNode( id );

      if ( rootNode != null ) {
        return _colorService.GetThemeTextColors( (Vaerk)rootNode );
      } else {
        return new List<ColorItem>();
      }
    }

    /// <summary>
    /// GetSelfServiceItems
    /// </summary>
    /// <param name="id">The id of the current page where selfservice is inserted</param>
    /// <returns>A list of self service items</returns>
    public List<SelfServiceItem> GetSelfServiceItems( int id ) {
      return _selfService.GetSelfServiceItems( id );
    }
  }
}
