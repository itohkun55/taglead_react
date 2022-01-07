import react,{useState,useEffect,useRef} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {
    Collapse,
    Button,
    FormControl,
    NativeSelect,
    RadioGroup,
    Radio,
    FormControlLabel,
    TextField
    } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { TAG_TYPES,TAG_RANKS} from '../lib/TagTypeNames';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {GetTagName} from './parts/ShowInfoSet';
import { showTagAdmin, makeNewTagByAdmin, modifyTagByAdmin} from '../actions';




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
  

const tagRanks={
    1000:"最重要",
    100:"重要",
    10:"通常",
    1:"表示用(現在利用せず）"
};




export const UserTagAdminColumn=(props)=>{
    const [viewmode,setViewMode]=useState(true);
    
    const all_tag=useSelector(state=>state.auth_login.all_tag,[]);
    const changFlg=useSelector(state=>state.tag_admin.change,0);
    const [tagName,setTagName]=useState("");
    const [tagRank,setTagRank]=useState(-1);
    const [tagType,setTagType]=useState(-1);
    const [errorMsg,setErrorMsg]=useState("");


    const classes=useStyles();
    const dispatch=useDispatch();


    const onSelect=()=>{
        props.onSelect(props.data.id);
        
    };

    const onColumnCancel=()=>{
        //console.log("onCancel Done",props.data.id);
        //setViewMode(true);
        props.onCancel();
    };

    useEffect(() => {
        setTagName(props.data.strTagName);
        setTagRank(props.data.numTagRank);
        setTagType(props.data.numTagType);

    }, [props.data]);

    
    const rank=(tr)=>(TAG_RANKS.find(el=>el.id==tr));
    const type=(tt)=>(TAG_TYPES.find(el=>el.id==tt));

    const modeView=()=>{
        return (
            <TableRow component="th" scope="row">
                <TableCell>{props.data.strTagName}</TableCell>
                <TableCell align='right'>{rank(tagRank).name}</TableCell>
                <TableCell align='right'>{type(tagType).name}</TableCell>

                <TableCell align='right'>
                    <Button onClick={()=>onSelect()}
                        variant='contained'
                        label="登録">編集
                    </Button>
                 </TableCell>
            </TableRow>
        )
    };

    const onSubmit=()=>{

        if (tagName==""){
            setErrorMsg("タグ名がありません");
            return;
        }

        if (tagRank==-1 || tagRank==0){
            setErrorMsg("タグの重要度が未設定です"+ String(tagRank));
            return;
        }

        if (tagType==-1 || tagType==0){
            setErrorMsg("タグの種類が未設定です"+ String(tagType) );
            return;
        }

        if(all_tag.some(data=>data.strTagName===tagName)){
            setErrorMsg("既に存在するタグです" );
            return;
        }

        let dispatcher=modifyTagByAdmin;
        if (props.data.id==-1){
            dispatcher=makeNewTagByAdmin;
        }

        dispatch(dispatcher(
            props.data.id,
            tagName,
            tagRank,
            tagType
        ));
        setErrorMsg("");
    }

    const modeEdit=()=>{
        return(
            
            <TableRow component="th" scope="row">
                <TableCell>
                    {errorMsg!="" ?
                        <div>{errorMsg}</div>
                    :
                        null
                    }
                    <TextField 
                        //label="タグ名"
                        placeholder="タグの名称を入力"
                        onChange={(e)=>setTagName(e.target.value)}
                        defaultValue={tagName}
                        //value={props.data.strTagName}
                        variant="outlined"
                        disabled={false}
                        />
                </TableCell>
                <TableCell>
                    <FormControl className={classes.formControl}>
                        <NativeSelect
                        //value={props.data.numTagRank}
                        defaultValue={tagRank}
                        onChange={(e)=>setTagRank(e.target.value)}
                        name="tagrank"
                        className={classes.selectEmpty}
                        inputProps={{ 'aria-label': 'age' }}
                        >
                            {TAG_RANKS.map((d)=>{
                                    return (<option value={d.id}>{d.name}</option>)
                                })
                            }
                        </NativeSelect>
                    </FormControl>
                </TableCell>
                <TableCell>
                    <FormControl className={classes.formControl}>
                        <NativeSelect
                        //value={props.data.numTagType}
                        onChange={(e)=>setTagType(e.target.value)}
                        defaultValue={tagType}
                        name="status"
                        className={classes.selectEmpty}
                        inputProps={{ 'aria-label': 'age' }}
                        >
                             {TAG_TYPES.map((d)=>{
                                    return (<option value={d.id}>{d.name}</option>)
                                })
                            }
                            
                        </NativeSelect>
                    </FormControl>
                </TableCell>
                
                <TableCell>
                    <Button onClick={onSubmit}
                    variant='contained'
                    label="登録"
                    >登録</Button>

                    <Button onClick={onColumnCancel}
                    variant='contained'
                    label="キャンセル"
                    >キャンセル</Button>
                </TableCell>
            </TableRow>
        )
    }

    return (
         tagType==-1 ?
            <div/>
        :props.add ?
            modeEdit()
        :props.open ?
            modeEdit()
        :
            modeView()
    )

}


const UserTagAdminList=()=>{
    //const [funcCancel,setFuncCancel]=useState(null)
    
    const classes=useStyles();
    const tag_list=useSelector(state=>state.tag_admin.tag_list,[]);
    const changFlg=useSelector(state=>state.tag_admin.change,0);
    const [openid,setOpenId]=useState(-1);
    const [add,setAdd]=useState(false);

    const changeViewList=(id=4)=>{
        return tag_list.filter(data=>data.numTagType==id)
    };
    const [viewtype,setViewType]=useState(4)

    const [showArray,setShowArray]=useState(changeViewList());


    //const uConfigList=useSelector(state=>state.admin.tag_list,[]);
    
    const dispatch=useDispatch();
    

    useEffect(() => {
        dispatch(showTagAdmin());
        setOpenId(-1);
    }, [changFlg]);

    const onColumnSelect=(id)=>{
        setAdd(false)
        setOpenId(id);
    };

    const onCancel=()=>{
        setOpenId(-1);
    }

    useEffect(() => {
        //console.log(showArray);
        setShowArray(changeViewList(viewtype));
        setAdd(false);
        
    }, [viewtype,tag_list]);

    const onAddClick=()=>{
        setAdd(true);
        setOpenId(-1);
    }



    return (

        <div className={classes.root}>
            <div>
                <Button
                    label="タグ追加"
                    onClick={()=>onAddClick()}
                    variant="contained"
                    color="primary"
                    disabled={add}
                >タグ追加</Button>
            </div>
            <div>
                <FormControl component="fieldset">
                <RadioGroup
                    row
                    defaultValue={viewtype}
                    >
                    {TAG_TYPES.map((d)=>{
                        return (<FormControlLabel 
                            value={d.id}
                            checked={d.id==viewtype}
                            onChange={()=>setViewType(d.id)} 
                            control={<Radio />} 
                            label={d.name} 
                            />)
                        })
                    }                    
                </RadioGroup>
                </FormControl>
            </div>
            <hr/>
            { add ?
                <UserTagAdminColumn add={true} open={true} onCancel={()=>setAdd(false)} onSelect={onColumnSelect}  
                data={{ id:-1,strTagName:"",numTagRank:0,numTagType:viewtype }}/>
                :
                <div/>
            }
        
        <TableContainer>
            <Table >
                <TableHead>
                <TableRow>
                    <TableCell>タグ名</TableCell>
                    <TableCell align="right">重要度</TableCell>
                    <TableCell align="right">種類</TableCell>
                    <TableCell align="right">---</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {showArray.map((d) => (
                    <UserTagAdminColumn add={false} open={d.id==openid} onCancel={onCancel} onSelect={onColumnSelect}  data={d}/>
                ))}
                </TableBody>
            </Table>
        </TableContainer>

        </div>

    )


}
export default UserTagAdminList;
