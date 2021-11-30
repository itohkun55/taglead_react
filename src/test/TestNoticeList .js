import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import NoticeList from '../components/NoticeList';
import {Button} from '@material-ui/core';
import {getNoticeData,auth_login_success} from  "../actions"; 
//MemoList  
// スクロールで最後まで行くと次の分を表示する
//メモを削除したら再度そこまで戻る


export const TestNoticeList=(props)=>{
    const [memoData,setMemoData]=React.useState([]);

    const [id,setId]=React.useState(0);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(auth_login_success());
        
        //dispatch(getNoticeData());
    },[]);

    const  onPrepare=()=>{
        //console.log("start ",userlist);
        
       // if(userlist && userlist.length>0){
        dispatch(getNoticeData);
        //} 
    };
    
    return (
        <div>
            <Button variant="contained" color="secondary" onClick={onPrepare} >準備</Button>
    
            <hr/>
                <NoticeList
                  
                />
            
            <hr/>   
        </div>
    )

}