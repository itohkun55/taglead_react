import React,{useEffect} from 'react';
import PageBase from './PageBase';
import { useSelector } from 'react-redux';

import {Router, Route,useHistory} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import LogoutPage from './pages/LogoutPage';
import TestMain from './pages/TestMain';
import { Switch, useLocation } from 'react-router';
import { FirstLoginButton } from './components/parts/AuthButtons';
import FirstLoginEndPage from './pages/FirstLoginEndPage';
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
      <Router history={history} >
        <Switch>
          <Route  path='/' exact component={LoginPage} />
          
          <Route  path='/logout' exact component={LogoutPage} />
          <Route  path='/firstend' exact component={FirstLoginEndPage} />
          <Route  path='/error' exact component={ErrorPage} />
          <Route  path='/test'  exact > <TestMain/> </Route>
          { location.pathname!=="/" &&
          <Route component={PageBase} />
          }
        </Switch>      
      </Router>
    </div>
  );
}


export default App;
