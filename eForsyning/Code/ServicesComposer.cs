using Umbraco.Cms.Core.Composing;

namespace eForsyning.Code {
  public class ServicesComposer : IComposer {
    public void Compose( IUmbracoBuilder builder ) {
      builder.Services.AddSingleton<ColorService>();
      builder.Services.AddScoped<SelfService>();
      builder.Services.AddSingleton<FormService>();
    }
  }
}
