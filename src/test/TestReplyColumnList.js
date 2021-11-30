import React ,{useEffect,useState} from 'react';
import ReplyColumnList from '../components/ReplyColumnList';
import ReplyColumn from '../components/ReplyColumns';



const TestReplyColumnList=(props)=>{

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

    return(
        <div>
            <div> これはReplyColumnList　の挙動画面です</div>

            <ReplyColumnList　data={makeData(0)}　　/>
        </div>
 
    )

}

export default TestReplyColumnList;
