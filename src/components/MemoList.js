import React ,{useState,useEffect}  from 'react';
import {useDispatch,useSelector}  from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import MemoColumn from './MemoColumn';
//import {LOAD_NEW_MEMO} from '../lib/ActionTypeString';
import {loadNewMemo} from '../actions';
import {ScrollUpdater} from '../lib/windowScrollControll';
import { Grid } from '@material-ui/core';
import APICallController from '../lib/ConnectionLibrary'; 
import LinearProgress from '@material-ui/core/LinearProgress';
import { getTimeStampNow } from '../lib/UtilityLibrary';
//このリスト画面自体は通信にはかかわらず、親のコンポーネントからデータを渡す
//このコンポーネント自体はスクロール位置に関係する



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
const MemoList=(props)=>{
    //const dispatch=useDispatch();
    const user_list=useSelector(state=>state.auth_login.user_list,[]);
    const timeline=useSelector(state=>state.memo_main.timeline,[]);
    const read=useSelector(state=>state.memo_main.read,[]);
    const fav=useSelector(state=>state.memo_main.fav,[]);
    
    const endflg=useSelector(state=>state.memo_main.endflg);
    const dispatch = useDispatch();
    
    const changFlg=useSelector(state=>state.memo_main.change);
    useEffect(() => {
        if(timeline.length>0){
            dispatch(loadNewMemo("-1"));
        }
    }, [changFlg]);


    
    const setNewTimeLine=()=>{
        let fromDay="-1";
        if (timeline.length>0) {
            fromDay=new Date(timeline.slice(-1)[0].dateRegist).toJSON();
        } 

        if(endflg) return;

        console.log(" Add Start",fromDay);
        dispatch(loadNewMemo(fromDay));
        //loadNewMemo(startnum);
    };

    const classes=listStyles();

    return (
        <div className={classes.base}>
            {user_list.length>0 && 
            <ScrollUpdater scrollFunc={()=>setNewTimeLine() }  checkParam={timeline} endflg={endflg} buffer={60} />
            }
            
            <Grid spacing={2}>
            {
                timeline.map((d)=>{
                    return (<MemoColumn
                        key={d.id}
                        data={d}
                        read={read}
                        fav={fav}
                    />)
                })
            }
            
            </Grid>

            
            {endflg ?  <div>現在の表示内容は以上です。</div> : <div className={classes.progress}><LinearProgress/></div> }
           

        </div>

    )
}

export default MemoList;
