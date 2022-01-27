import React from "react";
import { AssetItem, AssetService, KvPaginator } from "@kelvininc/web-client-sdk"
import { Subscription } from "rxjs";
import { NUMBER_OF_ASSETS } from "./AssetsList.config";
import { AssetsListProps, AssetsListState } from "./AssetsList.types";
import './AssetsList.scss';

export class AssetsList extends React.Component<AssetsListProps, AssetsListState> {
    paginator: KvPaginator<AssetItem>;
    subscription: Subscription;

    constructor(props: AssetsListProps) {
        super(props);
        this.paginator = AssetService.getPaginator(AssetService.listAsset({
            pageSize: NUMBER_OF_ASSETS
        }));
        this.state = {
            assetsList: [],
            pageState: { hasNext: false, hasPrevious: false }
        }

        this.subscription = this.paginator.onDataReceived.subscribe(data => {
            this.setState({
                assetsList: data.data,
                pageState: {
                    hasNext: !!this.paginator?.hasNext(),
                    hasPrevious: !!this.paginator?.hasPrevious()
                }
            })

        })
    }

    componentDidMount() {
        this.paginator.fetch();
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render(): React.ReactNode {
        return <>
            <table>
                <tbody>
                    <tr>
                        <td>Asset Name</td>
                        <td>Asset Title</td>
                        <td>Asset Type</td>
                    </tr>
                    {this.state.assetsList.map(asset =>
                        <tr key={asset.name}>
                            <td>{`${asset.name}`}</td>
                            <td>{`${asset.title}`}</td>
                            <td>{`${asset.assetTypeTitle}`}</td>
                        </tr>)}
                </tbody>
            </table>
            <div className="paginator-buttons-container">
                {this.state.pageState.hasPrevious && <button onClick={() => { this.paginator.previous() }}>Previous</button>}
                {this.state.pageState.hasNext && <button onClick={() => { this.paginator.next() }}>Next</button>}
            </div>
        </>
    }
}