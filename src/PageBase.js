import React, {useState,useEffect} from 'react';
import {useDispatch,useSelector}  from 'react-redux';
import MainHeader from "./components/MainHeader";
import MemoInsertButton from "./components/MemoInsertButton";
import FreeTagInputModal from './components/FreeTagInputModal';
import  FormedTagPutModal from './components/FormedTagPutModal';
import  SideMenu from './components/SideMenu';
import  SideDrawer from './components/SideDrawer';
import FeedbackSnackBar from './components/FeedbackSnackBar';
import {FREE_MODAL_OPEN,FORMED_MODAL_OPEN} from './lib/ActionTypeString';
import PageRouter from './routers';

import  {auth_login_success} from './actions';
import APICallController from './lib/ConnectionLibrary';
import { checkHasContent } from './lib/UtilityLibrary';
import { makeStyles } from '@material-ui/core';
import { useWindowDimensions } from './lib/useWindowDimensions';

const Styles=makeStyles({
    
    side: {
        position:"fixed",
        marginTop:'28px',
       width:'200px',
       //top:'120px',
       //zIndex:10,
     } ,
     
    contentMobile: {
        //left:"150px",
        marginTop:"50px",
       //maxWidth:"800px",
       //marginLeft:"10px"
     },
     
     
    contentDesktop: {
        left:"200px",
        marginTop:"50px",
       //maxWidth:"800px",
       marginLeft:"210px"
     },

     article :{
        display:"flex",
       
    }
     
});


//メインページの画面メイン
const PageBase=(props)=>{

    const dispatch=useDispatch();
    const  error=useSelector(state=>state.error_control.errorFlg) ;
    const [menuOpen,setMenuOpen]=useState(false);
    const [freetagOpen,setFreeTagOpen]=useState(false);
    const [formtagOpen,setformTagOpen]=useState(false);
    const [followOpen,setFollowOpen]=useState(false);
    const reply_source=useSelector(state=>state.reply_main.reply_source);
    const follow_data = useSelector(state => state.follow_main.follow_data,{});
    const tag_list=useSelector(state=>state.auth_login.tag_list,[]);

    const classes=Styles();

    const onMenuOpen=()=>{
        setMenuOpen(true);
    };

    const onMenuClose=()=>{
        setMenuOpen(false);
    };



    const closeModal=()=>{
        setformTagOpen(false);
        setFreeTagOpen(false);
        setFollowOpen(false);

    };

    
    useEffect(() => {
        //認証までの実装　実際はログイン終了時のアクションで以下を行う
        if ( tag_list && tag_list.length>0) return;

        if(error) return;

        dispatch(auth_login_success());
    }, []);


    useEffect(()=>{
        if(checkHasContent(follow_data)|| checkHasContent(reply_source) ){
            //console.log("転送データを受け取った！",follow_data);
            //setFollowOpen(true);
            setFreeTagOpen(true);
        }

    },[follow_data,reply_source]);

    const onModalOpen=(action)=>{
        switch (action) {
            case FREE_MODAL_OPEN:
                setFreeTagOpen(true);
                break;
        
            case FORMED_MODAL_OPEN:
                setformTagOpen(true);
                break;
            
            default:
                break;
        }
    };

    const {width,height}=useWindowDimensions();
    const isMobile=width<500;

    const SideSet=()=>{
        if(isMobile){
            console.log("mobileset true");
            return(
                <div ><SideDrawer mobile={true}  open={false}  onClose={onMenuClose}/></div>
            )
        }else{
            return(
                <div className={classes.side} ><SideDrawer mobile={false}  open={true} /></div>
            )
        }
    }

    return (
        <div>
        {error ?
            <div/>
            :   
            <div>
                <MainHeader mobile={isMobile}  openMenu={onMenuOpen} />
                {isMobile ?
                    <SideDrawer mobile={isMobile}  open={menuOpen} onClose={ onMenuClose } />
                :
                    <div className={classes.side} >
                        <SideMenu/>
                    </div>

                }

                <div className={isMobile ? classes.contentMobile : classes.contentDesktop  }>
                    <PageRouter/>
                </div>
                <FeedbackSnackBar/>
                <MemoInsertButton  onModalOpen={onModalOpen} />
                <FormedTagPutModal open={formtagOpen} onClose={()=>closeModal()} />
                <FreeTagInputModal open={freetagOpen} onClose={()=>closeModal()}  follow_data={follow_data} reply_source={reply_source} />
                
            </div>
        }
        </div>

    )

}

export default  PageBase;