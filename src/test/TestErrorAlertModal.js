import React,{useEffect} from 'react';
import {useSelector,useDispatch}  from 'react-redux';
import {auth_login_success} from '../actions';

import {Button}  from '@material-ui/core';
import {ErrorAlertModal} from '../components/ErrorAlertModal';
import { CONNECT_ERROR,RESULT_ERROR } from '../lib/ActionTypeString';


const TestErrorAlertModal=(props)=>{
    const [open,mOpen]=React.useState(false);

    const dispatch=useDispatch();

    const openClick=()=>{
        dispatch({type:RESULT_ERROR});
    }


    const openClick2=()=>{
        dispatch({type:CONNECT_ERROR});
    }

    const onClose=()=>{
        mOpen(false);
    }

    //console.log(open);

    return(
        <div>
            <div> これはErrorAlertdModal　の挙動画面です</div>
            
            <ErrorAlertModal
                open={open}
                onClose={onClose}

            />
            <Button variant="contained" color="secondary" onClick={openClick} >結果エラー</Button>
    
            <Button variant="contained" color="secondary" onClick={openClick2} >通信エラー</Button>

        </div>
 
    )

}


export default TestErrorAlertModal;
