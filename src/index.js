import React from 'react';
import ReactDOM from 'react-dom';

import {
  AuthUserProvider,
  FirebaseProvider,
  ModalProvider,
} from './shared/context';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseProvider>
      <AuthUserProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </AuthUserProvider>
    </FirebaseProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
