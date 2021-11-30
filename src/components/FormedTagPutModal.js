import react,{useState,useEffect,useRef} from 'react';
import { useDispatch,useSelector } from 'react-redux';

import Chip from '@material-ui/core/Chip';
import {Button, Card,TextField, Typography} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import {pushNewFormedMemo} from '../actions';

import {TAG_DATE_INPUT,
        TAG_NUMBER_INPUT, 
        TAG_TEXT_INPUT,
        TAG_TIME_INPUT,
        TAG_MULTILINE_INPUT
    } from  '../lib/TagTypeNames';

const useStyles=makeStyles((theme)=>({

    root: {
        display: 'flex',
        justifyContent: 'left-end',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(0.5),
        },
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
      
    modal:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      
    },

    paper: {
        position: 'absolute',
        width: '80%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        borderRadius:"10px",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },

}));



const FormedTagPutModal=(props)=>{

    const classes=useStyles();
    //今まで設定したタグ

    //現在選択中のタグ
    const [selected,setSelected]=useState([]);
    //最後以外の選択中のタグ
    const [defs,setDefs]=useState([]);
    //最後のタグ
    const [lastOne,setLastOne]= useState({});

    const textRef=useRef(null);
    const textRefMain=useRef(null);
    

    const [open,setOpen] =useState(false);


    const tag_source=useSelector(state=>state.auth_login.formatted);

    const view_name=useSelector(state=>state.setview);

    //const tag_source=props.data;
    //選択候補のタグ
    const [tagArray,setTagArray]=useState([]);
    const dispatch = useDispatch();

    
    // useEffect(()=>{
    //     console.log("タグ獲得開始");
    //     dispatch(tag_start());
    // },[]);

    
    useEffect(()=>{
    //    setOpen(props.open);
        //console.log("タグ整理開始",tag_source);
        searchTagArray();
    },[selected,tag_source]);

    
    //モダルを閉じるとき　全てのリストを整理してから自分を閉じる
    const onClose=()=>{
        setSelected([]);
        setDefs([]);
        setLastOne({});
        setOpen(false);
        props.onClose();
    };


    //Setを利用した積集合作成関数
    const  intersection = (setA, setB)=> {
        let _intersection = new Set();
        for (let elem of setB) {
            if (setA.has(elem)) {
                _intersection.add(elem);
            }
        }
        return _intersection;
    };


    const searchTagArray=()=>{
        if(!tag_source || tag_source.length===0) return;
        
        //現在取得しているリストをSetに変換、比較に使う
        const nowTag=new Set(selected.map((d)=>{return d.keyTagMain.id;}));

        const nowGroup=new Set(selected.map((d)=>{return d.strGroup;}));

        const newTagArray=[];
        let phaseNow=selected.reduce((acc,value)=>(acc<value.numTagPhase ? value.numTagPhase : acc),0);

        const showArray=(str)=>{
            const s=str.split(",")
            if (s==[]) return [];
            return s.map((d)=>parseInt(d));
        }
  
        tag_source.forEach(element => {
            //要素のdelに現在
            let showFlg=false;
            //新規タグの表示条件に選択中のタグが入っていたら表示候補にする
            const hasEl=new Set(showArray(element.strShow));
            if(intersection(hasEl,nowTag).size>0)  showFlg=true;

            //自分自身がすでに選択されていたら候補に入れない
            if(nowTag.has(element.id))  showFlg=false;  
            //すでにグループの項目が設定されていたら候補に入れない
            if(element.strGroup && nowGroup.has(element.strGroup)){
                showFlg=false;
            }               

            //表示条件に該当したら選択候補に追加する
            if(showFlg) newTagArray.push(element);
        
        });

        //選択候補があったらそのまま選択候補を表示に回す
        if(newTagArray.length>0){
            setTagArray(newTagArray);
            return;    
        }
        
        //選択肢がなかった場合、一度Phaseを上げて再度探してみる
        phaseNow+=1;
        //この際はフェーズが合えば非表示でなければすべて表示する
        tag_source.forEach(element => {
            if(element.numTagPhase===phaseNow){
                const delEl=new Set(element.del);    
                if(intersection(delEl,nowTag).size===0) newTagArray.push(element);
            }

        });
        setTagArray(newTagArray);
    };

    //selectedの新規内容をstateの書く場所に設置する
    const putSelectedInPlace=(data)=>{
        const ss=Object.assign([],data);
        setSelected(data);
        if (data.length==0){
            setDefs([]);
            setLastOne({});
            return;
        }
        const la=ss.pop();
        setDefs(ss);
        setLastOne(la);

    };


    const onClick=(data)=>{
        let nowselected=[...selected,data];
        putSelectedInPlace(nowselected);
    };

    const onDelete=()=>{
        let nowselected=Object.assign([],selected);
        const ts=nowselected.pop();
        putSelectedInPlace(nowselected);
    };

    const onDecide=(data,txt)=>{
        let copy=Object.assign({},data);
        console.log("copy",copy);
        copy.keyTagMain.strTagName=copy.keyTagMain.strTagName+":"+txt;
        let nowselected=[...selected,copy];
        putSelectedInPlace(nowselected);
    };

    const sendAction=(text)=>{
        const restagarray=selected.map((d)=>{
            if (d.keyTagMain.strTagName.includes(":")){
                const st=d.keyTagMain.strTagName.replace(/.+\:/, ":");
                return d.keyTagMain.id+st; 
            }else{
                return d.keyTagMain.id;
            }
        });

        //console.log("restagarray",restagarray);
        dispatch(pushNewFormedMemo(restagarray.join(","),text));
    }

    const closeAction=()=>{
        setSelected([]);
        setDefs([]);
        setLastOne({});
    }

    const onEnd=(text)=>{
        //console.log(" ここで終わり　処理をDispatchする ");
        sendAction(text);
        closeAction();
        
        props.onClose();
    };
    
    const onContinue=(text)=>{
        sendAction(text);
        closeAction();    };

    const handleClose=()=>{
        //setOpen(false);
        closeAction();
        props.onClose();
    }


    const TagButton=(data)=>{
       return (
            <Chip    
                variant={selected.some((el)=>el===data) ? 'outlined': 'default' }
                color={ secondarySet.includes(data.keyTagMain.numTagType) ? "secondary" : 　primarySet.includes(data.keyTagMain.numTagType) ? "primary" : "default"}
                        
                label={data.keyTagMain.strTagName}
                clickable
                onClick={(e)=>onClick(data)}
            />

       )
    };

    //複数行入力のテキストボックスが分岐で作成できなかったので別関数にする
    const multilineText=(data)=>{
        return (
            <div>
                <TextField
                    //id="standard-number"
                    label={data.name}
                    inputRef={textRef}
                    className={classes.textField}
                    type={"text"}
                    multiline
                    rows= {4} 
                    InputLabelProps={{
                        shrink: true, }}
                    defaultValue={""}
                    //onChange={(e)=>onInput(e)}
                />
                <Button size={"small"} variant='contained' color="primary" onClick={()=>onDecide(data, textRef.current.value)}>次へ</Button>
            </div>
        )
    }

    const CheckSpecialTag=(data)=>{
        let inputType="none";
        let defaultValue="none";
        console.log("CheckSpecialTag",data);
        
        const date=new Date();
        switch (data.keyTagMain.numTagType){
            case TAG_NUMBER_INPUT:
                inputType="number";
                defaultValue=0;
                break;
            case TAG_TEXT_INPUT:
                inputType="text";
                defaultValue="";
                break;
        
            case TAG_MULTILINE_INPUT:
                return multilineText(data);

            case TAG_DATE_INPUT:
                inputType="date";
                defaultValue=date.getFullYear()+"-"+("0"+(date.getMonth()+1)).slice(-2)+"-"+("0"+date.getDate()).slice(-2);
                break;

            case TAG_TIME_INPUT:
                
                inputType="time";
                defaultValue=("0"+(date.getHours())).slice(-2)+":"+("0"+date.getMinutes()).slice(-2);
                break;
            default :
                return (
                    TagButton(data)
                );
        }


        //MULTILINE以外は納めることが出来るのでまとめておく
        return (
            <div>
                <TextField
                    //id="standard-number"
                    label={data.name}
                    inputRef={textRef}
                    className={classes.textField}

                    type={inputType}
                    InputLabelProps={{
                        shrink: true, }}
                    defaultValue={defaultValue}
                    //onChange={(e)=>onInput(e)}
                />
                <Button size={"small"} variant='contained' color="primary" onClick={()=>onDecide(data, textRef.current.value)}>次へ</Button>
            </div>
        )
    }

    
    const secondarySet=[1]
    const primarySet=[2,3,4,11]

    return (
        <Modal

            className={classes.modal}
            open={props.open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            closeAfterTransition
        >
            <div className={classes.paper}>
            
            <div className={classes.root}>
                <div><Typography variant='h6' >簡単情報入力フォーム</Typography> </div>
                <hr/>
                <div>
                {defs.length>0 ?
                    defs.map((d)=>{
                        
                    //console.log(d);
                        return (
                            <Chip    
                                variant='default' 
                                color={ secondarySet.includes(d.keyTagMain.numTagType) ? "secondary" : 　primarySet.includes(　d.keyTagMain.numTagType) ? "primary" : "default" }
                                label={d.keyTagMain.strTagName}
                            />
                        )
                    })
                    :
                    <div/>
                }
                </div>
                { Object.keys(lastOne).length>0 ?    
                    <Chip    
                        variant='outlined'
                        color={ secondarySet.includes(lastOne.keyTagMain.numTagType) ? "secondary" : 　primarySet.includes(　lastOne.keyTagMain.numTagType) ? "primary" : "default"}
                        label={lastOne.keyTagMain.strTagName}
                        clickable
                        onClick={(e)=>onDelete(lastOne)}
                    />
                    :
                    
                    <div>登録内容を選択してください</div>

                }
            </div>
            <hr/>

            <div className={classes.root}>

            {
            tagArray.length===1 ?
                
                CheckSpecialTag(tagArray[0])
            :tagArray.length>0 ?
                tagArray.map((d)=>{
                    return (
                        TagButton(d)    
                    )
                })
            :
                // 次への選択肢が一切なくなったら
                <div>
                    <div>
                        {/* 最後に文章を書けるようにしておく */}
                        <TextField
                        //id="standard-number"
                        inputRef={textRefMain}
                        className={classes.textField}

                        label="補足"
                        placeholder="特に書くことがなければ登録ボタンを押してください"
                        InputLabelProps={{
                            shrink: true, }}
                        //onChange={(e)=>onInput(e)}
                    />
                    </div>
                    <div>


                        <Button size={"small"} variant='contained' color="primary" onClick={()=>onEnd(textRefMain.current.value)}>登録</Button>
                        <Button size={"small"} variant='contained' color="secondary" onClick={()=>onContinue()}>さらに登録</Button>
                    </div>
                </div>
            }
            </div>
        </div>

        </Modal>
    )
};

export default FormedTagPutModal;