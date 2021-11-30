import React, {useState,useEffect} from 'react';
import {connect,useSelector,useDispatch}  from 'react-redux';
import { LinearProgress, makeStyles } from '@material-ui/core';
import UserTagConfigList from '../components/UserTagConfigList';

//テスト表示用


const listStyles=makeStyles((theme)=>({
    base: {
        position:'relative',
        top:'60px'
    },

    progress:{
        width: '80%',
        margin: '2px',
    }

}));

//メインページの画面メイン
const UserConfigListPage=(props)=>{
    
    const classes=listStyles();
    
    return (

        <div className={classes.base} >
            <UserTagConfigList/>
        </div>
    )
}

export default  UserConfigListPage;