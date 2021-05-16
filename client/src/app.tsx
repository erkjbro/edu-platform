import { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './components/site/navbar/navbar';
import Landing from './components/site/landing/landing';
import { useActions } from './hooks/use-actions';
import { useTypedSelector as useSelector } from './hooks/use-typed-selector';

const Auth = lazy(() => import('./components/auth/auth'));
const AdminConsole = lazy(() => import('./components/admin'));
const Dashboard = lazy(() => import('./components/student'));

const App = () => {
  const auth = useSelector((state) => state.auth);
  const actions = useActions();

  console.log(auth);

  useEffect(() => {
    actions.authCheckState();
  }, [actions]);

  const routes = (
    <Switch>
      <Route path='/' exact component={Landing} />
      <Route path='/auth' exact component={Auth} />
      <Route path='/admin' exact component={AdminConsole} />
      <Route path='/student' exact component={Dashboard} />
      <Redirect to='/' />
    </Switch>
  );

  const Loader = () => <div>Loading...</div>;

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Suspense fallback={<Loader />}>{routes}</Suspense>
      </main>
    </>
  );
};

export default App;
