import React,{useEffect} from 'react';
import MemoList from "../components/MemoList";
import CirculerLoading from '../components/CirculerLoading';

import {useSelector,useDispatch}  from 'react-redux';
import { loadNewMemo } from '../actions';
import APICallController from '../lib/ConnectionLibrary';


//メインページの画面メイン
const MainListPage=(props)=>{
    
    //これはここで行う
    APICallController.setView("main");

    const tag_list=useSelector(state=>state.auth_login.all_tag);
    //メモの更新が行われた後、再度一覧を取得する

    return (
            <div className="page">
                {tag_list &&
                    <MemoList/>
                }            
                <CirculerLoading isModal={false} />
            </div>
    )

}

export default  MainListPage;
