import ReactDOM from 'react-dom';
import App from './App.tsx'
import './global.css';
import { Provider } from 'react-redux';
import store from './app/store.ts';

ReactDOM.render(
  <Provider
    store={store}
  >
    <App/>
  </Provider>,
  document.getElementById('root')
);