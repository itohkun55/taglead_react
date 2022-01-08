import {useState,useEffect,useRef} from 'react';
import { useDispatch } from 'react-redux';
import {Modal,
    TextField,
    Button,
    Box,
    Card
    } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import { Fade } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {pushNewMemo,setReplyData} from '../actions';
import {getTimeStampNow,checkHasContent} from '../lib/UtilityLibrary';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import FormatQuote from '@material-ui/icons/FormatQuote';
import TagInputList from './TagInputList';
import SummaryMemo from './parts/SummaryMemo';
import { DELETE_NEWFOLLOW_MODAL,DELETE_NEW_REPLY_MODAL } from '../lib/ActionTypeString';

const useStyles=makeStyles((theme)=>({

    root: {
        //display: 'flex',
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
    closeModal: {
        //position: "absolute",
        top: 0,
        right: 0
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
        
      },

    checkModal:{
        position:"absolute",
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: '#ffffff',
        padding:"15px",
        spacing:"5px",
        top:"30%",
        left:"50%",
        border: '1px solid #000',
        borderRadius:"5px",

        boxShadow: 24
    }
    

}));

const CloseCheckModal=(props)=>{
    const classes=useStyles();
    return(
        <div >
            <Modal
                hideBackdrop
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box className={classes.checkModal}>
                    <div>
                        <Typography variant='h6' >記入途中ですが閉じますか？</Typography>
                    </div>
                    <div>
                        <span><Button variant="contained" onClick={props.onClose}>閉じる</Button></span>
                        <span><Button  variant="contained" onClick={props.onCancel}>キャンセル</Button></span>
                    </div>
                </Box>
            </Modal>
        </div>
    )

}


const FreeTagInputModal=(props)=>{
    
    const classes=useStyles();
    const [selected,setSelected]=useState([]);
    const dispatch = useDispatch();
    const[hasTime,setHasTime ]=useState(false);
    const [registTime,setRegistTime]=useState("");
    const [canSubmit,setCanSubmit]=useState(false);
    const [mainText,setMainText]=useState("");
    const textRef=useRef(null);
    const [checkClose,setCheckClose]=useState(false);


    const [isReply,setIsReply]=useState(false); 
    const [isFollow,setIsFollow] =useState(false);
    const [defSelected,setDefSelected]=useState([]);

    useEffect(()=>{
        const submitCheck=selected.length===0||mainText.length===0 || (hasTime && registTime==="");
        
        setCanSubmit(!submitCheck);
    },[selected,mainText,hasTime,registTime]);
    
    useEffect(()=>{
        const sir=checkHasContent(props.reply_source);
        setIsReply(sir);
        
        const sif=checkHasContent(props.follow_data);
        setIsFollow(sif);
        
        if (sir){
            setDefSelected(  props.reply_source.strTaglist.split(","));
        }else if(sif){
            setDefSelected(props.follow_data.strTaglist.split(","));
        }


    },[props]);

    const inputCheck=(text)=>{
        setMainText(text);
    };

    const onSubmit=(text)=>{

        const tagArray= selected.map((d)=>d.id);
        let timeS=getTimeStampNow();
        if (hasTime) timeS=registTime;
        console.log(timeS,hasTime);
        let follow=-1;
        if(isReply){

            dispatch(setReplyData(tagArray.join(','),text,timeS,props.reply_source ));
        }else{
            if (isFollow) follow=props.follow_data.id;

            dispatch(pushNewMemo(tagArray.join(','),text,timeS,follow ));    
        }

        //画面けし処理も追加する
        closeAction();

    };

    const onClose=()=>{
        if (mainText!==""){
            setCheckClose(true)
            return;
        }
        closeAction();
    };

    const setRegistTimeManual=(str)=>{
        console.log("time change"+str);
        setRegistTime(str);
    }

    const closeAction=()=>{
        setSelected([]);
        setDefSelected([]);
        setCheckClose(false);
        setRegistTime("");
        setHasTime(false);
        setCanSubmit(false);
        setMainText("");
        props.onClose();

        if(isFollow) dispatch({type:DELETE_NEWFOLLOW_MODAL});
        if(isReply) dispatch({type:DELETE_NEW_REPLY_MODAL});
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
        <Fade in={props.open}>
            <Card className={classes.root}>
                <CloseCheckModal open={checkClose} onClose={()=>closeAction()} onCancel={()=>setCheckClose(false)} />

           <div onClick={()=>onClose()}><Cancel className={classes.closeModal}/></div> 
                {/* 返信の場合の表示 */}
                { isReply && 
                    <div>
                        <SummaryMemo data={props.reply_source}/>
                        <div><span><ArrowDownward/></span> <span><Typography variant='h6'>返信元</Typography></span>  </div>
                    </div>
                }
                
                <TagInputList setSelected={setSelected} defSelected={defSelected} />
                {/* 転送の場合の表示 */}
                { isFollow && 
                    <div>
                    <span><FormatQuote/><Typography variant='h6'>転送</Typography></span>
                    <SummaryMemo data={props.follow_data}/>
                    </div>
                }
                
                <TextField
                    id="filled-textarea"
                    label="入力内容"
                    inputRef={textRef}
                    placeholder="タグは1種類以上選択しましょう"
                    multiline
                    minRows={3}
                    fullWidth
                    onChange={(e)=>inputCheck(e.target.value)}
                />
                <div>
                    <span>
                        <Button color="primary" variant="outlined" onClick={()=>setHasTime(!hasTime)} > 
                            {!hasTime ? <span>時刻を入れる</span>  :  <span>時刻は外す</span> }  
                        </Button>
                    </span>
                    {hasTime &&
                        <span> <TextField  className={classes.textField} type="datetime-local" onChange={(e)=> setRegistTimeManual(e.target.value) } /> </span>

                    }
                    {canSubmit ?
                        <span><Button color="primary" variant="contained" onClick={()=>onSubmit(textRef.current.value)} >投稿</Button> </span>
                        :
                        <span><Button color="primary" variant="contained" disabled  >投稿</Button> </span>

                    }
                    
                </div>
            </Card>
        </Fade>
        </Modal>
    )
};

export default FreeTagInputModal;