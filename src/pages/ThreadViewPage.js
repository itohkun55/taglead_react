import React, {useState,useEffect} from 'react';
import {connect,useSelector,useDispatch}  from 'react-redux';
import MainHeader from "../components/MainHeader";
import MemoList from "../components/MemoList";
import MemoInsertButton from "../components/MemoInsertButton";
import {TestMemoList} from '../test/TestMemoList';
import MemoMakeModal from '../components/MemoMakeModal';
import PasswordModal from '../components/PasswordModal';
import LogOutModal from '../components/LogOutModal';
import  {LOAD_NEW_MEMO} from '../lib/ActionTypeString';

import  {auth_login_success} from '../actions';

//テスト表示用


//メインページの画面メイン
const ThreadViewPage=(props)=>{

    const dispatch=useDispatch();
    const [logout,setLogOut]=useState(false)


    /*
    スレッドが発生したらスレッドの最初のコメントの番号をスレッドに参加するすべてのコメントのスレッドIDとし、
    スレッドに参加するコメントは一回に取り出してメモリ上におけるようにする。
    スレッド表示の際のDBの検索は一度で終了し、
    
    すべてのスレッドのコメントは親のコメントのIDを自身のパラメータとして持っている。
    さかのぼりは再帰的に親を取り出すことで



    */
    
    //スレッド表示の画面


    //背景となるコメント　　キーコメントを返信とするコメント　上に出す

    //スレッドになるとベースになるコメント　→　メインページでクリックされた時の軸となるコメント
    //　これが定位置に表示されるようにする　　

    //　コメントの返信となるコメント
    const openLogOut=(props)=>{
        setLogOut(!logout);

    }
    
    useEffect(() => {
        
        dispatch(auth_login_success());
        

    }, [])


    return (
        <div>
            <MainHeader openLogout={openLogOut}/>
            {/* テストデータがないと表示できない */}
            <MemoList  />
            <MemoInsertButton/>
            
            <MemoMakeModal />

            <PasswordModal />
            
            <LogOutModal open={logout} onClose={openLogOut} />

        </div>
        


    )

}

export default  MainListPage;