import React, {useEffect} from 'react';

import RootNavigator from './src/navigators/index';
import SplashScreen from 'react-native-splash-screen';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return <RootNavigator />;
}

export default App;
