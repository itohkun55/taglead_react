import React ,{useEffect} from 'react';
import {useSelector} from 'react-redux';
import  {useSnackbar} from 'notistack';


const FeedbackSnackbar=()=> {

    const {enqueueSnackbar}= useSnackbar();
    const snacklist=useSelector(state=>state.notice_main.snack);

    useEffect(() => {
        //console.log("SNACK!!");
        if(snacklist.length>0){

           enqueueSnackbar(snacklist.slice(-1)[0],{ variant: 'info',autoHideDuration:1000});

        }
    
    }, [snacklist]);

    return null;
}

export default FeedbackSnackbar;