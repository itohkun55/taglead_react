import { Button } from '@material-ui/core';
import React ,{ useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import { LogOutButton } from '../components/parts/AuthButtons';
import {Card} from "@material-ui/core";
import SingleButtonPage from './SingleButtonPage';

const ErrorPage=(props)=>{

    const error=useSelector(state=>state.error_control);
    const [errorCode,setErrorCode] =useState("");
    const [errorMsg,setErrorMsg] =useState("");

    useEffect(() => {
        setErrorCode(error.errorCode);
        setErrorMsg(error.errorMsg);
        
    }, [error]);

    const Content=()=>{
        return(
            <div>
                <div> エラーが発生しました。　一度ログアウトしてください。</div>
                <div>状況： {errorMsg}</div>
                <div>コード:　{errorCode}</div>
            </div>
    )};
    
    return (
        <SingleButtonPage
            Content={Content()}
            ButtonAction={<LogOutButton/>}
            Footer={<div/>}
        />
    )

}

export default  ErrorPage;
