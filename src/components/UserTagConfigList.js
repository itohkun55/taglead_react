import react,{useState,useEffect,useRef} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {
    Button,
    FormControl,
    NativeSelect,
    FormHelperText,
    FormControlLabel,
    Checkbox,
    Tab,
    Tabs,
    TextField
    } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { TYPE_TAG_GUEST,TYPE_TAG_MENBER} from '../lib/TagTypeNames';
import { makeStyles } from '@material-ui/core/styles';
import {GetTagName} from './parts/ShowInfoSet';
import {loadUserConfig,changeUserConfig,resetUserConfig} from '../actions';




const useStyles = makeStyles((theme) => ({
    
    root: {
        //display: 'flex',
       // justifyContent: 'center',
        flexWrap: 'wrap',
        top:'200px',
        '& > *': {
          margin: theme.spacing(0.5),
        },
        padding:"0px 0px 0px"
      },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  


export const UserTagConfigColumn=(props)=>{
    //console.log(props);
    //console.log(" UserTagConfigColumn start ");
    
    const tag_list=useSelector(state=>state.auth_login.tag_list);
    const [status,setStatus]=useState(props.data.numTagStatus);
    const [isShow,setIsShow]=useState(props.data.boolIsShownInList);


    const classes=useStyles();
    const dispatch=useDispatch();

    const onChangeTabSearch=(e,id)=>{
        //変更はSnackBarのみで知らせる
        const stnow=e.target.value;

        setStatus(stnow);
        dispatch(changeUserConfig(id,stnow,isShow));


    };

    const onChangeListView=(id)=>{
        setIsShow(!isShow);        
        dispatch(changeUserConfig(id,status,!isShow));


    };

    return (
        <div  >
        <span> <GetTagName id={props.data.keyTag}/> </span>
        <span>
            <FormControl className={classes.formControl}>
                <NativeSelect
                value={status}
                onChange={(e)=>onChangeTabSearch(e,props.data.keyTag)}
                name="status"
                className={classes.selectEmpty}
                inputProps={{ 'aria-label': 'age' }}
                >
                    <option　defaultChecked value="1">メインリスト</option>
                    <option value="2">サブリスト</option>
                    <option value="-1">検索のみ</option>
                </NativeSelect>
            </FormControl>

        </span>
        <span>
          <FormControlLabel
                control={
                <Checkbox
                    checked={isShow}
                    onChange={(e)=>onChangeListView(props.data.keyTag)}
                    //name="checkedB"
                    color="primary"
                />
                }
                label="一覧表示"
            />
          </span>
        </div>
    )

}

const UserTagConfigList=()=>{
    

    const uConfigList=useSelector(state=>state.auth_login.user_config,[]);
    
    const dispatch=useDispatch();
    
    const classes=useStyles();

    useEffect(() => {
        dispatch(loadUserConfig());
    }, []);

    useEffect(() => {
        //console.log("get config change");
    }, [uConfigList]);

    const onResetClick=()=>{
        dispatch(resetUserConfig()); 
    }


    return (

        <div className={classes.root}>
            <div>
                <Button 
                    variant='contained'
                    color="primary"
                    onClick={onResetClick} 
                    >全タグリセット</Button>
            </div>

        {uConfigList.length>0 &&
            uConfigList.map((d)=>{
                return ( <UserTagConfigColumn
                    data={d}/>
                )

            })
        }

        </div>

    )


}
export default UserTagConfigList;
