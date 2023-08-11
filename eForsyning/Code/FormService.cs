using DffEdb.Umb.Models;
using Newtonsoft.Json;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Web;

namespace eForsyning.Code;

public class FormService
{
  private readonly IUmbracoContextAccessor _umbracoContextAccessor;

  public FormService(IUmbracoContextAccessor umbracoContextAccessor)
  {
    _umbracoContextAccessor = umbracoContextAccessor;
  }

  public List<FormTemplateViewModel>? GetFormTemplates()
  {
    if (!(_umbracoContextAccessor.TryGetUmbracoContext(out IUmbracoContext? umbracoContext) &&
          umbracoContext?.Content != null))
    {
      return null;
    }

    IEnumerable<IPublishedContent>? templateNodes = umbracoContext.Content.GetAtRoot()
      .FirstOrDefault(x => x.ContentType.Alias == GlobalSettings.ModelTypeAlias)?.Children
      .FirstOrDefault(x => x.ContentType.Alias == FormsMaster.ModelTypeAlias)?.Children;

    List<FormTemplateViewModel> templates = new();

    if (templateNodes == null) return templates;

    foreach (IPublishedContent node in templateNodes)
    {
      templates.Add(new FormTemplateViewModel(node.Name, node.Id, JsonConvert.SerializeObject(node.Value("formular"))));
    }

    return templates;
  }
}