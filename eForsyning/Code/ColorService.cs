using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Core.Models.PublishedContent;
using DffEdb.Umb.Models;

namespace eForsyning.Code {
  public class ColorService {
    private readonly IUmbracoContextAccessor _umbracoContextAccessor;

    public ColorService( IUmbracoContextAccessor umbracoContextAccessor ) {
      _umbracoContextAccessor = umbracoContextAccessor;
    }

    public List<string> GetThemeColors( Vaerk rootNode, bool addColors ) {
      var colors = new List<string>();

      //TODO
      //foreach ( Color color in rootNode.ColourScheme.Colors )
      List<string> tempColors = new() { "#39ac73", "#455a64", "#607D8B", "#ebf1c7", "#d7992c" };
      foreach ( string color in tempColors )
        //colors.Add( color.Code );
        colors.Add( color );

      // add light grey
      colors.Add( "#f9f9f9" );
      colors.Add( "#d9d9d9" );
      colors.Add( "#b9b9b9" );

      if ( addColors ) {
        colors.Add( "#ffffff" );
        colors.Add( "#000000" );
      }

      return colors;
    }

    public List<ColorItem> GetThemeTextColors( Vaerk rootNode ) {
      List<ColorItem> colors = new();

      //TODO
      //foreach ( Color color in rootNode.ColourScheme.Colors ) {
      //  colors.Add( new ColorItem( color.Code, new() { "Hvid", "Sort" } ) );
      //}

      List<string> tempColors = new() { "#39ac73", "#455a64", "#607D8B", "#ebf1c7", "#d7992c" };
      foreach ( string color in tempColors ) {
        colors.Add( new ColorItem( color, new() { "Hvid", "Sort" } ) );
      }

      return colors;
    }

    public IPublishedContent? GetRootNode( int id ) {
      if ( !( _umbracoContextAccessor.TryGetUmbracoContext( out IUmbracoContext? umbracoContext ) && umbracoContext?.Content != null ) ) {
        return null;
      }

      IPublishedContent? node = umbracoContext.Content.GetById( id );
      if ( node != null ) {
        if ( node.Level == 1 ) {
          return node;
        } else {
          return node.Ancestor( 1 );
        }
      } else {
        return umbracoContext.Content.GetAtRoot().FirstOrDefault( x => x.ContentType.Alias == "vaerk" );
      }
    }

    public int GetRootId( int id ) {
      if ( !( _umbracoContextAccessor.TryGetUmbracoContext( out IUmbracoContext? umbracoContext ) && umbracoContext?.Content != null ) ) {
        return 0;
      }

      IPublishedContent? node = umbracoContext.Content.GetById( id );
      if ( node != null ) {
        if ( node.Level == 1 ) {
          return node.Id;
        } else {
          return node.Ancestor( 1 )?.Id ?? 0;
        }
      } else {
        return umbracoContext.Content.GetAtRoot().FirstOrDefault( x => x.ContentType.Alias == "vaerk" )?.Id ?? 0;
      }
    }
  }
}
