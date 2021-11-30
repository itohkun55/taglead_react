import React,{useEffect,useState} from 'react';
import { useDispatch } from 'react-redux';
import {Button} from '@material-ui/core'
import FreeTagInputModal from '../components/FreeTagInputModal';
//import {tag_start} from '../actions';

export const TestFreeTagPutModal=(props)=>{
    const dispatch = useDispatch();
    
    const [open,setOpen] =useState(false);
    
    useEffect(() => {
        
        ////dispatch(tag_start());
        

    }, []);

    const onClose=()=>{
        setOpen(false);
    }


    return (
        <div>
             <Button size={"small"} variant='contained' color="primary" onClick={()=>setOpen(!open)}>開く</Button>
            
            <hr/>
                <FreeTagInputModal open={open} onClose={onClose}/>

            
            <hr/>   
        </div>
    )

}