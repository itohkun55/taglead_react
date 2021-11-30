import React,{useEffect} from 'react';
import {connect,useSelector,useDispatch}  from 'react-redux';
import {auth_login_success} from '../actions';

import {Button}  from '@material-ui/core';
import MemoMakeModal from '../components/PasswordModal';


const TestPasswordModal=(props)=>{
    const [open,mOpen]=React.useState(false);

    const dispatch=useDispatch();
    const onPrepare=()=>{
        dispatch(auth_login_success());
        
    }

    const openClick=()=>{
        mOpen(true);
    }


    const onClose=()=>{
        mOpen(false);
    }

    //console.log(open);

    return(
        <div>
            <div> これはPasswordModal　の挙動画面です</div>
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
            <div>{props.pwd}</div>
            <Button variant="contained" color="secondary" onClick={onPrepare} >準備</Button>
    
            <Button variant="contained" color="secondary" onClick={openClick} >モダール開く</Button>

        </div>
 
    )

}

const mapStateToProps=state=>{
    console.log("here mapStateToProps password" )
    console.log(state )
    return {pwd:state.pwd};
    
}

export default connect(mapStateToProps)(TestPasswordModal);
