import { useKeycloak } from "@react-keycloak/web"
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { AssetsList } from "../assets-list/AssetsList";
import { NodesList } from "../nodes-list/NodesList";
import './Home.scss'

export const Home = () => {
  const { keycloak } = useKeycloak();

  return <>
    <button onClick={() => { keycloak.logout() }} >Logout</button>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/assets">Assets</Link>
        </li>
        <li>
          <Link to="/nodes">Nodes</Link>
        </li>
      </ul>
    </nav>
    <Routes>
      <Route path="*" element={<Navigate to="/assets" />} />
      <Route path="/assets" element={<AssetsList />} />
      <Route path="/nodes" element={<NodesList />} />
    </Routes>
  </>
} 