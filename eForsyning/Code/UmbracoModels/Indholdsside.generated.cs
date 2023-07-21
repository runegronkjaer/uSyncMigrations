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
	/// <summary>Indholdsside</summary>
	[PublishedModel("indholdsside")]
	public partial class Indholdsside : PublishedContentModel, IPageSettings, ISeo, ITopBanner
	{
		// helpers
#pragma warning disable 0109 // new is redundant
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		public new const string ModelTypeAlias = "indholdsside";
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		public new const PublishedItemType ModelItemType = PublishedItemType.Content;
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[return: global::System.Diagnostics.CodeAnalysis.MaybeNull]
		public new static IPublishedContentType GetModelContentType(IPublishedSnapshotAccessor publishedSnapshotAccessor)
			=> PublishedModelUtility.GetModelContentType(publishedSnapshotAccessor, ModelItemType, ModelTypeAlias);
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[return: global::System.Diagnostics.CodeAnalysis.MaybeNull]
		public static IPublishedPropertyType GetModelPropertyType<TValue>(IPublishedSnapshotAccessor publishedSnapshotAccessor, Expression<Func<Indholdsside, TValue>> selector)
			=> PublishedModelUtility.GetModelPropertyType(GetModelContentType(publishedSnapshotAccessor), selector);
#pragma warning restore 0109

		private IPublishedValueFallback _publishedValueFallback;

		// ctor
		public Indholdsside(IPublishedContent content, IPublishedValueFallback publishedValueFallback)
			: base(content, publishedValueFallback)
		{
			_publishedValueFallback = publishedValueFallback;
		}

		// properties

		///<summary>
		/// Tekst
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("bodyText")]
		public virtual global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel BodyText => this.Value<global::Umbraco.Cms.Core.Models.Blocks.BlockGridModel>(_publishedValueFallback, "bodyText");

		///<summary>
		/// Layout
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("layout")]
		public virtual string Layout => this.Value<string>(_publishedValueFallback, "layout");

		///<summary>
		/// Fremhæv menupunkt: Fungerer kun på øverste niveau i menuen
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[ImplementPropertyType("menuFremhaevet")]
		public virtual bool MenuFremhaevet => global::DffEdb.Umb.Models.PageSettings.GetMenuFremhaevet(this, _publishedValueFallback);

		///<summary>
		/// Menutitel: Angives hvis der ønskes en anden titel i menuen
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("menuTitel")]
		public virtual string MenuTitel => global::DffEdb.Umb.Models.PageSettings.GetMenuTitel(this, _publishedValueFallback);

		///<summary>
		/// Sidetitel
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("sideTitel")]
		public virtual string SideTitel => global::DffEdb.Umb.Models.PageSettings.GetSideTitel(this, _publishedValueFallback);

		///<summary>
		/// Skjul side i menu
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[ImplementPropertyType("umbracoNaviHide")]
		public virtual bool UmbracoNaviHide => global::DffEdb.Umb.Models.PageSettings.GetUmbracoNaviHide(this, _publishedValueFallback);

		///<summary>
		/// Seo
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("seoMetadata")]
		public virtual string SeoMetadata => global::DffEdb.Umb.Models.Seo.GetSeoMetadata(this, _publishedValueFallback);

		///<summary>
		/// Inverter tekst: Hvid tekst istedet for sort - Har ingen effekt hvis sidetitel ikke vises
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[ImplementPropertyType("inverterBannerTekst")]
		public virtual bool InverterBannerTekst => global::DffEdb.Umb.Models.TopBanner.GetInverterBannerTekst(this, _publishedValueFallback);

		///<summary>
		/// Topbillede: Hvis der ikke vælges et billede, anvendes billedet fra den forrige side eller default billedet
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder.Embedded", "11.4.1+29f8f0b")]
		[global::System.Diagnostics.CodeAnalysis.MaybeNull]
		[ImplementPropertyType("topBillede")]
		public virtual global::Umbraco.Cms.Core.Models.MediaWithCrops TopBillede => global::DffEdb.Umb.Models.TopBanner.GetTopBillede(this, _publishedValueFallback);
	}
}
