import { AssetItem, AssetService, KvPaginator } from "@kelvininc/web-client-sdk"
import { useKeycloak } from "@react-keycloak/web"
import { useEffect, useRef, useState } from "react"

export const Home = () => {
  const { keycloak } = useKeycloak();
  const [assetsList, setAssetsList] = useState<AssetItem[]>([]);
  const [pageState, setPageState] = useState({ hasNext: false, hasPrevious: false })

  const paginator = useRef<KvPaginator<AssetItem>>();

  useEffect(() => {
    paginator.current = AssetService.getPaginator(AssetService.listAsset());
    let unsubs = paginator.current.onDataReceived.subscribe(data => {
      setPageState({
        hasNext: !!paginator.current?.hasNext(),
        hasPrevious: !!paginator.current?.hasPrevious()
      })
      setAssetsList(data.data);
    })
    paginator.current.fetch();

    return () => {
      unsubs.unsubscribe();
    }
  }, [])

  return <>
    <div>
      {assetsList.map(asset => <div key={asset.name}>{`${asset.name} - ${asset.title}`}</div>)}
    </div>
    <div>
      {pageState.hasPrevious && <button onClick={() => { paginator.current!.previous() }}>Previous</button>}
      {pageState.hasNext && <button onClick={() => { paginator.current!.next() }}>Next</button>}
    </div>
    <button onClick={() => { keycloak.logout() }} >Logout</button>
  </>
}