import { ACPItem, ACPService, KvPaginator } from "@kelvininc/web-client-sdk";
import React from "react";
import { Subscription } from "rxjs";
import { NODES_LIST_PAGE_SIZE } from "./NodesList.config";
import { NodesListProps, NodesListState } from "./NodesList.types";

export class NodesList extends React.Component<NodesListProps, NodesListState> {
    paginator: KvPaginator<ACPItem>;
    subscription: Subscription;

    constructor(props: NodesListProps) {
        super(props);
        this.paginator = ACPService.getPaginator(ACPService.listACP({
            pageSize: NODES_LIST_PAGE_SIZE
        }));
        this.state = {
            nodesList: [],
            pageState: { hasNext: false, hasPrevious: false }
        }

        this.subscription = this.paginator.onDataReceived.subscribe(page => {
            this.setState({
                nodesList: page.data,
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
                        <td>Node name</td>
                        <td>Node title</td>
                        <td>Node status</td>
                    </tr>
                    {this.state.nodesList.map(node =>
                        <tr key={node.name}>
                            <td>{`${node.name}`}</td>
                            <td>{`${node.title}`}</td>
                            <td>{`${node.status.state}`}</td>
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