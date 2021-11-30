import React, {useEffect} from 'react';
import {useSelector,useDispatch}  from 'react-redux';
import { LinearProgress, makeStyles } from '@material-ui/core';
import  {getReplyData} from '../actions';
import ReplyColumnList  from '../components/ReplyColumnList'
import ReplyColumn from '../components/ReplyColumns';

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
const ReplyThreadPage=(props)=>{
    const reply_main=useSelector(state=>state.reply_main);
    console.log("reply_main",reply_main);
    const dispatch=useDispatch();

    const classes=listStyles();
    
    useEffect(() => {
        dispatch(getReplyData(props.match.params.id));
        
    }, []);

    useEffect(() => {
        console.log("reply_main",reply_main);
        
    }, [reply_main]);

    const normalSceane=()=>{
        return (
            <div className={classes.base} >
                
                {reply_main.past_thread.length!==0 ?
                　　<div><div> 過去の履歴 <div/> <ReplyColumnList   data={ reply_main.past_thread } boxstyle={"thread"} mark={"a"} /></div></div> 
                    :
                     <div/> 
                }
    
                {Object.keys(reply_main.parent_data).length!==0 ? 
                     <div><div> 直近の応答</div><ReplyColumn  data={ reply_main.parent_data } mark={"b"}/></div> 
                :
                     <div/> 
                }
                <div>
                    <ReplyColumn data={reply_main.self_data }  mark={"e"} />
                </div>
                {reply_main.child_data.length!==0 ?　　<div><div> 関連する応答 <div/> <ReplyColumnList   data={ reply_main.child_data } boxstyle={"thread"} mark={"c"}/></div></div> : <div/> }
                {reply_main.future_thread.length!==0 ?　　<div><div> その後の履歴 <div/> <ReplyColumnList   data={ reply_main.future_thread } boxstyle={"thread"}  mark={"d"} /></div></div> : <div/> }
            
            </div>
    
        )
    }

    return (
        reply_main.load_flg ? normalSceane() :<LinearProgress/> 

    )




}

export default  ReplyThreadPage;