namespace eForsyning.Code {
  public class SelfServiceItem {
    public string Name { get; set; }
    public string Udi { get; set; }
    public string? Route { get; set; }
    public string? Icon { get; set; }

    public SelfServiceItem( string name, string udi ) {
      Name = name;
      Udi = udi;
    }
  }
}
