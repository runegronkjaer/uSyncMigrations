//------------------------------------------------------------------------------
// <auto-generated>
//   This code was generated by a tool.
//
//    Umbraco.ModelsBuilder.Embedded v11.4.1+29f8f0b
//
//   Changes to this file will be lost if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Linq.Expressions;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PublishedCache;
using Umbraco.Cms.Infrastructure.ModelsBuilder;
using Umbraco.Cms.Core;
using Umbraco.Extensions;

namespace DffEdb.Umb.Models
{
	/// <summary>Mit Forbrug</summary>
	[PublishedModel("MitForbrug")]
	public partial class MitForbrug : PublishedContentModel, IMaster
	{
		// helpers
#pragma warning disable 0109 // new is redundant
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		public new const string ModelTypeAlias = "MitForbrug";
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		public new const PublishedItemType ModelItemType = PublishedItemType.Content;
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[return: global::System.Diagnostics.CodeAnalysis.MaybeNull]
		public new static IPublishedContentType GetModelContentType(IPublishedSnapshotAccessor publishedSnapshotAccessor)
			=> PublishedModelUtility.GetModelContentType(publishedSnapshotAccessor, ModelItemType, ModelTypeAlias);
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[return: global::System.Diagnostics.CodeAnalysis.MaybeNull]
		public static IPublishedPropertyType GetModelPropertyType<TValue>(IPublishedSnapshotAccessor publishedSnapshotAccessor, Expression<Func<MitForbrug, TValue>> selector)
			=> PublishedModelUtility.GetModelPropertyType(GetModelContentType(publishedSnapshotAccessor), selector);
#pragma warning restore 0109

		private IPublishedValueFallback _publishedValueFallback;

		// ctor
		public MitForbrug(IPublishedContent content, IPublishedValueFallback publishedValueFallback)
			: base(content, publishedValueFallback)
		{
			_publishedValueFallback = publishedValueFallback;
		}

		// properties

		///<summary>
		/// År (5 år)
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[ImplementPropertyType("aar5Aar")]
		public virtual bool Aar5Aar => this.Value<bool>(_publishedValueFallback, "aar5Aar");

		///<summary>
		/// Dag (1 måned)
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[ImplementPropertyType("dag1Maaned")]
		public virtual bool Dag1Maaned => this.Value<bool>(_publishedValueFallback, "dag1Maaned");

		///<summary>
		/// Info til vejr Tile
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("infoTilVejrTile")]
		public virtual object InfoTilVejrTile => this.Value(_publishedValueFallback, "infoTilVejrTile");

		///<summary>
		/// Måned (1 år)
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[ImplementPropertyType("maaned1Aar")]
		public virtual bool Maaned1Aar => this.Value<bool>(_publishedValueFallback, "maaned1Aar");

		///<summary>
		/// Måned (3 år)
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[ImplementPropertyType("maaned3Aar")]
		public virtual bool Maaned3Aar => this.Value<bool>(_publishedValueFallback, "maaned3Aar");

		///<summary>
		/// Standardvisning
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("standardVisning")]
		public virtual string StandardVisning => this.Value<string>(_publishedValueFallback, "standardVisning");

		///<summary>
		/// Start år for visning: Årstal for hvor langt man må gå tilbage i grafen
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[ImplementPropertyType("startAarForEnergigrafVisning")]
		public virtual int StartAarForEnergigrafVisning => this.Value<int>(_publishedValueFallback, "startAarForEnergigrafVisning");

		///<summary>
		/// Start år for visning: Årstal for hvor langt man må gå tilbage i grafen
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[ImplementPropertyType("startAarForTemperaturgrafVisning")]
		public virtual int StartAarForTemperaturgrafVisning => this.Value<int>(_publishedValueFallback, "startAarForTemperaturgrafVisning");

		///<summary>
		/// TælleværksKnap 1 - Tekst: Teksten på den første tælleverksknap. (maks. 10 tegn)
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("taellevaerksknap1Tekst")]
		public virtual string Taellevaerksknap1Tekst => this.Value<string>(_publishedValueFallback, "taellevaerksknap1Tekst");

		///<summary>
		/// TælleværksKnap 2 - Tekst: Teksten på den 2. tælleværksknap. (maks. 10 tegn)
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("taellevaerksknap2Tekst")]
		public virtual string Taellevaerksknap2Tekst => this.Value<string>(_publishedValueFallback, "taellevaerksknap2Tekst");

		///<summary>
		/// År (5år)
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[ImplementPropertyType("tempGrafaar5Aar")]
		public virtual bool TempGrafaar5Aar => this.Value<bool>(_publishedValueFallback, "tempGrafaar5Aar");

		///<summary>
		/// Beskrivelse: Beskrivelse af Temperaturgraf. Det frarådes at indsætte billeder i denne tekst da der ikke kan garanteres at disse bliver skaleret korrekt på mobile enheder.
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("tempGrafBeskrivelse")]
		public virtual global::Umbraco.Cms.Core.Strings.IHtmlEncodedString TempGrafBeskrivelse => this.Value<global::Umbraco.Cms.Core.Strings.IHtmlEncodedString>(_publishedValueFallback, "tempGrafBeskrivelse");

		///<summary>
		/// Beskrivelse Overskrift
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("tempGrafBeskrivelseOverskrift")]
		public virtual string TempGrafBeskrivelseOverskrift => this.Value<string>(_publishedValueFallback, "tempGrafBeskrivelseOverskrift");

		///<summary>
		/// Dag (1 måned)
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[ImplementPropertyType("tempGrafDag1Maaned")]
		public virtual bool TempGrafDag1Maaned => this.Value<bool>(_publishedValueFallback, "tempGrafDag1Maaned");

		///<summary>
		/// Måned (1 år)
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[ImplementPropertyType("tempGrafMaaned1Aar")]
		public virtual bool TempGrafMaaned1Aar => this.Value<bool>(_publishedValueFallback, "tempGrafMaaned1Aar");

		///<summary>
		/// Standardvisning
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("tempstandardVisning")]
		public virtual string TempstandardVisning => this.Value<string>(_publishedValueFallback, "tempstandardVisning");

		///<summary>
		/// Tile Script: Indsæt fofScript til hent af standard tiles.
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("tilescript")]
		public virtual string Tilescript => this.Value<string>(_publishedValueFallback, "tilescript");

		///<summary>
		/// Tiles opsætning
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("tilesOpsaetning")]
		public virtual object TilesOpsaetning => this.Value(_publishedValueFallback, "tilesOpsaetning");

		///<summary>
		/// Undertitel: Angiver undertitlen på forbrugsgrafen. Max. 8 tegn
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("undertitel")]
		public virtual string Undertitel => this.Value<string>(_publishedValueFallback, "undertitel");

		///<summary>
		/// Vejret overskrift
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("vejretOverskrift")]
		public virtual string VejretOverskrift => this.Value<string>(_publishedValueFallback, "vejretOverskrift");

		///<summary>
		/// Vejret tekst
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("vejretTekst")]
		public virtual global::Umbraco.Cms.Core.Strings.IHtmlEncodedString VejretTekst => this.Value<global::Umbraco.Cms.Core.Strings.IHtmlEncodedString>(_publishedValueFallback, "vejretTekst");

		///<summary>
		/// Vis afkøling
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[ImplementPropertyType("visAfkoeling")]
		public virtual bool VisAfkoeling => this.Value<bool>(_publishedValueFallback, "visAfkoeling");

		///<summary>
		/// Vis forventet temp
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[ImplementPropertyType("visForventetTemp")]
		public virtual bool VisForventetTemp => this.Value<bool>(_publishedValueFallback, "visForventetTemp");

		///<summary>
		/// Vis fremløbstemp
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[ImplementPropertyType("visFremloebstemp")]
		public virtual bool VisFremloebstemp => this.Value<bool>(_publishedValueFallback, "visFremloebstemp");

		///<summary>
		/// Vis neutral temp
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[ImplementPropertyType("visNeutralTemp")]
		public virtual bool VisNeutralTemp => this.Value<bool>(_publishedValueFallback, "visNeutralTemp");

		///<summary>
		/// Vis retur temp
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[ImplementPropertyType("visReturTemp")]
		public virtual bool VisReturTemp => this.Value<bool>(_publishedValueFallback, "visReturTemp");

		///<summary>
		/// Vis temperaturgrafen
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[ImplementPropertyType("visTemperaturgrafen")]
		public virtual bool VisTemperaturgrafen => this.Value<bool>(_publishedValueFallback, "visTemperaturgrafen");

		///<summary>
		/// Menu Tekst
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("menuTekst")]
		public virtual string MenuTekst => global::DffEdb.Umb.Models.Master.GetMenuTekst(this, _publishedValueFallback);

		///<summary>
		/// Skjul i menu
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[ImplementPropertyType("umbracoNaviHide")]
		public virtual bool UmbracoNaviHide => global::DffEdb.Umb.Models.Master.GetUmbracoNaviHide(this, _publishedValueFallback);
	}
}
