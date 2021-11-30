//各メモの表示を行う


//初期状態メモヘッダーのみ表示

//ヘッダーから開閉イベントを受けたら詳細をアニメーションで展開する

import React ,{useState,useEffect} from 'react';
import {useSelector,useDispatch}  from 'react-redux';
import {Box,MenuItem,FormControl,FormHelperText,InputLabel, Select,TextField, Button,Paper} from '@material-ui/core';
import Popper from '@material-ui/core/Popper';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    
    box:{
        //display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      

        //position: 'flex',
            
        width: '80%',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        borderRadius:15,
        //padding: theme.spacing(2, 4, 3),
      },
      
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },


}));



const SearchForm=(props)=>{
    const classes=useStyles();
    const user_list = useSelector(state => state.auth_login.user_list);
    const unit_list = useSelector(state=>state.auth_login.unit_list);
    const [user,selectUser]=useState({});
    const [unit, selectUnit] = useState({});

    const [fromDay,setFromDay]=useState("");
    const [tillDay,setTillDay]=useState("");
    const [freeword,setFreeword]=useState("");

    useEffect(()=>{
        
       console.log(user_list);
        console.log(unit_list);
    },[user_list,unit_list]);

    return (
            <Popper open={props.open} transition={true} placement={'bottom-end'} anchorEl={props.anchor}>
            <Box className={classes.box}>
                <FormControl className={classes.formControl}>
                
                    <InputLabel >送信者・発信者</InputLabel>

                    <Select onChange={(e)=>{selectUser(e.target.value)} }>
                    {
                        user_list.map((p)=>{
                           return(<MenuItem value={p} > {p.name} </MenuItem>)         
                        })
                    }
                    </Select>
                    
                </FormControl>
                
                <FormControl className={classes.formControl}>
                    <InputLabel >所属</InputLabel>
                    
                    <Select onChange={(e)=>{selectUnit(e.target.value)} } defaultValue={{}}>

                    {
                         unit_list.map((p)=>{
                             return (<MenuItem value={p} > {p.name} </MenuItem>  )      
                        })
                    }
                    </Select>
                    
                </FormControl>
                
                <FormControl className={classes.formControl}>
                    <InputLabel >この日から</InputLabel>
                    <TextField type="date"  onChange={(e)=>{setFromDay(e.target.value)} }  />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel >この日まで</InputLabel>
                    <TextField type="date"  onChange={(e)=>{setTillDay(e.target.value)} }/>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel >検索語</InputLabel>
                    <TextField type="text"  onChange={(e)=>{setFreeword(e.target.value)} }></TextField>             
                </FormControl>
                
                
                
                <Button>検索</Button>
            </Box>

            </Popper>
    )

}

export default SearchForm;