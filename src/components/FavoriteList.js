import React ,{useState}  from 'react';
import {useDispatch,useSelector}  from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import MemoColumn from './MemoColumn';
//import {LOAD_NEW_MEMO} from '../lib/ActionTypeString';
import {showFavorite} from '../actions';
import {ScrollUpdater} from '../lib/windowScrollControll';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
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
const FavoriteList=(props)=>{
    //const dispatch=useDispatch();
    
    
    const timeline=useSelector(state=>state.show_favorite.timeline,[]);
    const read=useSelector(state=>state.show_favorite.read,[]);
    const fav=useSelector(state=>state.show_favorite.fav,[]);
    const endflg=useSelector(state=>state.show_favorite.endflg);
    const dispatch = useDispatch();

    const setNewTimeLine=()=>{
        dispatch(showFavorite());
    };

    const classes=listStyles();

    return (
        <div className={classes.base}>
            <div><Typography variant='h5' gutterBottom >お気に入り一覧</Typography></div>
            <hr/>
            <ScrollUpdater scrollFunc={()=>setNewTimeLine() }  checkParam={timeline} endflg={endflg} buffer={60} />
            {timeline && 
                timeline.map((d)=>{
                    return (<MemoColumn
                        key={d.id}
                        data={d}
                        read={read}
                        fav={fav}
                    />)
                })
            }
            {endflg ?  <div><Typography variant='h6' gutterBottom >現在の表示内容は以上です。</Typography></div> : <div className={classes.progress}><LinearProgress/></div> }
           

        </div>

    )
}

export default FavoriteList;
