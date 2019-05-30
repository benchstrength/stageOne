interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'yuZNRDB5Uc3rt5womQAlrw6KS8dOXUaq',
  domain: 'bench-strength.auth0.com',
  callbackURL: window.location.origin + '/callback'
};
