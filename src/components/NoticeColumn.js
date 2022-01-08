//各メモの表示を行う


//初期状態メモヘッダーのみ表示

//ヘッダーから開閉イベントを受けたら詳細をアニメーションで展開する

import React ,{useState,useEffect} from 'react';

import {useSelector} from 'react-redux';
import {Box}  from '@material-ui/core';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { TEXT_LIMIT } from '../lib/ServiceConfig';
import {getUserName,getDateMessage}  from  '../lib/UtilityLibrary';
const useStyles = makeStyles((theme) => ({

    memo:{            
        width: '90%',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1, 2, 0),
        border: '1px solid #000',
      },

    mainExp:{
        fontSize:"12pt",
        color:"#555555"
    },
    
    subExp:{
        fontSize:"10pt",
        color:"#aaa"
    },

     
  }));


/*
  ・届いた時間
  ・送り元
  ・メッセージ

*/


const NoticeColumn=({data})=>{
    
    const setHeaderText=(txt)=>{
        return txt.substring(0,TEXT_LIMIT)+"....";
    };
    
    const userlist = useSelector(state => state.auth_login.user_list);
    const classes=useStyles();
    const maintext =setHeaderText(data.keyMemoMain.strMainText);
 
    const [senderMsg,setSenderMsg]= useState("");


    useEffect(()=>{
        if (!userlist || userlist.length===0) return;

        const sender=getUserName(userlist,data.keyMemoMain.keySender);

        if (data.numNoticeType===1){
            setSenderMsg(sender+"からメモが来ています。");
        } else{
            setSenderMsg(sender+"から返信が来ています。");
        }
    },[userlist]);


    return (
        <div>

                <Box className={classes.memo}>
                    <Link underline="none" to={"/reply/" +  data.keyMemoMain.id} replace >
                        <div className={classes.mainExp}>
                            {getDateMessage(data.keyMemoMain.dateRegist) } : {senderMsg}  
                        </div>
                        <div className={classes.subExp}>{maintext} </div>
                    </Link>
                </Box>
        </div>
    )

}

export default NoticeColumn;