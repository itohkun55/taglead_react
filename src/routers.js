import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router';
import {Route,useLocation,Switch,withRouter} from 'react-router-dom';
import SlideRoutes from 'react-slide-routes';
import TestMain  from './pages/TestMain';
import MainListPage from './pages/MainListPage';
import TaggedSearchPage from './pages/TaggedSearchPage';
import  ReplyThreadPage  from './pages/ReplyThreadPage';
import NoticeListPage from './pages/NoticeListPage';
import FavoriteListPage from './pages/FavoriteListPage';
import UserConfigListPage from './pages/UserConfigListPage';
import TagAdminListPage from './pages/TagAdminListPage';
import {CSSTransition}  from 'react-transition-group';
import {TransitionGroup} from 'react-transition-group';
import './pageSlider.scss';
import NoMatchPage from './pages/NoMatchPage';


const PageRouter=(props)=>{

    const location=useLocation();

    const getPathDepth=(location)=> {
      let pathArr = location.pathname.split("/");
      pathArr = pathArr.filter(n => n !== "");
      return pathArr.length;
    };

    const [prevDepth,setPrevDepth]=useState(getPathDepth(location));

    useEffect(() => {
      setPrevDepth(getPathDepth(location));
    },[location]);

    const currentKey = location.pathname.split("/")[1] || "/";
    const timeout = { enter: 800, exit: 400 };

    
    
    return (
      <div>
          <TransitionGroup component="div" className="App">
           <CSSTransition
              key={currentKey}
              timeout={timeout}
              classNames="pageSlider"
              mountOnEnter={true}
              unmountOnExit={true}
            >

              <div  className={ getPathDepth(location) - prevDepth >= 0    ? "left" : "right" }>
          
                <Route  path='/main' exact  component={MainListPage} />
                <Route  path='/tag' exact component={TaggedSearchPage} />
                {/* <Route  path='/test'  exact > <TestMain/> </Route> */}
                <Route  path='/notice' exact component={NoticeListPage} />
                <Route  path='/favorite' exact component={FavoriteListPage} />
                <Route  path='/tagconfig' exact component={UserConfigListPage} />
                <Route  path='/tagadmin' exact component={TagAdminListPage} />
                <Route  path='/reply/:id' exact  component={ReplyThreadPage}  />
                }  
                />
              </div>
              </CSSTransition>
          </TransitionGroup>
      </div>
    )

}

export default  withRouter(PageRouter);