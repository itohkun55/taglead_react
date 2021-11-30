import react,{useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Modal,
    TextField,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Chip,
    Card
    } from '@material-ui/core';

import  {getDateMessage,getUserName,checkHasContent,getTimeStampNow} from  '../lib/UtilityLibrary';


import { makeStyles } from '@material-ui/core/styles';
import {DELETE_NEWFOLLOW_MODAL} from '../lib/ActionTypeString';
import { TYPE_TAG_GUEST,TYPE_TAG_MENBER} from '../lib/TagTypeNames';
import TagText  from './parts/TagText'; 
import TagInputList from './TagInputList';
import {pushNewMemo} from '../actions';

const useStyles=makeStyles((theme)=>({

    root: {
        display: 'flex',
       // justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(0.5),
        },
        padding:"0px 0px 0px"
      },
    asummary:{
        borderRadius:5,
        backgroundColor:"lightblue",
        borderColor:"gray",
        border:"2px"

    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
      followarea:{
          marginLeft:"20%",
          border:'2px solid #888',
          width:"80%",
          fontSize:"12px"
      }

}));


const FollowedInputModal=(props)=>{

    const classes=useStyles();
    const [open,setOpen]=useState(false);
    const [selected,setSelected]=useState([]);
    
    const [registTime,setRegistTime]=useState("");
    
    const [canSubmit,setCanSubmit]=useState(false);
    //後でタグリストは
    const follow_data=useSelector(state=>state.follow_main.follow_data);
    const user_list=useSelector(state=>state.auth_login.user_list);
    const dispatch = useDispatch();
    const[hasTime,setHasTime ]=useState(false);

    const onTagClick=(data)=>{
        let nowselected=[];

        if (selected.some((el)=>el===data)){
            nowselected=selected.reduce((prev,current)=>{
                if( current !== data) prev.push(current);
                return prev;
             },[]);
        }else{
            //中身をソートする
            nowselected=[...selected,data];
        }
        setSelected(nowselected);
    };

    const onClose=()=>{
        setSelected([]);
        dispatch({type:DELETE_NEWFOLLOW_MODAL});
        props.onClose();
    }


    //転送前に選択されているID
    const checkSelected=(arr, id)=>{
        return arr.some((d)=>d.id===id);
    };

    const closeAction=()=>{
        setSelected([]);
        setRegistTime("");
        setHasTime(false);
        setCanSubmit(false);
        //setMainText("");
        props.onClose();
    };

    
    const onSubmit=(text)=>{
        const tagArray= selected.map((d)=>d.keyTag.id);
        const timeS=getTimeStampNow();
        if (!hasTime) setRegistTime(timeS);
        console.log(timeS);

        dispatch(pushNewMemo(tagArray.join(','),text,registTime,follow_data.id ));
        //画面けし処理も追加する
        closeAction();

    };

    return (
        <Modal
        
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.open }
            className={classes.modal}
            onClose={()=>onClose()}
            closeAfterTransition
        >
            <Card className={classes.root}>
                <div>転送</div>
         
         
         
            <div className={classes.followarea}>
                <div><span > { getDateMessage(follow_data.datePublish) }</span>   <span>{ getUserName(user_list,follow_data.keySender) }より </span> </div>
                < div><span>{getDateMessage(follow_data.dateRegist) }</span><span> <TagText tagtextarray={follow_data.strTaglist}/> </span> <span>{follow_data.strMainText}</span></div>
            </div>
            <TagInputList setSelected={setSelected} end={false} />       
                <div>
                    <TextField
                        id="filled-textarea"
                        label="入力内容"
                        placeholder="文章はここに"
                        multiline
                        fullWidth
                    />
                </div>
                <div>
                    <span>
                        <Button color="primary" variant="outlined" onClick={()=>setHasTime(!hasTime)}  > 
                            {!hasTime ? <span>時刻を入れる</span>  :  <span>時刻は外す</span> }  
                        </Button>
                    </span>
                    {hasTime &&
                        <span> <TextField  className={classes.textField} type="datetime-local"  onChange={(e)=> setRegistTime(e.target.value)} /> </span>

                    }
                    <span><Button color="primary" variant="contained" >投稿</Button> </span>
                </div>
            </Card>
        </Modal>

    )
        



};

export default FollowedInputModal;