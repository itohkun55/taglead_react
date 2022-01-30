import React, {useState,useEffect} from 'react';
import {connect,useSelector,useDispatch}  from 'react-redux';
import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import UserTagAdminList from '../components/UserTagAdminList';
import { auth_login_success } from '../actions';

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
const TagAdminListPage=(props)=>{
    const dispatch=useDispatch();
    const changFlg=useSelector(state=>state.tag_admin.change,0);
    
    const classes=listStyles();
    //タグ設定を更新したら初期設定内の更新も行ってしまう
    useEffect(() => {
        dispatch(auth_login_success());
    }, [changFlg]);

    
    return (

        <div className={classes.base} >
            <Typography variant='h5'>タグ管理者画面</Typography>
            <UserTagAdminList/>
        </div>
    )
}

export default  TagAdminListPage;