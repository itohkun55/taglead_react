import React, {useState,useEffect} from 'react';
import {connect,useSelector,useDispatch}  from 'react-redux';
import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
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
        <div className={classes.base}>
            <Typography variant='h5'>お気に入り一覧</Typography>
            <FavoriteList/>
        </div>
    )
}

export default  FavoriteListPage;