import React, {useEffect} from 'react';
import MemoList from '../components/MemoList';
import {connect} from 'react-redux';
import {Button} from '@material-ui/core';
//MemoList  
// スクロールで最後まで行くと次の分を表示する
//メモを削除したら再度そこまで戻る

const makeData=(a)=>{
    const ar=[];
    console.log("start a",a)

    for(let key=a;key<a+20;key++) {
        ar.push(
            {
                key:key,
                senderName:"name:"+key,
                hasStar:false,
                read:false,
                detailText:key+"あいうえおかきくけこ,あいうえおかきくけこ,あいうえおかきくけこ,あいうえおかきくけこ,あいうえおかきくけこ,"
            });
    }
    return ar;

}

export const TestMemoList=(props)=>{
    const [memoData,setMemoData]=React.useState([]);

    const [id,setId]=React.useState(0);

    const setNextData=()=>{

        const newid=id+20;
        setId(newid);
        const newdata=memoData.concat(makeData(newid));
         setMemoData(newdata);
    }

    const onEnd=()=>{
        setNextData();
                
    }

    useEffect(()=>{
        setMemoData(makeData(0));
    },[]);

    
    return (
        <div>
            <hr/>
                <MemoList
                    data={memoData}
                    onEnd={onEnd}
                />
            
            <hr/>   
        </div>
    )

}