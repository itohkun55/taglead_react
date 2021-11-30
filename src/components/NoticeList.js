import React ,{useState,useEffect}  from 'react';
import {useDispatch,useSelector}  from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import NoticeColumn from './NoticeColumn';
//import {LOAD_NEW_MEMO} from '../lib/ActionTypeString';
import {getNoticeData} from '../actions';
import {ScrollUpdater} from '../lib/windowScrollControll';
import LinearProgress from '@material-ui/core/LinearProgress';
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
const NoticeList=(props)=>{
    //const dispatch=useDispatch();
    
    const notices=useSelector(state=>state.notice_main.notices);
    const endflg=useSelector(state=>state.notice_main.endflg);
    const [startnum,setStartNum]=useState(0);
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log(" Add Start");
         dispatch(getNoticeData(startnum));
    },[]);



    const classes=listStyles();

    return (
        <div className={classes.base}>
            {notices.length>0 ?

                notices.map((d)=>{
                    return (<NoticeColumn
                        data={d}
                    />)
                })

            :
            <div>ロード中</div>
            }
            {endflg ?  <div>現在の表示内容は以上です。</div> : <div className={classes.progress}><LinearProgress/></div> }
           

        </div>

    )
}

export default NoticeList;
