import React from 'react';
import { useSelector } from 'react-redux';
import {Chip} from '@material-ui/core';
import {TYPE_TAG_GUEST,TYPE_TAG_MEMBER} from '../../lib/TagTypeNames'; 
import FaceIcon from '@material-ui/icons/Face';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import { makeStyles,createStyles,Theme } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  ({
    funcColor:{
        color:"red",
      borderColor:"red"
    }, 
    staffColor:{
      color:"green",
      borderColor:"green"
    },
    guestColor:{
      color:"gold",
      borderColor:"gold"
    },
    placeColor:{
        color:"blue",
        borderColor:"blue"
    },
    actionColor:{
        color:"blue",
        borderColor:"blue"
    },
  }));

export const TagChip=({d})=>{
    const tag_source=useSelector(state=>state.auth_login.all_tag);

    const classes=useStyles();

    const colorPalette=[
        "info",
        classes.staffColor,
        classes.guestColor,
        classes.placeColor,
        classes.actionColor
    ];
    
    const sd=d.split(":");
    const tagdata=tag_source.find(el=> el.id==sd[0]);
    let name="";
    
    if( !tagdata|| typeof(tagdata)=='undefined'){
        return (<Chip label={"不明"}/>)
    }else if (sd.length==2){
        name= tagdata.strTagName+":"+sd[1];
    }else{
        name=tagdata.strTagName;
    }

    return (
        <>
        <Chip
            
            icon={tagdata.numTagType===TYPE_TAG_GUEST ?
                <FaceIcon/>                            
                : tagdata.numTagType===TYPE_TAG_MEMBER &&
                <TagFacesIcon/>
                
            }

            variant="outlined"
            size='small'
            className={colorPalette[(tagdata.numTagType)-1] }
            label={name}
            />
        </>
    )

}

export const TagChipList=({listStr})=>{
    const list=listStr.split(",");

    return(
        list.map((d)=>{
            return (<TagChip d={d} />)
        })
    
    )

}
