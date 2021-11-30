import React,{useEffect,useState} from 'react';
import { useDispatch } from 'react-redux';
import {Button} from '@material-ui/core'
import FormedTagPutModal from '../components/FormedTagPutModal';
//import {tag_start} from '../actions';

export const TestTagPutModal=(props)=>{
    const dispatch = useDispatch();
    
    const [open,setOpen] =useState(false);


    const TagData=[
        {id:1,type:1,name:"7番街",phase:1,　group:"unit",  show:[],del:[] },
        {id:2,type:1,name:"1番街",phase:1, 　group:"unit", show:[],del:[] },

        {id:42,type:1,name:"長谷川",phase:-1,　group:"user", show:[1],del:[] },
        {id:43,type:1,name:"山上" ,phase:-1, 　group:"user",show:[1],del:[] },
        {id:54,type:1,name:"山本" ,phase:-1, 　group:"user",show:[1],del:[] },
        {id:66,type:1,name:"小林" ,phase:-1, 　group:"user",show:[2],del:[] },
        {id:102,type:14,name:"登録時間" , phase:-1,show:[42,43],del:[] },
        

        {id:8,type:2,name:"排泄"  , group:"action",phase:2,show:[],del:[]},
        {id:10,type:2,name:"入浴" , group:"action",phase:2,show:[],del:[]},
        {id:11,type:2,name:"食事" , group:"action",phase:2,show:[],del:[]},
        {id:12,type:2,name:"自力" , group:"meel_style", phase:-1,show:[11],del:[13]},
        {id:13,type:2,name:"介助" ,group:"meel_style",phase:-1,show:[11],del:[12]},
        
        {id:15,type:2,name:"徘徊" ,group:"action",phase:2,show:[],del:[8,10,11]},
        {id:19,type:3,name:"少し" , group:"meel_amount", phase:-1,show:[12,13],del:[20,21]},
        {id:20,type:3,name:"半分", group:"meel_amount", phase:-1,show:[12,13],del:[19,21]},
        {id:21,type:3,name:"全て", group:"meel_amount", phase:-1,show:[12,13],del:[19,20]},
        {id:34,type:3,name:"シャワー",  group:"bath_style",phase:-1,show:[10],del:[46]},
        {id:46,type:3,name:"洗身", group:"bath_style", phase:-1,show:[10],del:[34]},
        {id:70,type:2,name:"バイタル", group:"action", phase:2,show:[],del:[8,10,11,15]},
        {id:71,type:2,name:"血圧", group:"bytal_type", phase:-1,show:[70],del:[72]},
        {id:72,type:2,name:"脈拍",  group:"bytal_type", phase:-1,show:[70],del:[71]},
        
        {id:73,type:11,name:"最高",phase:-1,show:[71],del:[]},
        {id:74,type:11,name:"最低",phase:-1,show:[73],del:[]},
    ];

    
    useEffect(() => {
        
    //    dispatch(tag_start());
        

    }, []);


    return (
        <div>
             <Button size={"small"} variant='contained' color="primary" onClick={()=>setOpen(true)}>開く</Button>
            
            <hr/>
                <FormedTagPutModal data={TagData} open={open} onClose={()=>setOpen(false)} />

            
            <hr/>   
        </div>
    )

}