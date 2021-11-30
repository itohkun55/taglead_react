import React from 'react';
import {makeStyles} from '@material-ui/styles';

const styles=makeStyles((theme)=>({
    textarea:{
        width:"200px",
        //height:"100px",
        backgroundColor:"#ccc",
        color:"black"
    }
}));


export const TestContentEditable=(props)=>{
    const classes=styles();

    const changeText=()=>{
        
    }

    return (
        <div>
            
            <hr/>
                <div 
                className={classes.textarea}
                 >
                    <span contentEditable={false}>ここは本当に消さないで</span>
                    <span contentEditable={false}>ここは本当に消さないで</span>
                    <span contentEditable={true}>ここは本当に消さないで</span>
                    <span contentEditable={false}>ここは本当に消さないで</span>
                    <span contentEditable={true}　>ここは消してもええよよよよよよよよよよよよよよよよよよよよ</span>
                 
                </div>
            
            <hr/>   
        </div>
    )

}