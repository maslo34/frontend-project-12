import leoProfanity from 'leo-profanity';
import { Provider, ErrorBoundary } from '@rollbar/react';

import './i18n';

const App = ({ children }) => {
  const ruDict = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDict);

  const rollbarConfig = {
    accessToken: 'a57e3fc1a7dd42f2a8190a9c08f44044',
    environment: 'testenv',
  };

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Provider>
  );
};

export default App;
