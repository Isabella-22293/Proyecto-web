import '@styles/App.css'
import { TokenProvider } from '@hooks/useToken'
import { NavigationProvider } from '@hooks/useNav'
import Router from '../router/Router';

function App() {
    return (
        <TokenProvider>
            <NavigationProvider>
            <Router/>
            </NavigationProvider>
        </TokenProvider>
       
    );
}

export default App;

