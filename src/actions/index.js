import {
    SHOW_REPLY,
    CLOSE_MEMOMAKE,
    LOAD_NEW_MEMO,
    RESET_MEMO,
    USER_LOGIN,
    AUTH_SUCCESS,
    TAGGED_SEARCH,
    TAGGED_SEARCH_CONTINUE,
    GET_NOTICE_LIST,
    SHOW_FAVORITE,
    USER_CONFIG_LIST,
    CHANGE_USER_CONFIG,
    MEMO_INSERT_END,
    MEMO_EDIT_END_MAIN,
    MEMO_EDIT_END_TAG,
    NO_ACTION,
    MAKE_TAG_ADMIN,
    SHOW_TAG_ADMIN,
    MODIFY_TAG_ADMIN,
    SIGN_UP
}  from '../lib/ActionTypeString';

import {getTimeStampNow} from '../lib/UtilityLibrary';
import  APICallController from '../lib/ConnectionLibrary';

export const getTaggedData=(arr,fromDay,next=false)=>dispatch=>{
    let tagArray="-1";
    if (arr.length>0){
        tagArray= String(arr);
    }


    const resFunc=(res)=>{
        return { timeline:res.timeline,read:res.read,fav:res.fav,endflg:res.endflg };
    };

    let SCENE=TAGGED_SEARCH;
    if (next){
        SCENE=TAGGED_SEARCH_CONTINUE;
    } 

    APICallController.callAPI("tags",{tagArray:tagArray,fromDay:fromDay},SCENE,resFunc,dispatch);

};

export const setReplyData=(tagArray,mainText,dateRegist,data)=>dispatch=>{

    const sendParam={ 
        "memoId":data.id,
        'settags':tagArray,
        'mainText':mainText,
        'datePublish':getTimeStampNow(),
        'dateRegist':dateRegist
    };

    const resFunc=(res)=>{
        const resSet=res.resSet;
        return { timeline:resSet.timeline,read:resSet.read,fav:resSet.fav,endflg:resSet.endflg,id:res.id };
    };

    APICallController.callAPI("repinsert",sendParam,SHOW_REPLY,resFunc,dispatch);
};


export const getReplyData=(id)=>dispatch=>{

    const resFunc=(res)=>{
        return { timeline:res.timeline,read:res.read,fav:res.fav,endflg:res.endflg,id:id };
    };
    APICallController.callAPI("reply",{memoId:id},SHOW_REPLY,resFunc,dispatch);
    //dispatch({type:SHOW_REPLY, self_data,past_thread,parent_data,child_data,future_thread });
};


export const setFirstAccess=()=>dispatch=>{
    const resFunc=(res)=>{
        return { "ok":"ok" };
    };
    APICallController.callAPI("firstend",{},SIGN_UP,resFunc,dispatch);
};

//最初の認証終了時(想定）のアクション
//本来は色々引数があるはず

export const auth_login_success=props=>dispatch=>{

    const resFunc=(res)=>{
        const user_list=res.user_list;
        user_list.push({name:"未設定",id:-1});

        return { res:res};
    };
    
    APICallController.callAPI("inituser",{},AUTH_SUCCESS,resFunc,dispatch);


};


//
export const login_start=(login_id,password)=>dispatch=>{
    //実際はサーバーとの認証処理を行い再度データを取り出す

    dispatch({type:USER_LOGIN,login_id,password});
};


//メモを新規追加して送信し、その結果を戻す
export const pushNewMemo=(tagArray,mainText,dateRegist,follow=-1)=>dispatch=>{

    const resFunc=(res)=>{
        const now=new Date().getTime();
        return { change:now};
    };

    const sendParam={ 'settags':tagArray,'mainText':mainText,'datePublish':getTimeStampNow(),'dateRegist':dateRegist,'followId':follow };
    APICallController.callAPI("memoinsert",sendParam,MEMO_INSERT_END,resFunc,dispatch,"書き込み完了しました。");    

};

//メモを新規追加して送信し、その結果を戻す
export const editMemo=(id, mainText)=>dispatch=>{

    const resFunc=(res)=>{ return res;};

    let SCENE=MEMO_EDIT_END_MAIN;
    if (APICallController.getView()==="tag"){
        SCENE=MEMO_EDIT_END_TAG;
    } 
    const sendParam={ 'memoId':id,'mainText':mainText };
    APICallController.callAPI("memomodify",sendParam,SCENE,resFunc,dispatch,"修正完了しました。");    
};

export const deleteMemo=(id)=>dispatch=>{
    
    const resFunc=(res)=>{
        const now=new Date().getTime();
        return { change:now};
    };
    const sendParam={ 'memoId':id };
    //通信後の挙動は挿入と全く同じなので、MEMO_INSERT_ENDを入れておく
    APICallController.callAPI("memodelete",sendParam,MEMO_INSERT_END,resFunc,dispatch,"削除完了しました。"); 
};


export const loadUserConfig=()=>dispatch=>{
    const resFunc=(res)=>{
        return {res:res};
    };
    APICallController.callAPI("tagconfig",{},USER_CONFIG_LIST,resFunc,dispatch);    

};

export const resetUserConfig=()=>dispatch=>{
    const resFunc=(res)=>{
        return {user_config:res};
    };
    APICallController.callAPI("tagreset",{},USER_CONFIG_LIST,resFunc,dispatch,"タグがすべてリセットされました。");    

};

export const changeUserConfig=(id,tagstatus,isshow)=>dispatch=>{
    const resFunc=(res)=>{
        return {user_config:res.user_config,main_tag:res.main,sub_tag:res.sub};
    };
    const sendParam={"tagId":id,"tagstatus":tagstatus,"isshow":isshow};
    APICallController.callAPI("changeconfig",sendParam,CHANGE_USER_CONFIG,resFunc,dispatch,"タグ設定を更新しました。");
};


export const showTagAdmin=()=>dispatch=>{
    const resFunc=(res)=>{
        return {tag_list:res.tag_list};
    };
    const sendParam={};
    APICallController.callAPI("showtagadmin",sendParam,SHOW_TAG_ADMIN,resFunc,dispatch);
};

export const makeNewTagByAdmin=(id,name,rank,type)=>dispatch=>{
    const resFunc=(res)=>{
        const now=new Date().getTime();
        return { change:now};
    };
    
    const sendParam={tagId:id,tagname:name,tagrank:rank,tagtype:type};
    APICallController.callAPI("maketagadmin",sendParam,MAKE_TAG_ADMIN,resFunc,dispatch,"タグ追加完了しました。");
};


export const modifyTagByAdmin=(id,name,rank,type)=>dispatch=>{
    const resFunc=(res)=>{
        const now=new Date().getTime();
        return { change:now};
    };
    const sendParam={tagId:id,tagname:name,tagrank:rank,tagtype:type};

    //console.log("sendParams:", sendParam);
    APICallController.callAPI("modifytagadmin",sendParam,MODIFY_TAG_ADMIN,resFunc,dispatch,"タグ修正完了しました。");
};

//メモを新規追加して送信し、その結果を戻す
export const pushNewFormedMemo=(tagArray,mainText)=>dispatch=>{

    const resFunc=(res)=>{
        const now=new Date().getTime();
        return { change:now };
    };
    
    const sendParam={ 'settags':tagArray,'mainText':mainText,'datePublish':getTimeStampNow(),'dateRegist':getTimeStampNow() };
    APICallController.callAPI("formattedinsert",sendParam,MEMO_INSERT_END,resFunc,dispatch,"登録完了しました。");    

};


export const getNoticeData=()=>dispatch=>{

    const resFunc=(res)=>{
        return {notices:res.notices,count:res.count};
    };

    APICallController.callAPI("getnotice",{},GET_NOTICE_LIST,resFunc,dispatch);
};


//現在まで表示したデータの次のメモデータを取得して表示する
export const loadNewMemo=fromDay=>dispatch=>{

    const resFunc=(res)=>{
        return { timeline:res.timeline,read:res.read,fav:res.fav,endflg:res.endflg };
    };
    let RECORD_SET=LOAD_NEW_MEMO;

    if (fromDay==="-1") RECORD_SET=RESET_MEMO;

    APICallController.callAPI("main",{fromDay:fromDay},RECORD_SET,resFunc,dispatch);    
};

export const hasreadCheck=(memoId,read)=>dispatch=>{
    // const resFunc=(res)=>{
    //     return { timeline:[],read:[],fav:[] };
    // };
    
    const resFunc=(res)=>{
        return { change:0 };
    };
    APICallController.callAPI("setread",{memoId:memoId,read:read},NO_ACTION,resFunc,dispatch,"既読チェック完了");
};

export const hasfavCheck=(memoId,fav)=>dispatch=>{
    // const resFunc=(res)=>{
    //     return { timeline:[],read:[],fav:[] };

    // };
    const resFunc=(res)=>{
        return { change:0 };
    };
    APICallController.callAPI("setfav",{memoId:memoId,fav:fav},NO_ACTION,resFunc,dispatch,"お気に入り登録完了");
};

export const showFavorite=()=>dispatch =>{

    const resFunc=(res)=>{
        return { timeline:res.timeline,read:res.read,fav:res.fav,endflg:res.end };
    };

    APICallController.callAPI("favorite",{memoId:1,fav:2},SHOW_FAVORITE,resFunc,dispatch);
};

export const closeModal=props=>dispatch=>{
    dispatch({type:CLOSE_MEMOMAKE});
};
