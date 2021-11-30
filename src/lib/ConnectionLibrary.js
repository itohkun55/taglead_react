import axios from 'axios';
import {CONNECT_ERROR ,RESULT_ERROR, SHOW_SNACK,LOADING_START,LOADING_END} from './ActionTypeString';
import {API_URL} from './ServiceConfig';
//const URL='http://127.0.0.1:8000/api/';
//APIへの接続をまとめておく

class APICallController{

    constructor(){
        this.viewname="";
    }


    setView(viewname){
        this.viewname=viewname;

    }

    getView(){
        return this.viewname;
    }


    callAPI(name,params,typeStr,setFunc,dispatch,msg="",loadFunc=null){
        const setParams=Object.assign({},params);
        //setParams.userId=this.userId;
        //setParams.facId=this.facId;
        setParams.viewname=this.viewname;
        //setParams.fromId=this.fromId;
        
        dispatch({type:LOADING_START});

        const instance = axios.create({
            baseURL: API_URL,
            headers: {'Authorization': 'Bearer '+ localStorage.getItem('access_token')}

          });

        instance.get(name,{params:setParams})
        .then(results=>{
            console.log("results.data",results.data);
    
            
            if(results.data.errorFlg ){
                dispatch({type:RESULT_ERROR,result:results.data});    
                return;
            }

            const result=setFunc(results.data);
            //console.log(typeStr,results,result);

        
            if (msg!=="") {
                console.log("msg",msg);
                dispatch({type:SHOW_SNACK,msg:msg});
            }    
            dispatch({type:typeStr,result:result});
            dispatch({type:LOADING_END});

        }).catch(error=>{
            
            console.log("CONNECT_ERROR");
            console.log(error);
            //　後で　エラーをまとめてイベント表示する
            dispatch({type:CONNECT_ERROR,error});
            dispatch({type:LOADING_END});
    
        });
    }
}

export default new APICallController();
