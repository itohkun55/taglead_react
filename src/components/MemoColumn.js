//各メモの表示を行う


//初期状態メモヘッダーのみ表示

//ヘッダーから開閉イベントを受けたら詳細をアニメーションで展開する

import React ,{useState,useRef} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


import {IconButton,Box, Button}  from '@material-ui/core';
import {Menu,MenuItem} from '@material-ui/core';

import {DoubleArrowOutlined} from '@material-ui/icons';
import ReplyTwoToneIcon from '@material-ui/icons/ReplyTwoTone';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import CheckBoxTwoToneIcon from '@material-ui/icons/CheckBoxTwoTone';
import CheckBoxOutlineBlankTwoToneIcon from '@material-ui/icons/CheckBoxOutlineBlankTwoTone';
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';
import StarBorderTwoToneIcon from  '@material-ui/icons/StarBorderTwoTone';
import { Typography } from '@material-ui/core';
import TagFaces from '@material-ui/icons/TagFaces';

import  {getDateMessage} from  '../lib/UtilityLibrary';
import {TagChipList} from './parts/TagChip';
import {MAKE_NEWFOLLOW_MODAL,MAKE_NEW_REPLY_MODAL} from '../lib/ActionTypeString';
import {hasreadCheck,hasfavCheck,editMemo, deleteMemo} from '../actions';

const useStyles = makeStyles((theme) => ({



    memo:{            
        width: '90%',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1,2),
        borderTop: '2px solid #ccc',
        fontSize:'15px'
      },
      ulbutton:{
        display:"flex",
        listStyle:"none",
        align:"flex-end",  
    },
    
    topset:{
        display:"flex",
        justifyContent:"space-between"

    },
    menuButton:{
        spacing:'10px',
    },
    toName:{
        textAlign:"right",
    },
    todatePublish:{
        textAlign:"right",
    },
    toFooter:{
        margin:"0 0 0 auto"
    },

    icons:{
        justifyContent: "flex-end",
    },

    headertext:{
        justifyContent: "flex-start",  
    },

    libutton:{
        margin:10
    },

    followarea:{
        marginLeft:"20%",
        border:'2px solid #888',
        width:"80%",
        fontSize:"12px"
    },

    editable:{
        border:"2px solid",
        borderColor:"#ffd700",
        borderRadius:"10px",
       
        focus:{
            outline:"none"
        }
    },
    deleted:{
        textAlign:"center",
        verticalAlign:"middle",
        display:"table-cell",
        height:"50px",
        borderRadius:"5px",
        backgroundColor:"#ddd",
        color:"#888",
        fontStyle:"italic"

    }

  }));



const MemoColumn=({data,read,fav})=>{
    //console.log(props);
    const TEXT_LIMIT=40;
    const [anchorEl,setAnchorEl]=useState(null);
    const menuOpen=Boolean(anchorEl);

    const [editable,setEditable]=useState(false);
    const [bdelete,setDelete]=useState(false);
    const [editText,setEditText]=useState(data.strMainText);
    //const editform=useRef(data.strMainText.replace(/\n/g,'<br>'));
    
    const userId = useSelector(state => state.auth_login.userId,-1);
    const user_list = useSelector(state => state.auth_login.user_list,[]);

    const [expanded ,setExpanded]=useState(false);
    const [isFav, setFavorite] = useState(fav.includes(data.id));
    const [hasRead, setRead] = useState(read.includes(data.id));
    
    const history=useHistory();
    const classes=useStyles();
    const dispatch= useDispatch();

    const onFavClick=()=>{
        setFavorite(!isFav);
        dispatch(hasfavCheck(data.id,!isFav));
    };

    const onReadClick=()=>{
        setRead(!hasRead);
        dispatch(hasreadCheck(data.id,!hasRead));
    };

     const getNames=(arr)=>{
         //console.log("arr:", arr);
         const ars=String(arr).split(",");
         const names=ars.map((d)=>{
             if( String(userId) ===d ) return "自分";

            const tg=user_list.find((el)=>el.id===parseInt(d));
            //console.log("tg",tg);
            if (typeof(tg)=="undefined") return "不明";
            return tg.strName;
         });
         
         return names.reduce((acc,value)=>acc+","+value);
     };


     const MainText=()=>{
        const txtSource=data.strMainText;

        if (txtSource.length<TEXT_LIMIT) return (
            <div style={{whiteSpace: 'pre-line'}}>
               <Typography variant='body1' >{txtSource}</Typography>
            </div>); 

        return (
            <div>
            {expanded?
                <div>
                    <span style={{whiteSpace: 'pre-line'}} ><Typography variant='body1' >{txtSource}</Typography></span>
                    <span onClick={()=>setExpanded(false)} ><Typography variant='body1' ><b>元に戻す</b></Typography></span>
                </div>
            :
            <div>
                <span style={{whiteSpace: 'pre-line'}}><Typography variant='body1' >{txtSource.substring(0,TEXT_LIMIT)}....</Typography></span>
                <span onClick={()=>setExpanded(true)} ><Typography variant='body1' ><b>残りを開く</b></Typography></span>
            </div>
            }
            </div>
        )
    };

     const MemoManipulate=()=>{
         const openFunc=()=>{
            setEditable(true);
            setAnchorEl(null);
         }
    
        const menuClick=(e)=>{
            setAnchorEl(e.currentTarget);            
        };

        const menuClose=()=>{
            setAnchorEl(null);
        }
        const startDelete=()=>{
            setDelete(true);
            setAnchorEl(null);
        }

         return(
             <span>
            <IconButton edge="start" color="inherit" onClick={menuClick} ><TagFaces/></IconButton>
            <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={menuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            >
                <MenuItem onClick={()=>openFunc(data.strMainText)}>メモを修正</MenuItem>
                <MenuItem onClick={startDelete}>メモを削除</MenuItem>
            </Menu>
          </span>
         )
     }

    const EditableColumn=(str)=>{
        
        const checkEditable=(str)=>{
            setEditText(str);
        }
        const cancelEditable=()=>{
            setEditable(false);
        }

        const onEditEnd=()=>{
        
            const sendTxt=editText.replace(/<br>/g,'\n');
            dispatch(editMemo(data.id,sendTxt));
            setEditable(false);    
        }
    
        return(
            <Box >
                <div>
                <div><Typography variant='h6' >編集</Typography></div>
                <div className={classes.editable}>
                 <span  contentEditable dangerouslySetInnerHTML={{__html:data.strMainText.replace(/\n/g,'<br>')}} onInput={(e)=>checkEditable(e.target.innerHTML)} />
                 </div>
                </div>
                <div className={classes.toFooter}>
                    <span><Button color="primary" variant="contained" onClick={()=>onEditEnd()} ><Typography variant='button' >投稿</Typography></Button> </span>
                    <span><Button color="default" variant="contained" onClick={()=>cancelEditable()} ><Typography variant='button' >キャンセル</Typography></Button> </span>
                </div>
            
            </Box>
        )
     };



    const DeleteColumn=()=>{
        
        const cancelDelete=()=>{
            setDelete(false);
   
        }
        const onDeleteEnd=()=>{
            dispatch(deleteMemo(data.id));    
        }
    
        return(
            <Box >
                <div><Typography variant='h6' >このメモを削除する</Typography></div>
                <div className={classes.toFooter}>
                    <span><Button color="primary" variant="contained" onClick={()=>onDeleteEnd()} ><Typography variant='button' >削除</Typography></Button> </span>
                    <span><Button color="default" variant="contained" onClick={()=>cancelDelete()} ><Typography variant='button' >キャンセル</Typography></Button> </span>
                </div>
            
            </Box>
        )
     };



    return (
        <div>

                <Box className={classes.memo}>
                    <div className={classes.topset} >
                        <span className={classes.headertext}>
                        <div><Typography variant='h6' >{getDateMessage(data.dateRegist) }</Typography></div>
                        <div><Typography variant='subtitle2' >{getNames(data.keySender)}より </Typography></div> 
                        </span>
                        <span className={classes.ulbutton}>
                            <span className={classes.ulbutton}>
                                <IconButton onClick={!hasRead ?  onReadClick : ()=>{} }>
                                    {hasRead ? (<CheckBoxTwoToneIcon/>  ):( <CheckBoxOutlineBlankTwoToneIcon/>)}
                                </IconButton>
                            </ span>
                        
                            <span className={classes.icons} >
                                <IconButton onClick={onFavClick} >
                                    {isFav ? ( <StarTwoToneIcon/> ):( <StarBorderTwoToneIcon/> )}
                                </IconButton>
                            
                            </span>

                            {userId===data.keySender & !data.boolHasDeleted ?
                                <span className={classes.icons} >
                                    {MemoManipulate()}
                                </span>
                                :
                                <span/>
                            }
                        </span>
                    </div>
                          
                    {!editable ?
                        <div>
                            <div><span > <TagChipList listStr={data.strTaglist} /></span></div>
                            { data.boolHasDeleted ?
                                <div className={classes.deleted}><Typography variant='h6' >このメモは削除されました</Typography></div>
                              :
                                MainText()
                              
                            } 

                        </div>
                    :
                        EditableColumn(editText)
                    }

                    { data.keyFollowId &&
                        <div className={classes.followarea}>
                        < div><div>{getDateMessage(data.keyFollowId.dateRegist) }</div><div> <TagChipList listStr={data.keyFollowId.strTaglist} /> </div> <div>{data.keyFollowId.strMainText}</div></div>
                        </div>
                    }
                    {bdelete ?
                        DeleteColumn()
                    :
                        <div className={classes.ulbutton} >
                            <span><IconButton edge="start" color="inherit"  className={classes.menuButton} onClick={()=>dispatch({type:MAKE_NEW_REPLY_MODAL,reply_source:data})} ><ReplyTwoToneIcon size="small"/></IconButton></span>
                            <span><IconButton edge="start" ize="small" color="inherit" onClick={()=>dispatch({type:MAKE_NEWFOLLOW_MODAL,follow_data:data})} ><AddCircleOutlineTwoToneIcon size="small"/></IconButton></span>
                            {data.keyReplyBase &&
                                <span><Button edge="start" ize="small" color="inherit" onClick={()=>history.push("/reply/"+data.id)}   endIcon={<DoubleArrowOutlined />}> 応答を開く </Button></span>
                            }

                            {data.boolHasModified &&
                                <span> 修正あり </span>
                            }
                            <span className={classes.toFooter}>
                                <div className={classes.todatePublish}> { getDateMessage(data.datePublish) }</div>
                                {  data.listReceiver & data.listReceiver!=="" ?
                                    <div className={classes.toName} >宛先:{getNames(data.listReceiver)}</div>
                                    :
                                    <div/>
                                }
                            </span>
                        </div>
                    }
                </Box>
        </div>
    )

}

export default MemoColumn;