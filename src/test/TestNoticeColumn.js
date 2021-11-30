import React,{useEffect,useState} from 'react';

import {useSelector,useDispatch} from 'react-redux';
import NoticeColumn from '../components/NoticeColumn';
import  {auth_login_success} from '../actions';
import {Button} from '@material-ui/core';

export const TestNoticeColumn=(props)=>{

    
    //const userlist = useSelector(state => state.auth_login.user_list);
    const [start,setStart]=useState(false);
    const dispatch=useDispatch();

    const dataA={
        memoId:10,//リプライを引く時に使う
        noticeType:1,//メッセージ表記の分岐に使う >自分がタグに含まれていたケース
        fromId:1,//誰から来たか表示する
        detailText:"高橋さん、渡辺さんにも今回のイベントには協力いただくと思うのでよろしくお願いします。" , //本来はメモから引くことが筋だが、クライアント側でさらに処理をすることは
        time: "2021/07/01 12:15"
    };
    
    const dataB={
        memoId:5,//リプライを引く時に使う
        noticeType:2,//メッセージ表記の分岐に使う　＞自分のメモに回答が来たケース
        fromId:6,//誰から来たか表示する
        detailText:"その件についてはすでに施設庁了承済みです",
        time: "2021/07/07 21:51"
    };

    useEffect(()=>{
        console.log(" START ");
        dispatch(auth_login_success());
        
 
    },[]);

    const  onPrepare=()=>{
        //console.log("start ",userlist);
        
       // if(userlist && userlist.length>0){
            setStart(true);
        //} 
    };


    return (
        <div>
                    <Button variant="contained" color="secondary" onClick={onPrepare} >準備</Button>
    
                    <Button variant="contained" color="secondary" onClick={onPrepare} >準備</Button>
            <hr/>
            {start &&
                <div>
                    <NoticeColumn  data={dataA} />
                        <hr/> 
                    <NoticeColumn  data={dataB} />
                </div>
             }
                
        </div>
    )

}