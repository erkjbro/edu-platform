import { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Auth from './components/auth/auth';
import Landing from './components/site/landing/landing';
import Navbar from './components/site/navbar/navbar';

const App = () => {
  // const token = false;

  const routes = (
    <Switch>
      <Route path='/' exact component={Landing} />
      <Route path='/auth' exact component={Auth} />
      <Redirect to='/' />
    </Switch>
  );

  const loading = () => <h1>Loading...</h1>;

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Suspense fallback={loading}>{routes}</Suspense>
      </main>
    </>
  );
};

export default App;
