export interface IEnvironment {
    production: boolean;
    metadataUrl?: string;
}

export interface IMetadataURLInfo {
    url: string;
    path?: string;
    realm: string;
    port?: number;
}

export interface IMetadataAppInfo {
    client_id: string;
    sentry_dsn?: string;
}

export interface IMetadataAnalyticsInfo {
    environment_id: string;
}

export interface OSInfo {
    os: string;
    arch: string;
    url: string;
    version: string;
}

export enum EMetadataSchemaKey {
    AdminTool = 'admin-tool',
    Analytics = 'analytics',
    Api = 'api',
    Authentication = 'authentication',
    Docker = 'docker',
    Documentation = 'documentation',
    KelvinBuilder = 'kelvin-builder',
    ReportingTool = 'reporting-tool',
    SDK = 'sdk',
    Websocket = 'websocket'
}

export interface IMetadataSchema {
    [EMetadataSchemaKey.AdminTool]: IMetadataAppInfo;
    [EMetadataSchemaKey.Analytics]?: IMetadataAnalyticsInfo;
    [EMetadataSchemaKey.Api]: IMetadataURLInfo;
    [EMetadataSchemaKey.Authentication]: IMetadataURLInfo;
    [EMetadataSchemaKey.Docker]?: IMetadataURLInfo;
    [EMetadataSchemaKey.Documentation]?: IMetadataURLInfo;
    [EMetadataSchemaKey.KelvinBuilder]?: { [key: string]: OSInfo[] };
    [EMetadataSchemaKey.SDK]?: IMetadataAppInfo;
    [EMetadataSchemaKey.Websocket]?: IMetadataURLInfo;
}
