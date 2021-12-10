//共通で使いそうな関数をまとめておく　stateとかは取らず　共通のデータ構造にのみ依存するように作っておく
import { useSelector } from "react-redux";


export const GetUserName=({id , prefix="", suffix=""})=>{
    const user_list=useSelector(state=>state.auth_login.user_list);

    const us=user_list.find(u=>u.id===id);
    if (!us) return ( <span>名称未設定</span> );

    return ( <span>{prefix}{us.strName} {suffix} </span> );
};

export const GetTagName=({id})=>{

    const tag_list= useSelector(state=>state.auth_login.all_tag,[]);
    const tagname=tag_list.find(el=> el.id==id );
    if( !tagname ) return  <span> タグ不明 {id} :</span>

    return  <span>{tagname.strTagName} :</span> 

}

