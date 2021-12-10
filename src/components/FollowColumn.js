
//フォローしているチーム・メンバーを表示・追加・削除する

//開くと現在メモをフォローしているメンバー・チームが表示される

//ユーザーはプルダウンリストからメンバー・チームを追加してOKを押す
    //各行の＋ボタンを押すとプルダウンリスト追加イベントが実行される
    //プルダウンはメンバー・チームそれぞれについてあり、片方を変更するともう片方は操作できなくなる
/*
    要素
    ・チーム　プルダウンリスト
    ・メンバー　プルダウンリスト
    ・追加ボタン（＋）
*/

import React from 'react';

import PropTypes from 'prop-types';
import {connect}  from 'react-redux';
import {IconButton,FormControl,Select, MenuItem,FormHelperText,Button} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


import { makeStyles } from '@material-ui/core/styles';
//チェックアイコン

const stylesForFC=makeStyles(
    {
        columns:{
            display:"flex",
            padding:20
        },
        
        ulbutton:{
            display:"flex",
            listStyle:"none",
            align:"flex-end",
            justifyContent:"space-around" ,
            spacing:"100px" 
        },
        box2: {
            display:"flex",
            padding: "0em 1em",
            margin: "1em 0",
            fontWeight: "bold",
            color: "#6091d3",
            background: "#FFF",
            border: "solid 3px #6091d3",
            borderRadius: "10px",
            justifyContent:'space-around'
        }


    }

)



const FollowColumn=(props)=>{
    //console.log(props.users);
    const styles=stylesForFC();

    const [buser,setUser]=React.useState(false);
    const [bteam,setTeam]=React.useState(false);
    const [bShowTitle,setBshowTitle]=React.useState(true);
    const [defUser,setDefUser]=React.useState(-1);
    const [defTeam,setDefTeam]=React.useState(-1);
    const cid=props.id;


    const setUserSelect=(e)=>{
        const userid=e.target.value;
        
        if (userid===-1 ){
            setBshowTitle(true)
            setTeam(false)
        }else{
            setBshowTitle(false)
            setTeam(true)
        }
        //setDefUser(userid);
        props.onSelect({id:cid,user:userid,team:-1})
    }

    const setTeamSelect=(e)=>{
        const teamid=e.target.value;
        if (teamid ===-1 ){
            setBshowTitle(true)
            setUser(false)
        }else{
            setBshowTitle(false)
            setUser(true)
        }
       // setDefTeam(teamid);
        
        props.onSelect({id:cid,user:-1,team:teamid});
    }
    
    const onDelete=(e)=>{
        props.onDelete(cid);
    }

    const allDisable=()=>{
        setUser(true);
        setTeam(true);
            
        setBshowTitle(false);
    
    }

    
    const allInit=()=>{

        
        // if (userid===-1 ){
        //     setBshowTitle(true)
        //     setTeam(false)
        // }else if(){
        //     setBshowTitle(false)
        //     setTeam(true)
        // }

    
    }


    React.useEffect(()=>{
        const user=props.user;
        const team=props.team;
        
        setDefUser(user);
        
        setDefTeam(team);
        if(props.isDef){
            //setDefTeam(props.team);
            allDisable();
        }else{
            if (user>0 ){
                setBshowTitle(false);
                
                setUser(false);
                setTeam(true);
            }else if(team>0){
                setBshowTitle(false);
                setUser(true);
                setTeam(false);
            }else{
                
                setTeam(false);
                setBshowTitle(true);
                setUser(false);
            }
    
        }

        return()=>{
            //setDefUser(-1);
            //setDefTeam(-1);
            //allInit();
        }
 
    },[props.user,props.team,]);

        //一覧作成
    return (
        <>
            <div className={styles.box2}>
            
            <FormControl>
            <Select
                labelId="followuser"
                disabled={buser}
                    onChange={setUserSelect}
                    value={defUser}
                    
                    >
                        <MenuItem value={-1} >-------------</MenuItem>
                {
                    props.users.map(user=>(
                        <MenuItem value={user.id} >{user.name}</MenuItem>
                    ))
                }
                
            </Select>
            {
                bShowTitle &&
                    <FormHelperText>人を追加</FormHelperText>
            }
            </FormControl>
            
            <FormControl>
            
            <Select
                    labelId="followteam"
                    disabled={bteam}
                    onChange={setTeamSelect}
                    value={defTeam}
                    
                    >
                        <MenuItem value={-1} >-------------</MenuItem>
                    {
                        props.teams.map(team=>(
                            <MenuItem value={team.id} >{team.name}</MenuItem>
                        ))
                    }
                    
                </Select>
                {
                    bShowTitle &&
                    <FormHelperText>部署などを追加</FormHelperText>
                
                }  
                
                </FormControl>
                <IconButton edge="end" className={styles.menuButton} onClick={onDelete} color="inherit" aria-label="menu" ><HighlightOffIcon fontSize="large"/></IconButton>
                
                </div>


            </>
        )



    
}

FollowColumn.propTypes={
    id:PropTypes.number,
    onSelect:PropTypes.func,
    users:PropTypes.arrayOf(PropTypes.any),
    teams:PropTypes.arrayOf(PropTypes.any),
}

export default FollowColumn;