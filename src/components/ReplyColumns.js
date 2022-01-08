//各メモの表示を行う


//初期状態メモヘッダーのみ表示

//ヘッダーから開閉イベントを受けたら詳細をアニメーションで展開する

import React ,{useEffect, useState} from 'react';
import  {useSelector} from 'react-redux';
import {Collapse,IconButton,Box}  from '@material-ui/core';

import ExpandMoreIcon  from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CheckBoxOutlineBlankTwoToneIcon from '@material-ui/icons/CheckBoxOutlineBlankTwoTone';
import CheckBoxTwoToneIcon from '@material-ui/icons/CheckBoxTwoTone';


import ReplyTwoToneIcon from '@material-ui/icons/ReplyTwoTone';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import  {getDateMessage,getUserName} from  '../lib/UtilityLibrary';

//重要
import StarBorderTwoToneIcon from '@material-ui/icons/StarBorderTwoTone';
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';


import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({

    memo:{            
        width: '90%',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1, 2, 0),
        borderTop: '2px solid #ccc',
      },

      
    memoSub:{            
        width: '80%',
        right:'20px',
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(1, 2, 0),
        borderTop: '2px solid #ccc',
      },

      
    memoChild:{            
        width: '85%',
        right:'20px',
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(1, 2, 0),
        borderTop: '2px solid #ccc',
      },

    memoParent:{            
        width: '85%',
        //right:'20px',
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(1, 2, 0),
        border: '1px solid #555555',
      },

      ulbutton:{
        display:"flex",
        listStyle:"none",
        align:"flex-end",  
    },
    menuButton:{
        spacing:'10px',
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

    textarea:{
       // width:"100%",
       // height:100
    }

  }));



const ReplyColumn=({data,boxstyle,mark})=>{
    const TEXT_LIMIT=40;
    const dd=data;
    
    const setHeaderText=(txt)=>{
        //if (typeof txt ==="undefined") console.log("txt undefined ");
        return txt.substring(0,TEXT_LIMIT)+"....";
    };
    const classes=useStyles();
    //const [maintext,setMainText] =useState(setHeaderText(dd.strMainText));
    const [maintext,setMainText] =useState(dd.strMainText);

    const user_list = useSelector(state => state.auth_login.user_list,[]);
    const tag_list = useSelector(state => state.auth_login.all_tag,[]);
    const hasRead=useSelector(state=>state.memo_main.read);
    const favorite=useSelector(state=>state.memo_main.fav);

    const [expanded ,setExpanded]=useState(false);
    const [hasStar, setHasStar] = useState(favorite.includes(data.id));
    const [read, setRead] = useState(hasRead.includes(data.id));
    const [bstyle,setBoxStyle]=useState(classes.memo);

    const checkText=(exp)=>{
        if(exp){
            setMainText(dd.strMainText);
        }else{
            setMainText(setHeaderText(dd.strMainText) );
        }
    };

    const onExpanded=()=>{
        // if(!expanded){
        //     setMainText(dd.strMainText);
        // }else{
        //     setMainText(setHeaderText(dd.strMainText) );
        // }
        checkText(!expanded);

        setExpanded(!expanded);

    };

    const onStarClick=()=>{
        setHasStar(!hasStar);
        //後はidとstar情報をサーバーに送るアクション

    };

    const onReadClick=()=>{
        setRead(!read);
        //後はidとread情報をサーバーに送るアクション

    };

    const getNames=(arr)=>{
        const ars=String(arr).split(",");
        const names=ars.map((d)=>{
           const tg=user_list.find((el)=>el.id===parseInt(d));
           return tg.strName;
        });
        
        return names.reduce((acc,value)=>acc+","+value);
    };


    useEffect(()=>{
        //setMainText(dd.strMainText);
       // setMainText(setHeaderText(dd.strMainText) );
       checkText(expanded);
        switch(boxstyle){
            case "thread":
                 setBoxStyle(classes.memoSub);
                break;
            case "parent":

                setBoxStyle(classes.memoParent);
                break;
            
            case "child" :
                setBoxStyle(classes.memoChild);
                break;
            default:
                setBoxStyle(classes.memo);
                break;

        }

    });



    return (
        <div>

                <Box  className={bstyle}>
                    <div className={classes.ulbutton} >
                        <span className={classes.headertext}>
                        <div> { getDateMessage(data.datePublish) }</div> <div>{getNames(data.keySender)}より </div> 
                        </span>
                        <span className={classes.icons}>
                            <IconButton onClick={onStarClick}>
                                {hasStar ? (<CheckBoxTwoToneIcon/>  ):( <CheckBoxOutlineBlankTwoToneIcon/>)}
                            </IconButton>
                            
                        </ span>
                      
                        <span className={classes.icons} >
                            <IconButton onClick={onReadClick} >
                                {read ? ( <StarTwoToneIcon/> ):( <StarBorderTwoToneIcon/> )}
                            </IconButton>
                        
                        </span>

                        <div className={classes.icons} >
                                <IconButton onClick={onExpanded} >
                                    {expanded ? ( <ExpandLessIcon/> ):( <ExpandMoreIcon/> )}
                                </IconButton>    
                            </div>
                          
    
                    </div>
                          
                    <Collapse in={expanded} collapsedHeight={30}> 
                        <div onClick={onExpanded} className={classes.ulbutton}>
                            <div className={classes.textarea}>{maintext}</div>
                            
                        </div>
                        <div className={classes.ulbutton} >
                            <div>
                                <IconButton edge="start" color="inherit"  className={classes.menuButton} ><ReplyTwoToneIcon size="small"/></IconButton>
                                <IconButton edge="start" ize="small" color="inherit"  ><AddCircleOutlineTwoToneIcon size="small"/></IconButton>
                                <IconButton edge="start" size="small" color="inherit"  ><DeleteOutlinedIcon size="small"/></IconButton>
                            </div>
                        </div>
                    </Collapse>
                    
     
                </Box>
        </div>
    )

}

export default ReplyColumn;