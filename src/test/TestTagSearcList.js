import React,{useEffect} from 'react';
import { useDispatch } from 'react-redux';
import TagSearchList from '../components/TagSearchList';
import {tag_start} from '../actions';

export const TestTagSearchList=(props)=>{
    const dispatch = useDispatch();

    const TagData=[
        {id:2,type:1,name:"伊藤正彦"},
        {id:3,type:1,name:"高橋由香"},
        {id:4,type:1,name:"大橋巨泉"},
        {id:6,type:1,name:"鈴木敦"},
        {id:8,type:2,name:"排泄"},
        {id:10,type:2,name:"入浴"},
        {id:11,type:2,name:"食事"},
        {id:15,type:2,name:"徘徊"}
    ];

    
    useEffect(() => {
        
        dispatch(tag_start());
        

    }, []);


    return (
        <div>
            
            <hr/>
                <TagSearchList data={TagData}/>

            
            <hr/>   
        </div>
    )

}