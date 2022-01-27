import { AssetItem } from "@kelvininc/web-client-sdk";

export interface AssetsListState {
    assetsList: AssetItem[];
    pageState: {
        hasNext: boolean,
        hasPrevious: boolean
    };
}

export interface AssetsListProps { }