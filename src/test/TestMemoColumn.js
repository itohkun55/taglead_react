import React from 'react';
import MemoColumn from '../components/MemoColumn';

export const TestMemoColumn=(props)=>{


    const testdata={
        id:1,
        key:1,
        threadId:1 ,
        parentId:-1,
        setTime:"2021-07-18 11:23",
        senderName:4,
        time:"2021-6-23 11:23",
        hasStar:false,
        read:false,
        tagText:["7番街","近藤","食事"],
        getName:[1,3,5],
        detailText:"小さいころから無鉄砲で損ばかりしている。祇園精舎の鐘の音諸行無常の響きあり、沙羅双樹の花の色盛者必衰の断りを表す。奢れるものも久しからず。ただ風のごとし",
        //サーバーからは内容をそのまま送る。クライアントで組み立てない。
        follow:{
            id:3,
            setTime:"2021-07-18 11:23",
            senderName:1,
            time:"2021-6-23 11:23",
            tagText:["1番街","佐藤","食事"],
            getName:[1,3,5],
            detailText:"月日は百体の過客にして、行きかう人もまた旅人なり",
    
        }
    };


    return (
        <div>
            
            <hr/>
                <MemoColumn
                    data={testdata}
                   senderName={"7番街で"}
                
                    hasStar={true}
                    read={false}
                    detailText={"あの件は大丈夫ですよ。あの件は大丈夫ですよ。\nあの件は大丈夫ですよ。\nあの件は大丈夫ですよ。あの件は大丈夫ですよ。あの件は大丈夫ですよ。"}
                
                
                />
            
            <hr/>   
        </div>
    )

}