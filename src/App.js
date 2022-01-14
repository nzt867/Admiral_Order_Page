import DashBoard from './Components/DashBoard/DashBoard';
import { ErrorBoundary } from 'react-error-boundary';
import FallBackErrorBoundary from './Components/FallBackErrorBoundary';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Payment from './Components/Payments/Payment';
import './App.css';

function App() {
  return (
    <ErrorBoundary FallbackComponent={FallBackErrorBoundary}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={(props) => <DashBoard {...props} />} />
          <Route
            path="/payment"
            exact
            render={(props) => <Payment {...props} />}
          />
        </Switch>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
