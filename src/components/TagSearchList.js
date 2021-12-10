import React ,{useState,useEffect}  from 'react';
import {useDispatch,useSelector}  from 'react-redux';
import MemoColumn from './MemoColumn';
import { makeStyles} from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import {ScrollUpdater} from '../lib/windowScrollControll';
import { getTaggedData } from '../actions';
import TagInputList from './TagInputList';
import { getTimeStampNow } from '../lib/UtilityLibrary';

//このリスト画面自体は通信にはかかわらず、親のコンポーネントからデータを渡す
//このコンポーネント自体はスクロール位置に関係する



const listStyles=makeStyles((theme)=>({
    base: {
        position:'relative',
        top:'60px'
    }

}))


const TagSearchList=(props)=>{
    //const dispatch=useDispatch();
    
    const tag_list=useSelector(state=>state.auth_login.all_tag,[]);    
    const timeline=useSelector(state=>state.tagged_main.timeline);
    const read=useSelector(state=>state.tagged_main.read,[]);
    const fav=useSelector(state=>state.tagged_main.fav,[]);

    const endflg=useSelector(state=>state.memo_main.endflg,true);
    //更新後の内容を反映するためのフラグ
    const changeFlg=useSelector(state=>state.memo_main.change);


    const [selected,setSelected]=useState([]);
    const classes=listStyles();
    const [start,setStart]=useState(false);
    const [showEnd,setShowEnd]=useState(false);
    const [showProgress,setShowProgress]=useState(false);

    const dispatch = useDispatch();

    const setNewTagList=()=>{
        if(!timeline || selected.length==0 ) return;
        const fromDay=new Date(timeline.slice(-1)[0].dateRegist).toJSON();
        
        sendSelectedTag(selected,fromDay,true);
    };

    useEffect(()=>{
        if (tag_list.length>0){
            setStart(true);
        }
        setShowEnd(timeline.length!==0 & endflg);
        setShowProgress(timeline.length!==0 & !endflg);

    },[tag_list,endflg,timeline]);


    const sendSelectedTag=(arr,day="", next=false)=>{
        const arr_res=arr.map((d)=>d.id);
        console.log(arr, arr_res);
        if (day=="") day="-1";

        dispatch(getTaggedData(arr_res,day,next));
    };

    useEffect(()=>{
        sendSelectedTag(selected);
    },[changeFlg]);

    const onSelect=(arr)=>{
        setSelected(arr);
        sendSelectedTag(arr);  
    };
    
    return (
        <div>
        {start &&
        <ScrollUpdater scrollFunc={()=>setNewTagList()} checkParam={timeline} endflg={endflg} buffer={60}/>
        }
        <div className={classes.base}>
        <TagInputList setSelected={onSelect} end={false} />
            {
                timeline.length===0 ?

                <div> 該当する検索結果は存在しません。<br/>タグを新規選択するか、現在選択のタグを外してください。 </div>                
                :  
                timeline.map((d)=>{

                        return (<MemoColumn
                            key={d.id}
                            data={d}
                            read={read}
                            fav={fav}

                        />)

                    })

            }
            {  showEnd ?  <div>現在の表示内容は以上です。</div> :<div/>}
            {  showProgress ? <div className={classes.progress}><LinearProgress/></div> :<div/> }
                
        </div>
        </div>

    )
}

export default TagSearchList;
