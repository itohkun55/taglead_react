//共通で使いそうな関数をまとめておく　stateとかは取らず　共通のデータ構造にのみ依存するように作っておく

export const getUserName=(user_list,id)=>{
    const us=user_list.find(u=>u.id===id);
    if (!us) return "名称不定";

    return us.strName;
};

export const checkHasContent=(obj)=>{
    if (!obj ) return false;
    return Object.keys(obj).length>0;
};

export const getTagInfo=(list,id)=>{
    const res=list.find(d=>d.id===id);
    if(!res) return {id:-1,　strTagName:"存在しないタグ"};

    return res;
};

export const getTagNames=(tag_list,strArray)=>{
    const strs=strArray.split(",");
    return strs.map((d)=>{
        const us= tag_list.find(u=>u.id===d.id);
        if (!us) return "タグ不定";
        return us.strTagName;
    });    
};

//入力はYYYY-MM-DD HH:MM
export const getDateMessage=(date)=>{
    const dd= new Date(Date.parse(date)) ;
    const nowdd=new Date();

    const lessd=nowdd-dd;
    //ModifyMinuteExpression
    const mmE=(ms)=>{
        if (ms<10){
            return "0"+String(ms);
        }
        return String(ms);
    };

    if(lessd<0){
        return  "予定 :"+dd.getFullYear()+"年"+parseInt(1+dd.getMonth())+"月"+dd.getDate()+"日 "+dd.getHours()+":"+mmE(dd.getMinutes());
  
    }else if(lessd<1000*60){
        return "数秒前";

    }else if( lessd<1000*60*60 ){
        return  Math.round(lessd/(1000*60)) + "分前"; 
    }else if(lessd<1000*60*60*24){
       // console.log(lessd/(1000*60*60));
        return  Math.round(lessd/(1000*60*60)) + "時間前";

    }else if (lessd<1000*60*60*48 &&   nowdd.getDate()-dd.getDate()===1 ){
        return  "昨日"+ dd.getHours() + "時"+ mmE(dd.getMinutes()) + "分"; 
    }else if( dd.getFullYear()===nowdd.getFullYear()){
        return parseInt(1+dd.getMonth())+"月"+dd.getDate()+"日 "+dd.getHours()+":"+mmE(dd.getMinutes());
    }else{
        return dd.getFullYear()+"年"+parseInt(1+dd.getMonth())+"月"+dd.getDate()+"日 "+dd.getHours()+":"+mmE(dd.getMinutes());
    }
};

export const getTimeStampNow=()=>{

    const date = new Date();
    
    const year_str = date.getFullYear();
    const month_str = date.getMonth()+1;
    const day_str = date.getDate();
    const hour_str = date.getHours();
    const minute_str = date.getMinutes();
    const second_str = date.getSeconds();

    let format_str = 'YYYY-MM-DD hh:mm:ss';
    format_str = format_str.replace(/YYYY/g, year_str);
    format_str = format_str.replace(/MM/g, month_str);
    format_str = format_str.replace(/DD/g, day_str);
    format_str = format_str.replace(/hh/g, hour_str);
    format_str = format_str.replace(/mm/g, minute_str);
    format_str = format_str.replace(/ss/g, second_str);
    return format_str;
};