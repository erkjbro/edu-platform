import { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Landing from './components/site/landing/landing';

const App = () => {
  // const token = false;

  const routes = (
    <Switch>
      <Route path='/' exact component={Landing} />
      <Redirect to='/' />
    </Switch>
  );

  const loading = () => <h1>Loading...</h1>;

  return (
    <>
      <header>
        <div>Navbar</div>
      </header>
      <main>
        <Suspense fallback={loading}>{routes}</Suspense>
      </main>
    </>
  );
};

export default App;
