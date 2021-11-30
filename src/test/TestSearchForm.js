import React ,{useEffect,useState} from 'react';
import SearchForm from '../components/SearchForm';
import { useDispatch } from 'react-redux';
import { auth_login_success } from '../actions'; 
import { Button } from '@material-ui/core';


const TestSearchForm=(props)=>{


    const dispatch=useDispatch();
    const [open,mOpen]=useState(false);
    const [self,setSelf]=useState(null);

    const onPrepare=()=>{
        console.log(self);
        dispatch(auth_login_success());
        
    }

    const openClick=()=>{
        mOpen(!open);
    }


    const onClose=()=>{
        mOpen(false);
    }

    return(
        <div>
            <div> これはTestSearchForm　の挙動画面です</div>
            <ul>
                <li>
                    
                </li>
                <li>再度クリックしたら消す</li>
                <li>メニューをボタンの上に置く</li>
                <li></li>
            </ul>
            <div>{props.pwd}</div>
            <Button variant="contained" color="secondary" onClick={onPrepare} >準備</Button>
    
            <Button variant="contained" color="secondary"  ref={button=>setSelf(button)} onClick={openClick} >メニュー開く</Button>

            <SearchForm
                open={open}
                anchor={self}
            
            />

        </div>
 
    )

}

export default TestSearchForm;
