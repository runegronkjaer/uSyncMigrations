namespace uSync.Migrations.Migrators.Models.Custom;

  public class SelfServiceItem {
    public string Name { get; set; }
    public int Id { get; set; }
    public string? Route { get; set; }
    public string? Icon { get; set; }

    public SelfServiceItem( string name, int id ) {
      Name = name;
      Id = id;
    }
  }
