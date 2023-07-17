namespace eForsyning.Code {
  public class ColorItem {
    public string Color { get; set; }
    public List<string> TextColors { get; set; }

    public ColorItem( string color, List<string> textColors ) {
      Color = color;
      TextColors = textColors;
    }
  }
}
