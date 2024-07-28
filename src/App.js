import React, { useContext, useEffect } from "react";
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthForm from "./Components/Auth/AuthForm";
import Layout from "./Components/Layout/Layout";
import AuthContext from "./Store/AuthContext";
import Profile from "./Components/Profile/Profile";
import Expenses from "./Components/Expenses/Expenses";

function App() {
  const ctx = useContext(AuthContext)
  const token = !!ctx.token

  useEffect(() => {
    ctx.onPageLoad()
  }, [])

  return (
    <Layout>
      <Switch>
        {!token && <Route path='/' exact>
          <AuthForm />
        </Route>}
        {token && <Route path='/profile'>
          <Profile />
        </Route>}
        {token && <Route path='/' exact>
          <Redirect to='/expenses' />
        </Route>}
        {token && <Route path='/expenses'>
          <Expenses />
        </Route>}

        <Route path='*'>
          <Redirect to='/' />
        </Route>

      </Switch>
    </Layout>
  );
}

export default App;
