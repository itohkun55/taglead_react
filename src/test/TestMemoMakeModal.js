import React from 'react';
import {connect}  from 'react-redux';

import {Button}  from '@material-ui/core';
import MemoMakeModal from '../components/MemoMakeModal';


const TestMemoMakeModal=(props)=>{
    const [open,mOpen]=React.useState(false);
    const openClick=()=>{
        mOpen(true);
    }


    const onClose=()=>{
        mOpen(false);
    }

    //console.log(open);

    return(
        <div>
            <div> これはMemoMakeModal　の挙動画面です</div>
            基礎内容
            <ul>
                <li>ボタンを押したら表示される</li>
                <li>仕様の項目を表示する</li>
                <li>モーダルのボタンを押したときのイベントを実行する</li>
                <li>モーダルの後ろにはタッチできない</li>
            </ul>

            <MemoMakeModal
                open={open}
                onClose={onClose}

            />
            <div>{props.memo}</div>
    
            <Button variant="contained" color="secondary" onClick={openClick} >モダール開く</Button>

        </div>
 
    )

}

const mapStateToProps=state=>{
   
    return {memo:state.memo};
    
}

export default connect(mapStateToProps)(TestMemoMakeModal);
