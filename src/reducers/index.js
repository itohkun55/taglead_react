import {combineReducers} from 'redux';
//import {reducer as formReducer} from 'redux-form';
import  {PUSH_SHOW_MEMO_BUTTON,
        CLOSE_MEMOMAKE,
        LOAD_NEW_MEMO,
        RESET_MEMO,
        MEMO_END,
        MEMO_EDIT_END_MAIN,
        MEMO_EDIT_END_TAG,
        AUTH_SUCCESS,
        MEMO_INSERT_END,
        RESET_TAG,
        TAGGED_SEARCH,
        LOADING_START,
        LOADING_END,
        TAGGED_SEARCH_CONTINUE,
        SHOW_REPLY,
        GET_NOTICE_LIST,
        MAKE_NEWFOLLOW_MODAL,
        DELETE_NEWFOLLOW_MODAL,
        MAKE_NEW_REPLY_MODAL,
        DELETE_NEW_REPLY_MODAL,
        SHOW_SNACK,
        SHOW_FAVORITE,
        USER_CONFIG_LIST,
        CHANGE_USER_CONFIG,
        ERROR_RESET,
        RESULT_ERROR,
        CONNECT_ERROR,
        CRITICAL_ERROR,
        SHOW_TAG_ADMIN,
        MAKE_TAG_ADMIN,
        MODIFY_TAG_ADMIN
    } from '../lib/ActionTypeString';

import  {useSnackbar} from 'notistack';

const INIT_ACTION={
    type:"NONE",
    user_list:[],
    unit_list:[],
    timeline:[],
    isPrivate:false,
    login_id:"",
    results:[],
    endflg:false,
    notices:[]
};

//最初の認証時に取得する情報　各種各ユーザー情報など
const INIT_AUTH_STATE={
    isLoad:false,
    user_list:[],
    main_tag:[],
    sub_tag:[],
    all_tag:[],
    formatted:[],
    user_config:[]

};

const auth_login=(state=INIT_AUTH_STATE,action=INIT_ACTION)=>{
    
    const result=action.result;
    
    switch (action.type) {
        case LOADING_START:
            return {
                ...state,
                isLoad:true
            };
        case LOADING_END:
            return {
                ...state,
                isLoad:false
            };

        case AUTH_SUCCESS:
            //console.log(action);
            const userConf=result.res;
            
            return  { ...state,
                userId:userConf.userId,
                username:userConf.username,
                userRank:userConf.userRank,
                user_list:userConf.user_list,
                main_tag:userConf.main,
                sub_tag:userConf.sub,
                all_tag:userConf.all,
                formatted:userConf.formatted,
            };

    
        case USER_CONFIG_LIST:
        
            return  { ...state,
                user_config:result.user_config,
            };
        case CHANGE_USER_CONFIG:
            //こまめに値を返さないと表示がずれるので現状を返す
            return  { ...state,
                main_tag:result.main_tag,
                sub_tag:result.sub_tag,
                user_config:result.user_config,
            };

        default:
            return state;
    }
};

const INIT_TAG_ADMIN_STATE={
    tag_list:[],
    change:0
};

const tag_admin=(state=INIT_TAG_ADMIN_STATE,action=INIT_ACTION)=>{
    switch(action.type){
        case SHOW_TAG_ADMIN:
            console.log("SHOW_TAG_ADMIN DONE");
            return {...state,
                tag_list:action.result.tag_list
            }; 

        case MAKE_TAG_ADMIN:
        case MODIFY_TAG_ADMIN:
            return {
                ...state,
                change:action.result.change
            }
    
        default:
            return state;


    }
    
}


const INIT_USER_TAG={
    user_config:[]

}



//各ユーザーのログイン時のやり取り
const INIT_USER_STATE={
    login_id:-1,
    open_password:false,
};

const INIT_MEMO_MAIN_STATE={
    timeline:[],
    read:[],
    fav:[],
    memomake_open:false,
    endflg:false,
    change:0
};

const INIT_MEMO_STATE="";

const memo_main=(state=INIT_MEMO_MAIN_STATE,action=INIT_ACTION)=>{
    
    const result=action.result;

    switch(action.type){
        case RESET_MEMO:
            return {...state,
                timeline:result.timeline,
                read:result.read,
                fav:result.fav,
                endflg:result.endFlg
            }; 
            
        case LOAD_NEW_MEMO:
            //console.log(action);
            const resA=state.timeline.concat().concat(result.timeline);
            const read=state.read.concat().concat(result.read);
            const fav=state.fav.concat().concat(result.fav);

            //resA.concat(action.timeline);
           // console.log(resA);

        
            return {...state,
                timeline:resA,
                read:read,
                fav:fav,
                //results:action.results,
                endflg:result.endflg
            }; 

        case MEMO_EDIT_END_MAIN:
            
            const newtimeline=state.timeline.map((d)=> d.id===result.id ? result : d );
            return {
                ...state,
                timeline:newtimeline
            };
            
        case PUSH_SHOW_MEMO_BUTTON:
            
            return Object.assign({},state,{
                isPrivate:action.isPrivate,
                memomake_open:action.memomake_open}
            );


        case CLOSE_MEMOMAKE:
            return Object.assign({},state,{ memomake_open:false}
            );

        case MEMO_END:
            return {...state,
                timeline:[],
                read:[],
                fav:[],
                //results:action.results,
                endflg:false
            };

            case MEMO_INSERT_END:
                return {...state,
                    change:result.change
                };
    
        default:
            return state;
    }
};

export const tagged_main=(state=INIT_TAGGED_SEARCH,action=INIT_ACTION)=>{
    
    const result=action.result;

    switch(action.type){



        case TAGGED_SEARCH:
            return {...state,
                timeline:result.timeline,
                read:result.read,
                fav:result.fav,
                endflg:result.endflg
            };     
        
        case TAGGED_SEARCH_CONTINUE:
            if( result.timeline.length==0){
                return {...state,
                    endflg:result.endflg
                }; 
    
            }

            return {...state,
                timeline:state.timeline.concat().concat(result.timeline),
                read:state.read.concat().concat(result.read),
                fav:state.fav.concat().concat(result.fav),
                endflg:result.endflg
            }; 

        case MEMO_EDIT_END_TAG:
            const newtimeline=state.timeline.map((d)=> d.id===result.id ? result : d );
            return {
                ...state,
                timeline:newtimeline
            };
        default:
            return state;
    }
};




const show_favorite=(state=INIT_MEMO_STATE,action)=>{
    switch(action.type){
        case SHOW_FAVORITE:
            return {...state,
                timeline:action.result.timeline,
                read:action.result.read,
                fav:action.result.fav,
                endflg:action.result.endFlg
            }; 
        default:
            return state;
    }
};




const INIT_TAGGED_SEARCH={
    timeline:[],
    read:[],
    fav:[],
    endflg:false,
    change:0
};

const INIT_REPLY_MAIN={
    self_data:{},
    reply_source:{},
    parent_data:null,
    past_thread:[],
    child_data:[],
    future_thread:[],
    read:[],
    fav:[],
    load_flg:false
};


const INIT_FOLLOW_ACTION={
    follow_data:{},

};


export const follow_main=(state=INIT_FOLLOW_ACTION,action)=>{
    switch (action.type){

        case MAKE_NEWFOLLOW_MODAL:
            return {
                ...state,
                follow_data:action.follow_data,
            };
        case DELETE_NEWFOLLOW_MODAL:
            return {
                ...state,
                follow_data:{},
            };
        default:
            return state;

    }
}


export const reply_main=(state=INIT_REPLY_MAIN,action)=>{
    switch(action.type){

        case MAKE_NEW_REPLY_MODAL:
            return {
                ...state,
                reply_source:action.reply_source
            };
        case DELETE_NEW_REPLY_MODAL:
            return {
                ...state,
                reply_source:{}
            };


        case SHOW_REPLY:
            
            const result=action.result;
            
            const past_thread=[];
            const child_data=[];
            const future_thread=[];
            
            let parent_data={};
            
            const self_data=result.timeline.find((d) => d.id===parseInt(result.id));
                
            result.timeline.map((d)=>{
                if(d.id<self_data.id){
                    if(self_data.keyParent===d.id){
                        parent_data=d;
                    }else{
                        past_thread.push(d);
                    }
                }else if( d.id > self_data.id ){
                    if(d.keyParent===self_data.id){
                        child_data.push(d);
                    }else{
                        future_thread.push(d);
                    }
                }
            });
            

            return {...state,
                self_data:self_data,
                parent_data:parent_data,
                past_thread:past_thread,
                child_data:child_data,
                future_thread:future_thread,
                read:action.result.read,
                fav:action.result.fav,
                endFlg:true,
                load_flg:true
                
            };
        default:
            return state;

    }
}



const INIT_NOTICE={
    notices:[],
    snack:[],
    count:0
};

export const notice_main=(state=INIT_NOTICE,action=INIT_ACTION)=>{
    switch (action.type){
        case GET_NOTICE_LIST:
            return {
                ...state,
                notices:action.result.notices,
                count:action.result.count     
            };
        case SHOW_SNACK:

            return {
                ...state,
                snack:[...state.snack,action.msg]
            };

        default:
            return state;
    }

};

const ERROR_DATA={
    errorFlg:false,
    errorMsg:"",
    errorCode:-1
    
};
const error_control=(state= ERROR_DATA,action=INIT_ACTION) =>{

    const results=action.result;
    switch (action.type){
        case ERROR_RESET:
            return ERROR_DATA;

        case RESULT_ERROR:
            return {
                ...state,
                errorFlg:true,
                errorMsg: results.errorMsg,
                errorCode:results.errorCode,
            };
        case CRITICAL_ERROR:
            return {
                ...state,
                errorFlg:true,
                errorMsg: action.result.errorMsg
            };

        case CONNECT_ERROR:
            return {
                ...state,
                errorFlg:true,
                errorMsg: "通信エラーが発生再接続します"
            };
        default:
            return state;

    }
};


export default combineReducers(
    {memo_main,
    auth_login,
    tagged_main,
    reply_main,
    notice_main,
    follow_main,
    show_favorite,
    error_control,
    tag_admin
});