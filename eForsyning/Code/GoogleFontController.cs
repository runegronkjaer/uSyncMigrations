using Azure;
using Newtonsoft.Json;
using System.Net.Http;
using Umbraco.Cms.Web.BackOffice.Controllers;

namespace eForsyning.Code {
  public class GoogleFontController : UmbracoAuthorizedApiController {
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<GoogleFontController> _logger;
    private readonly string _baseUrl = "https://www.googleapis.com/webfonts/v1/webfonts";

    public GoogleFontController( IHttpClientFactory httpClientFactory, ILogger<GoogleFontController> logger ) {
      _httpClientFactory = httpClientFactory;
      _logger = logger;
    }

    public async Task<List<GoogleFont>?> Load() {
      // Google Web Font API Key
      string APIKey = "AIzaSyBupHHkiJjIh_XgwrEHdUeBl-fO-RizZzQ";

      // Google Web Font JSON URL
      string requestUri = string.Format( "?key=" + APIKey );

      HttpClient? httpClient = CreateClient();
      if ( httpClient == null ) {
        throw new ArgumentNullException( nameof( httpClient ) );
      }

      HttpResponseMessage response = await httpClient.GetAsync( $"{_baseUrl}{requestUri}" );
      string googleFontResponse = await response.Content.ReadAsStringAsync();
      GoogleFontResult? googleFontResult = JsonConvert.DeserializeObject<GoogleFontResult>( googleFontResponse );

      return googleFontResult?.Items;
    }

    private HttpClient? CreateClient() {
      try {
        HttpClient httpClient = _httpClientFactory.CreateClient();
        httpClient.BaseAddress = new Uri( _baseUrl );
        return httpClient;
      } catch ( Exception exc ) {
        _logger.LogError( "GoogleFontController:CreateClient() failed", exc );
      }

      return null;
    }
  }

  public class GoogleFontResult {
    [JsonProperty( "kind" )]
    public string? Kind { get; set; }
    [JsonProperty( "items" )]
    public List<GoogleFont>? Items { get; set; }
  }

  public class GoogleFont {
    [JsonProperty( "family" )]
    public string? Family { get; set; }
    [JsonProperty( "variants" )]
    public List<string>? Variants { get; set; }
    [JsonProperty( "subsets" )]
    public List<string>? Subsets { get; set; }
    [JsonProperty( "version" )]
    public string? Version { get; set; }
    [JsonProperty( "lastModified" )]
    public string? LastModified { get; set; }
    [JsonProperty( "files" )]
    public GoogleFilesObject? Files { get; set; }
    [JsonProperty( "category" )]
    public string? Category { get; set; }
    [JsonProperty( "kind" )]
    public string? Kind { get; set; }
    [JsonProperty( "menu" )]
    public string? Menu { get; set; }
  }

  public class GoogleFilesObject {
    [JsonProperty( "regular" )]
    public string? Regular { get; set; }
    [JsonProperty( "italic" )]
    public string? Italic { get; set; }
  }
}
