import React from 'react';
import MemoInsertButton from '../components/MemoInsertButton';

const TestMemoInsertButton=()=>{
    return(
        <div>
            <div> これはMemoInsertButton　の挙動画面です</div>
            追加内容
            <ul>
                <li>レイアウトを下に付ける</li>
                <li>再度クリックしたら消す</li>
                <li>メニューをボタンの上に置く</li>
                <li></li>
            </ul>

            <MemoInsertButton
            
            />

        </div>
 
    )

}

export default TestMemoInsertButton;
