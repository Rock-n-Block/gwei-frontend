import ReactDOM from 'react-dom';
import { MoralisProvider } from 'react-moralis';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider, rootStore } from 'store';

import App from 'App';

import { MORALIS_APP_ID, MORALIS_SERVER_URL } from 'config';

import 'styles/index.scss';

const root = document.getElementById('root');
const app = (
  <MoralisProvider appId={MORALIS_APP_ID} serverUrl={MORALIS_SERVER_URL}>
    <Provider value={rootStore}>
      <Router>
        <App />
      </Router>
    </Provider>
  </MoralisProvider>
);

ReactDOM.render(app, root);
