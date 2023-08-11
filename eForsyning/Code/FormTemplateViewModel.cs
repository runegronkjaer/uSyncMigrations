namespace eForsyning.Code;

public class FormTemplateViewModel
{
  public string Name { get; set; }
  public int Id { get; set; }
  public string FormJSON { get; set; }

  public FormTemplateViewModel(string name, int id, string formJson)
  {
    Name = name;
    Id = id;
    FormJSON = formJson;
  }
}