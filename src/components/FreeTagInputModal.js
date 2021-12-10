import {useState,useEffect,useRef} from 'react';
import { useDispatch } from 'react-redux';
import {Modal,
    TextField,
    Button,
    Card,
    } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {pushNewMemo,setReplyData} from '../actions';
import {getTimeStampNow,checkHasContent} from '../lib/UtilityLibrary';
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
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
    

}));


const FreeTagInputModal=(props)=>{
    

    const classes=useStyles();
    const [selected,setSelected]=useState([]);
    const [end,setEnd]=useState(false);
    
    const dispatch = useDispatch();
    const[hasTime,setHasTime ]=useState(false);
    const [registTime,setRegistTime]=useState("");
    const [canSubmit,setCanSubmit]=useState(false);
    const [mainText,setMainText]=useState("");
    const textRef=useRef(null);

    useEffect(()=>{
        if ( selected.length===0||mainText.length===0 || (hasTime && registTime==="") ){
            setCanSubmit(false);
        }else{
            setCanSubmit(true);
        }
    });

    const inputCheck=(text)=>{
        setMainText(text);
    };

    const onSubmit=(text)=>{
        const tagArray= selected.map((d)=>d.id);
        let timeS=getTimeStampNow();
        if (hasTime) timeS=registTime;
        console.log(timeS,hasTime);
        let follow=-1;
        if(checkHasContent(props.reply_source)){

            dispatch(setReplyData(tagArray.join(','),text,timeS,props.reply_source ));
        }else{
            if (checkHasContent(props.follow_data)) follow=props.follow_data.id;

            dispatch(pushNewMemo(tagArray.join(','),text,timeS,follow ));    
        }

        //画面けし処理も追加する
        closeAction();

    };

    const onClose=()=>{
        closeAction();
    };

    const setRegistTimeManual=(str)=>{
        console.log("time change"+str);
        setRegistTime(str);
    }

    const closeAction=()=>{
        setSelected([]);
        setRegistTime("");
        setHasTime(false);
        setCanSubmit(false);
        setMainText("");
        props.onClose();

        if(checkHasContent( props.follow_data )) dispatch({type:DELETE_NEWFOLLOW_MODAL});
        if(checkHasContent(props.reply_source)) dispatch({type:DELETE_NEW_REPLY_MODAL});
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
                { checkHasContent( props.reply_source ) && 
                    <div>
                        <SummaryMemo data={props.reply_source}/>
                        <div>下矢印</div>

                    </div>
                }
                

                <TagInputList setSelected={setSelected} end={end} />
                { checkHasContent( props.follow_data ) && 
                    <div>
                    <div>転送</div>
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