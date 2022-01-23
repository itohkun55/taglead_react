import { Button } from '@material-ui/core';
import React  from 'react';
import { useHistory } from 'react-router-dom';
import SingleButtonPage from './SingleButtonPage';


const NoMatchPage=(props)=>{
    const history=useHistory();
    // const classes=styles();

    const onPress=()=>{
        history.push("/");
    };
    
    return (
        <SingleButtonPage 
            Content={ <div>画面の表示期限が切れました。再ログインご利用してください。</div> }
            ButtonAction={<Button color="secondary" onClick={onPress} variant='outlined'>最初の画面へ</Button>}
            Footer={<div/>}
        />
    );
}

export default  NoMatchPage;
