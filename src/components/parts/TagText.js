import { TAG_TEXT_INPUT } from "../../lib/TagTypeNames";

import React  from 'react';
import {useSelector } from 'react-redux';

const TagText=({tagtextarray})=>{
    const tag_list= useSelector(state=>state.auth_login.all_tag,[]);

    let ss="";
    if (!tagtextarray) return (<span/>);

    return tagtextarray.split(",").map((d)=>{

        if (d.includes(":")){
            const sd=d.split(":");
            const tagname=tag_list.find(el=> el.id==sd[0]);
            if( !tagname ) return  (<span> タグ不明 {d} :</span>)
            
            return tagname.strTagName+":"+sd[1];
        }

        const tagname=tag_list.find(el=> el.id==d );
        //console.log(tagname);
        if( !tagname ) return  <span> タグ不明 {d} :</span>

        return  <span>{tagname.strTagName} :</span> 
    });
};

export default  TagText;