using System;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Web.Common;

namespace eForsyning.Code {
  public class SelfService {
    private readonly UmbracoHelper _umbracoHelper;

    public SelfService( UmbracoHelper umbracoHelper ) {
      _umbracoHelper = umbracoHelper;
    }

    public List<SelfServiceItem> GetSelfServiceItems( int id ) {
      DffEdb.Umb.Models.GlobalSettings? globalSettings = _umbracoHelper.ContentAtRoot().First( x => x.ContentType.Alias == DffEdb.Umb.Models.GlobalSettings.ModelTypeAlias ) as DffEdb.Umb.Models.GlobalSettings;

      List<SelfServiceItem> availableSelfServiceItems = new();

      IEnumerable<IPublishedContent>? eForsyningElementer = _umbracoHelper.Content( id ).AncestorOrSelf( 1 ).FirstChild<DffEdb.Umb.Models.Eforsyning>()?.Children.Where( x => x.IsVisible() );

      if ( globalSettings != null && globalSettings.Selvbetjeningspunkter?.Any() == true && eForsyningElementer?.Any() == true ) {
        foreach ( IPublishedContent item in globalSettings.Selvbetjeningspunkter ) {
          if ( eForsyningElementer.Any( x => x.ContentType.Alias == item.ContentType.Alias ) ) {
            IPublishedContent localElement = eForsyningElementer.First( x => x.ContentType.Alias == item.ContentType.Alias );

            string? localName = localElement.Value<string>( "menuTekst" );
            string name = !string.IsNullOrEmpty( localName ) ? localName : localElement.Name;

            availableSelfServiceItems.Add( new( name, new GuidUdi( "Document", localElement.Key ).ToString() ) );
          }
        }
      }

      return availableSelfServiceItems;
    }
  }
}