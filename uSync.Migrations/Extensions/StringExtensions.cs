using System.Globalization;
using System.Text.RegularExpressions;
using System.Text;

namespace uSync.Migrations.Extensions;

public static class StringExtensions {
  public static string FirstCharToLower( this string @this ) {
    if ( string.IsNullOrEmpty( @this ) ) {
      return "";
    }

    return @this[0].ToString().ToLower() + @this[1..];
  }

  public static string RemoveAccent( this string text ) {
    string normalizedString = text.Normalize( NormalizationForm.FormD );
    StringBuilder stringBuilder = new();

    foreach ( char c in normalizedString ) {
      UnicodeCategory unicodeCategory = CharUnicodeInfo.GetUnicodeCategory( c );
      if ( unicodeCategory != UnicodeCategory.NonSpacingMark ) {
        stringBuilder.Append( c );
      }
    }

    return stringBuilder.ToString().Normalize( NormalizationForm.FormC );
  }

  public static string ConvertToAlias( this string nodeName ) {
    if ( string.IsNullOrWhiteSpace( nodeName ) ) {
      return "";
    }

    nodeName = nodeName.ToLowerInvariant();
    nodeName = nodeName.Replace( "æ", "ae" );
    nodeName = nodeName.Replace( "ø", "oe" );
    nodeName = nodeName.Replace( "å", "aa" );
    nodeName = nodeName.RemoveAccent();
    nodeName = Regex.Replace( nodeName, @"[^a-z0-9\s-/]", "" ); // Remove all non valid chars  
    nodeName = Regex.Replace( nodeName, @"-", "" );
    nodeName = Regex.Replace( nodeName, @"\s", "" ).Trim(); // Remove all spaces

    return nodeName.FirstCharToLower();
  }
}
