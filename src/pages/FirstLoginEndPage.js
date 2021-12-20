import { Button } from '@material-ui/core';
import React,{useEffect}  from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setFirstAccess } from '../actions';
import { LogOutButton } from '../components/parts/AuthButtons';
import SingleButtonPage from './SingleButtonPage';


const FirstLoginEndPage=(props)=>{
    const history=useHistory();
    // const classes=styles();
    const dispatch=useDispatch();
    const firstEnd = useSelector(state => state.auth_login.firstend,false);

    const onPress=()=>{
        history.push("/");
    };
    useEffect(() => {
        dispatch(setFirstAccess());
    }, []);

    return (
        <>{firstEnd ?
            <SingleButtonPage 
                Content={ <div>初期登録が完了しました。<br/>一度ログアウトして運営から登録確認の連絡を待ち、利用を開始してください。</div> }
                ButtonAction={<LogOutButton/>}
                Footer={<div/>}
            />
        :
            <div/>
        }

            
        </>
        
    );
}

export default  FirstLoginEndPage;
