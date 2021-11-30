import React from 'react';
import {connect}  from 'react-redux';
import {Button,Box,IconButton} from '@material-ui/core';


import { makeStyles } from '@material-ui/core/styles';
import FollowColumn from './FollowColumn';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
//チェックアイコン



/*
    要素
    ・フォローカラムリスト
    ・送信ボタン
 */


//開くと現在メモをフォローしているメンバー・チームが表示される

//追加イベントを受けたら空カラムを一つ追加する

//送信ボタンを押すとモーダルを表示して、終了確認後モーダルは消える



const FollowList=(props)=>{

    const [followers,changeFollowers]=React.useState([]) ;
    const users=props.users;
    const teams=props.teams;
    const [id,setId]=React.useState(0)

    const setFollower=(props)=>{
        console.log(props);
        const newfollowers=followers.map((follower )=>{
                if(follower.id===props.id){
                    return props;
                }else{
                    return follower;
                }
            }
        )
        console.log(newfollowers);
        changeFollowers(newfollowers);
    }
    const addFollower=(e)=>{
        const newFollowers=[];
        Object.assign(newFollowers,followers) ;
        const newid=id+1
        setId(newid);
        newFollowers.push({id:newid,user:-1,team:-1,isDef:false});
       
        changeFollowers(newFollowers);

    }

    
    const deleteFollower=(id)=>{
        //const newFollowers=[];
        //Object.assign(newFollowers,followers) ;
        const newFollowers= followers.filter((follower)=>{
            return follower.id!==id
        })

        changeFollowers(newFollowers);

    }

    React.useEffect(()=>{
        let nowid=id;
        
        const newFollowers=props.followers.map((follower)=>{
            
            
            let user=-1;
            if(follower.user && follower.user>0){
                user=follower.user;
            }
            let team=-1;
            if(follower.team && follower.team>0){
                team=follower.team;
            }

            return {id:++nowid,user:user,team:team,isDef:true}

        });
        setId(nowid);
        console.log(newFollowers);
        changeFollowers(newFollowers);
    },[]);

    return(
        <div>
           
            {followers.map(follower=>(
                <FollowColumn
                    id={follower.id}
                    onSelect={setFollower}
                    onDelete={deleteFollower}
                    user={follower.user}
                    team={follower.team}
                    users={users}
                    teams={teams}
                    isDef={follower.isDef}
                    
                />
            ))}

            <div><IconButton onClick={addFollower} ><AddCircleOutlineIcon  edge="end"  color="inherit" aria-label="menu"/></IconButton></div>
        </div>
    )

}


export default FollowList;

