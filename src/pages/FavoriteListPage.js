import React, {useState,useEffect} from 'react';
import {connect,useSelector,useDispatch}  from 'react-redux';
import { LinearProgress, makeStyles } from '@material-ui/core';
import FavoriteList from '../components/FavoriteList';

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
const FavoriteListPage=(props)=>{
    const classes=listStyles();
    
    return (    
        <div >
            <FavoriteList/>
        </div>
    )
}

export default  FavoriteListPage;