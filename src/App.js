import React, { useContext, useEffect } from "react";
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthForm from "./Components/Auth/AuthForm";
import Layout from "./Components/Layout/Layout";
import Profile from "./Components/Profile/Profile";
import Expenses from "./Components/Expenses/Expenses";
import { useDispatch, useSelector } from "react-redux";
import { onPageLoad } from "./Store/expense-slice";

function App() {
  // const ctx = useContext(AuthContext)
  // const token = !!ctx.token

  // useEffect(() => {
  //   ctx.onPageLoad()
  // }, [])
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const mailId = localStorage.getItem('mailId')

    if (token && mailId) {
      dispatch(onPageLoad(token, mailId))
    }
  }, [dispatch])

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
