using Newtonsoft.Json;

namespace uSync.Migrations.Migrators.Models.Custom;

public class TerratypeValue {
  [JsonProperty( "marker" )]
  public MapPoint? Marker { get; set; }
  [JsonProperty( "zoom" )]
  public int Zoom { get; set; }
  [JsonProperty( "boundingBox" )]
  public BoundingBox? BoundingBox { get; set; }
}

public class BoundingBox {
  [JsonProperty( "southWestCorner" )]
  public MapPoint? SouthWestCorner { get; set; }
  [JsonProperty( "northEastCorner" )]
  public MapPoint? NorthEastCorner { get; set; }
}

public class MapPoint {
  [JsonProperty( "latitude" )]
  public decimal? Latitude { get; set; }
  [JsonProperty( "longitude" )]
  public decimal? Longitude { get; set; }
}
