
import { ReactKeycloakProvider } from '@react-keycloak/web'
import Keycloak from 'keycloak-js'
import './App.scss';
import KelvinSDK from '@kelvininc/web-client-sdk';
import axios from 'axios';
import { Home } from './pages/home/Home';
import { useEffect, useState } from 'react';
import { environment } from '../environment/environment';
import { IMetadataSchema } from '../environment/environment.types';

function App() {

  const [authenticated, setIsAuthenticated] = useState(false);
  const [metadata, setMetadata] = useState<IMetadataSchema>();
  const [authClient, setAuthClient] = useState<Keycloak.KeycloakInstance>();

  useEffect(() => {
    // get environment url from the metadata endpoint
    axios.get<IMetadataSchema>(`${environment.metadataUrl}`).then((response) => {
      setMetadata(response.data);
    })
  }, [])

  useEffect(() => {
    if (metadata) {
      const config = {
        clientId: metadata['admin-tool'].client_id, // get the keycloak clientId
        realm: metadata.authentication.realm, // get the keycloak realm
        url: `${metadata.authentication.url}${metadata.authentication.path}`, // get the keycloak auth url
      }
      KelvinSDK.initialize({
        baseUrl: `${metadata.api.url}${metadata.api.path}` // `https://beta.kelvininc.com/v4/api/`
      }, axios);
      setAuthClient(Keycloak(config));
    }
  }, [metadata])

  return authClient ? <ReactKeycloakProvider authClient={authClient}
    initOptions={{
      onLoad: 'login-required',
      checkLoginIframe: false,
      loadUserProfileAtStartUp: false,
      bearerExcludedUrls: []
    }}
    onTokens={(tokens) => {
      KelvinSDK.setSessionConfiguration({
        accessToken: `${tokens.token}`,
        refreshToken: `${tokens.refreshToken}`
      })
      setIsAuthenticated(true);
    }}>
    <div>{authenticated && <Home></Home>}</div>
  </ReactKeycloakProvider> : null
}

export default App;
