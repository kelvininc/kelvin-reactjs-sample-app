import { ACPItem } from "@kelvininc/web-client-sdk";

export interface NodesListState {
    nodesList: ACPItem[];
    pageState: {
        hasNext: boolean,
        hasPrevious: boolean
    };
}

export interface NodesListProps { }