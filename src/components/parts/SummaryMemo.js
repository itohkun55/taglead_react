
import  {getDateMessage,getUserName} from  '../../lib/UtilityLibrary';
import { makeStyles } from '@material-ui/core/styles';
import TagText  from './TagText'; 
import {GetUserName}  from './ShowInfoSet';
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
      followarea:{
          marginLeft:"20%",
          border:'2px solid #888',
          width:"80%",
          fontSize:"12px"
      }

}));


const SummaryMemo=(props)=>{
    const classes=useStyles();

    return (
    
        <div className={classes.followarea}>
            <div><span > { getDateMessage(props.data.datePublish) }</span> <GetUserName  suffix={"より"}  id={props.data.keySender}/></div>
            < div><span>{getDateMessage(props.data.dateRegist) }</span><span> <TagText tagtextarray={props.data.strTaglist}/> </span> <span>{props.data.strMainText}</span></div>
        </div>
        
    )

};

export default SummaryMemo;