﻿using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Notifications;
using uSync.Migrations.Handlers;
using uSync.Migrations.Migrators;
using uSync.Migrations.Notifications;
using uSync.Migrations.Services;

namespace uSync.Migrations.Composing;

public class SyncMigrationsComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder
            .WithCollectionBuilder<SyncPropertyMigratorCollectionBuilder>()
                .Append(builder.TypeLoader.GetTypes<ISyncPropertyMigrator>());

        builder.Services.AddTransient<SyncMigrationFileService>();

        builder
            .WithCollectionBuilder<SyncMigrationHandlerCollectionBuilder>()
                .Add(() => builder.TypeLoader.GetTypes<ISyncMigrationHandler>());

        builder.Services.AddTransient<SyncMigrationService>();

        builder.AddNotificationHandler<ServerVariablesParsingNotification, SyncMigrationsServerVariablesParsingNotificationHandler>();

        if (builder.ManifestFilters().Has<SyncMigrationsManifestFilter>() == false)
        {
            builder.ManifestFilters().Append<SyncMigrationsManifestFilter>();
        }
    }
}