import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'YOUR_KEYCLOAK_URL',
  realm: 'YOUR_REALM',
  clientId: 'YOUR_CLIENT_ID'
});

export default keycloak;