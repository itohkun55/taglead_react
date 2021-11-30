import React, {useEffect} from 'react';
import {useSelector}  from 'react-redux';
import CirculerLoading from '../components/CirculerLoading';

import TagSearchList from "../components/TagSearchList";
import APICallController from '../lib/ConnectionLibrary';

//テスト表示用


//メインページの画面メイン
const TaggedSearchPage=(props)=>{

    //const tag_list=useSelector(state=>state.auth_login.all_tag,[]);
    
    useEffect(() => {        
        APICallController.setView("tag");
        
    }, []);

    return (
        <div className="page" >
            <TagSearchList />
            <CirculerLoading isModal={false} />
        </div>
    )

}

export default  TaggedSearchPage;