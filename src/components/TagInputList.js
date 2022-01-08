import {useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import {
    Chip,
    Tab,
    Tabs,
    TextField
    } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getTagInfo } from '../lib/UtilityLibrary';

const useStyles=makeStyles((theme)=>({

    root: {
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(0.5),
        },
        padding:"0px 0px 0px"
      },
    asummary:{
        borderRadius:5,
        backgroundColor:"lightblue",
        borderColor:"gray",
        border:"2px"

    },
    nontag:{
        color:"#ccc",
        fontSize:"12pt"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
    

}));


const TagInputList=(props)=>{
    

    const classes=useStyles();
    const [selected,setSelected]=useState([]);
    const [value,setValue]=useState(0);
    const main_tag=useSelector(state=>state.auth_login.main_tag);
    const sub_tag=useSelector(state=>state.auth_login.sub_tag);
    const all_tag=useSelector(state=>state.auth_login.all_tag);

    const [nameSearch,setNameSearch]=useState([]);

    const handleChange = (event, value) => {
        setValue(value);
    };

    const getTagData=(idlist)=>{
        const res=[];
        for (let s in idlist){
            res.push(all_tag.find(el=>el.id===parseInt(idlist[s]))); 
        }
        return res;
    };


    const onTagClick=(data)=>{
        let nowselected=[];

        if (selected.some((el)=>el===data)){
            nowselected=selected.reduce((prev,current)=>{
                if( current !== data) prev.push(current);
                return prev;
             },[]);
        }else{
            //中身をソートする
            nowselected=[...selected,data];
        }
        setSelected(nowselected);
        props.setSelected(nowselected);
    };

    useEffect(() => {
        if(all_tag.length===0) return;
        const def=getTagData(props.defSelected);
        setSelected(def);
        props.setSelected(def);
        //console.log("defselected in taglist",def);
    }, [props.defSelected,all_tag]);
    
    const TagSearchSet=()=>{
        const onChange=(e)=>{
            const str=e.target.value;
            if (str=="") {
                setNameSearch([]);
                return; 
            }    
            const resB=all_tag.filter(data=>data.strTagName.includes(e.target.value));
            setNameSearch(resB);
        };

        return (
            <div>
                <TextField 
                    label="検索ワード"
                    placeholder="探すタグの一部を入力"
                    onChange={onChange}  
                    variant="outlined" />
                <div>
                {            
                    nameSearch.map((d)=>{

                        return (
                            <Chip
                                key={d.id}    
                                variant={selected.some((el)=>el===d) ? 'outlined': 'default' }
                                color={d.numTagType=== 1 ? "secondary" : d.numTagType=== 2 ? "primary" : "default" }
                                label={d.strTagName}
                                clickable
                                onClick={(e)=>onTagClick(d)}
                            />
                        );
                    })

                }
                </div>
            </div>
        );
    }

    const makeTagList=(list)=>{
    
        return  list.map((m)=>{
            
            const d=getTagInfo(all_tag,m.keyTag);

            return (
                <Chip
                    key={d.id}    
                    variant={selected.some((el)=>el===d) ? 'outlined': 'default' }
                    color={d.numTagType=== 1 ? "secondary" : d.numTagType=== 2 ? "primary" : "default" }
                    label={d.strTagName}
                    clickable
                    onClick={(e)=>onTagClick(d)}
                />
            );
        });
    };

    const tagNameSearchInit=()=>{
        setNameSearch([]);
    }

    return (
    <div>
        <div>
            <Tabs value={value} onChange={handleChange} >
                <Tab label="メインタグ"  />
                <Tab label="サブタグ"  />
                <Tab label="タグ検索"  onClick={tagNameSearchInit} />
                <Tab label="タグ非表示"  />

            </Tabs>
        </div>
        <div hidden={value !== 0 }  className={classes.root}> { value === 0 && makeTagList(main_tag) }</div>
        <div hidden={value !== 1 }  className={classes.root}> { value === 1 &&  makeTagList(sub_tag) }</div>
        <div hidden={value !== 2 }  className={classes.root}> { value === 2 &&  TagSearchSet() }</div>
        
        <hr/>
            <span>検索タグ:  </span>
            {selected.length>0 ?
                selected.map((d)=>{
                    
                    return (
                        <Chip                         
                            key={d.id}  
                            variant='default' 
                            color={d.numTagType=== 1 ? "secondary" : d.numTagType=== 2 ? "primary" : "default" }
                            label={d.strTagName}
                            onClick={(e)=>onTagClick(d)}
                        />
                    )
                })
            :
            <span className={classes.nontag}>タグを1個以上選択してください</span>
            }
            
        <hr/>
        </div>      
    )
        
};

export default TagInputList;