import React,{useEffect,useState} from 'react';
import { NavLink,useLocation,useHistory } from 'react-router-dom';
import  {useWindowDimensions} from '../lib/useWindowDimensions';
import SearchIcon from '@material-ui/icons/Search';

import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';


//メモ単画像表示

//現在ログインしているユーザの名前を表示する
//ログインしているユーザーがいなければ施設の名前を表示する

//機能メニューを表示する

const mainheaderStyle = makeStyles((theme) => ({
  // root:{
  //   flexGrow: 1,
  //   display :"flex",
  //   justifyContent: "center"
  
  // },
  layOut:{
    justifyContent: "center"
  },
    centerButton:{
      display:"flex",
      justifyContent:"center"

    },
    nav: {
      display: "grid",
      grid: "auto / auto-flow",
      padding: "3px",
      marginTop: "4px",
      marginBottom: "4px",
      background: "#eee",
      borderRadius: "10px",

      "& a" :{
        display: "block",
        color: "#000",
        //marginRight:"15px",
        //marginLeft:"15px",
        padding:" 0 20px",
        textAlign: "center",
        lineHeight: "32px",
        textDecoration: "none"
      },
      "& a.active" : {
        background: "#fff",
        fontWeight: 500,
        borderRadius: "8px",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)"
      }
    
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    
  }));
  

const MainHeader=(props)=>{
  //console.log("props"+ props);
    const classes = mainheaderStyle();
    const [prevPath,setPrevpath]=useState("");
    const location=useLocation();
    const [isBack,setIsBack]=useState(false);

    const openSearch=()=>{
      //showSearch(!search);
    };

    useEffect(()=>{

      const path=location.pathname.split("/")[1];
      if ( "tag" === path || "main" === path ){
        setIsBack(false);
        setPrevpath(path);
      }else{
        setIsBack(true);
      }

    },[location]);
    const history=useHistory();

    const { width, height } = useWindowDimensions();
    //今はサイズは適当
    //if (width>500){
        return (
            <div   >
              <AppBar position="fixed"  >
                <Toolbar>
                  {isBack ?
                    <IconButton  onClick={()=>history.push("/"+prevPath)} ><ArrowBackIcon/></IconButton>
                    :
                    width<600  &&
                          <IconButton edge="start" className={classes.menuButton}  onClick={()=>props.openMenu()} color="inherit" aria-label="menu">
                             <MenuIcon  />
                          </IconButton>

                  }
                  {!isBack &&
                    <div className={classes.centerButton}>
                      <span className={classes.nav}>
                          <NavLink to="/main" exact><div className={classes.a}><Typography variant='h6' gutterBottom >  一覧  </Typography></div></NavLink>
                          <NavLink to="/tag" exact><div className={classes.a}><Typography variant='h6' gutterBottom > タグ検索 </Typography></div></NavLink>
                      </span>
                      
                      <IconButton onClick={()=>openSearch()}  ><SearchIcon/></IconButton>
                    </div>

                  }
              
                </Toolbar>
              </AppBar>
            </div>
          );

    //}

}

export default MainHeader;