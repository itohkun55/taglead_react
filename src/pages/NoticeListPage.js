import React from 'react';
import {useSelector,useDispatch}  from 'react-redux';
import MainHeader from "../components/MainHeader";
import {  makeStyles } from '@material-ui/core';
import NoticeList from '../components/NoticeList';

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
const NoticeListPage=(props)=>{
    const classes=listStyles();

    return (
        
        <div >
            <NoticeList />
        </div> 

    )
}

export default  NoticeListPage;