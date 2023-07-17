using DffEdb.Umb.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Web.BackOffice.Controllers;
using Umbraco.Cms.Web.Common.Attributes;

namespace eForsyning.Code {
  [PluginController( "dff" )]
  public class DffApiController : UmbracoAuthorizedApiController {
    private readonly ColorService _colorService;

    public DffApiController( ColorService colorService ) {
      _colorService = colorService;
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
  }
}
