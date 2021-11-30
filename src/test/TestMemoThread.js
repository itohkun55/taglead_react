import React, {useEffect} from 'react';
import MemoThread from '../components/MemoThread';
import {Button} from '@material-ui/core';
import { TestReplyData } from '../lib/TestReplyThreadData';
//MemoList  
// スクロールで最後まで行くと次の分を表示する
//メモを削除したら再度そこまで戻る


const TestMemoThread=(props)=>{
    const [memoData,setMemoData]=React.useState([]);

    const [id,setId]=React.useState(0);    
    return (
        <div>
            <hr/>
                <MemoThread
                    thread={TestReplyData}
                />
            
            <hr/>   
        </div>
    )

}

export default TestMemoThread 