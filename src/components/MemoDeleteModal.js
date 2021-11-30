import React from 'react';
import {connect}  from 'react-redux';
import Box from '@material-ui/core/Box';
import {Modal,Button,Fade} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FullscreenExit } from '@material-ui/icons';
import {PUSH_NEW_MEMO} from '../lib/ActionTypeString';

import PropTypes from 'prop-types';


//メモを削除する時のモーダル

/*
    要素
    ・キャンセルボタン
    ・文章
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
        align:"flex-end",
        
    },
    libutton:{
        margin:10
    },


  }));


const MemoDeleteModal=(props)=>{
    const classes=useStyles();
    const [memo,writememo]=React.useState("");
    
    const memoDelete=()=>{
        props.mapStateToAction(memo);
        props.onClose();
    };

    const handleClose=()=>{
       props.onClose();
    };

    return(
        <div>
            <Modal
                    
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.open }
                className={classes.modal}
                onClose={handleClose}
                closeAfterTransition
            
            >
                <Fade in={props.open}>
                    <Box bgcolor="white"  className={classes.memo}>
                        <div>以下のメモを削除してもいいですか？</div>
                        <div> {props.checktext} </div>
                        <ul className={classes.ulbutton}>
                            <li className={classes.libutton}><Button variant="contained" onClick={memoDelete} color="primary" >削除</Button></li>
                            <li  className={classes.libutton}><Button variant="contained" onClick={handleClose} color="secondary" >キャンセル</Button></li>
                        </ul>

                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

MemoDeleteModal.propTypes={
    open:PropTypes.bool.isRequired,
    onClose:PropTypes.func.isRequired
}
   
MemoDeleteModal.defaultProps={
    open:false,
    onClose:()=>{}
}



// 何も追加しないで送信すると所属するチームのメモを作成する

//送信ボタンをクリックすると送信される

//宛先欄を表示すると宛先一覧が表示される
    //宛先はチームとメンバーを選択できる（フォロー先選択と同じ）

//

const mapStateToAction=(memo)=>dispatch=>{

    dispatch({type:PUSH_NEW_MEMO,memo});
}

export default connect(null,{mapStateToAction})(MemoDeleteModal);

