
import  {getDateMessage,getUserName} from  '../../lib/UtilityLibrary';
import { makeStyles } from '@material-ui/core/styles';
import TagText  from './TagText'; 
import ExpandText from './ExpandText';
import {GetUserName}  from './ShowInfoSet';
import { Typography } from '@material-ui/core';
import { TEXT_LIMIT } from '../../lib/ServiceConfig';
const useStyles=makeStyles((theme)=>({

    // root: {
    //     display: 'flex',
    //    // justifyContent: 'center',
    //     flexWrap: 'wrap',
    //     '& > *': {
    //       margin: theme.spacing(0.5),
    //     },
    //     padding:"0px 0px 0px"
    //   },
    //   followarea:{
    //       marginLeft:"20%",
    //       border:'2px solid #888',
    //       width:"80%",
    //       fontSize:"12px"
    //   }

    quote: {
        position: "relative",
        padding: "30px 15px 8px 15px",
        boxSizing: "border-box",
        fontStyle: "italic",
        background: "#efefef",
        color: "#555",

        "&:before":{
            display: "inline-block",
            position: "absolute",
            top: "5px",
            left: "3px",
            content: "“",
            fontFamily: "sans-serif",
            color: "#cfcfcf",
            fontSize: "90px",
            lineHeight: 1
        },
        "&:p" :{
            padding: 0,
            margin: "10px 0",
            lineHeight: 1.7,
        },
    
        "&:cite" :{
            display: "block",
            textAlign: "right",
            color: "#888888",
            fontSize: "0.9em"
        }
    },
    backMsg :{
        textAlign:"right"
    }

}));


const SummaryMemo=(props)=>{
    const classes=useStyles();

    return (
    
        <div className={classes.quote}>
            < div><span>{getDateMessage(props.data.dateRegist) }</span><span> <TagText tagtextarray={props.data.strTaglist}/> </span></div>
             <div><ExpandText txtSource={props.data.strMainText} limit={TEXT_LIMIT} /></div>
             <div className={classes.backMsg}><div  > <Typography variant="caption" > { getDateMessage(props.data.datePublish) }</Typography></div> <div><GetUserName  suffix={"より"}  id={props.data.keySender}/></div></div>
            
        </div>
        
    )

};

export default SummaryMemo;