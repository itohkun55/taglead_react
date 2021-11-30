import React,{useEffect} from 'react';
import PageBase from './PageBase';
import { useSelector } from 'react-redux';

import {Route,useHistory} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import LogoutPage from './pages/LogoutPage';
import TestMain from './pages/TestMain';
import { Switch, useLocation } from 'react-router';
function App() {
  //const datas=datasend;
  const location=useLocation();
  const history= useHistory();
  
  const error=useSelector(state=>state.error_control);
  useEffect(() => {
    if (error.errorFlg){
      history.push("/error");
    }
  }, [error,location]);

  return (

    <div className="App">
      <Switch>
        <Route  path='/' exact component={LoginPage} />
        
        <Route  path='/logout' exact component={LogoutPage} />
        <Route  path='/error' exact component={ErrorPage} />
        <Route  path='/test'  exact > <TestMain/> </Route>
        { location.pathname!="/" &&
        <Route component={PageBase} />
        }
        </Switch>      

    </div>
  );
}


export default App;
