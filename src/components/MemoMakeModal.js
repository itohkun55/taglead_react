import React, {useState,useEffect} from 'react';
import {useDispatch,useSelector}  from 'react-redux';
import Box from '@material-ui/core/Box';
import {Modal,Button,Fade} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FullscreenExit } from '@material-ui/icons';
import {CLOSE_MEMOMAKE, PUSH_NEW_MEMO,PRIVATE,TEAM} from '../lib/ActionTypeString';
import {closeModal,pushNewMemo} from '../actions';
import PropTypes from 'prop-types';

//新規メモを作成するモーダル

/*
    要素
    ・キャンセルボタン
    ・宛先欄表示
    ・入力欄
    ・送信ボタン

*/

const useStyles = makeStyles((theme) => ({

    modal:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      
    },

    memo:{
        position: 'absolute',
            
        width: "80%",
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        borderRadius:15,
        padding: theme.spacing(2, 4, 3),
      },
    ulbutton:{
        display:"flex",
        justifyContent: "flex-end",
        listStyle:"none",
        //align:"flex-end",
        
    },
    libutton:{
        margin:5
    },

    textarea:{
        width:300,
        height:100
    }

  }));


const MemoMakeModal=(props)=>{
    const classes=useStyles();
    const [memo,writememo]=useState("");
    //const [open,setOpen]=useState("false");
    const modalopen=useSelector( state=> state.memo_main.memomake_open);
    const isPrivate = useSelector(state => state.memo_main.isPrivate);

    const showIsPrivate={ "TEAM":"共有","PRIVATE":"連絡"};
    
    const dispatch=useDispatch();
    
    const memoSet=()=>{
        dispatch(pushNewMemo(memo,isPrivate));
        //props.mapStateToAction(memo);
        //props.onClose();
    };

    const handleClose=()=>{
        dispatch({type:CLOSE_MEMOMAKE});
        //props.closeModal();
    };

    // useEffect(() => {
    //     setOpen(false);
        
    // }, [modalopen])

    return(
        <div>
            <Modal
                    
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modalopen }
                className={classes.modal}
                onClose={handleClose}
                closeAfterTransition
            
            >
                <Fade in={modalopen}>
                    <Box bgcolor="white"  className={classes.memo}>
                        <div>{showIsPrivate[isPrivate]}</div>
                        <textarea
                            value={memo}
                            onChange={(e)=>{
                                writememo(e.target.value)
                            }}  
                            className={classes.textarea}
                        />
                        <ul className={classes.ulbutton}>
                            <li className={classes.libutton}><Button variant="contained" onClick={memoSet} color="primary" >追加</Button></li>
                            <li  className={classes.libutton}><Button variant="contained" onClick={handleClose} color="secondary" >キャンセル</Button></li>
                        </ul>

                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

MemoMakeModal.propTypes={
    onClose:PropTypes.func.isRequired
}
   
MemoMakeModal.defaultProps={
    makeopen:false,
    onClose:()=>{}
}



// 何も追加しないで送信すると所属するチームのメモを作成する

//送信ボタンをクリックすると送信される

//宛先欄を表示すると宛先一覧が表示される
    //宛先はチームとメンバーを選択できる（フォロー先選択と同じ）

//

// const mapDispatchToPropsMemo=(memo)=>dispatch=>{

//     dispatch({type:PUSH_NEW_MEMO,memo});
// }


// const mapDispatchToPropsClose=(state)=>dispatch=>{

//     dispatch({type:CLOSE_MODAL});
// }
// const mapStateToProps=(state)=>{
//     return {modalopen:state.memo_main.modalopen};
// }


export default MemoMakeModal;

//export default connect(mapStateToProps,{mapDispatchToPropsMemo,closeModal})(MemoMakeModal);