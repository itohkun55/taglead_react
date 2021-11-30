import React from 'react';
import {connect}  from 'react-redux';

import FollowColumn from '../components/FollowColumn';


const TestFollowColumn=(props)=>{


    
    const onSelect=(props)=>{
        console.log(props);
    }


    
    const oneUser=3;
    const oneTeam=5;
    const manyUser=[
        {name:"伊藤正彦",id:3},
        {name:"三羽ガラス",id:4},
        {name:"イチジクニンジン",id:5},
        {name:"サンマにシイタケ",id:6},
        {name:"ごぼうに六甲",id:7},
    ];

    const manyTeam=[
        {name:"2番街",id:3},
        {name:"3番街",id:4},
        {name:"六花系",id:5},
        {name:"7番",id:6},
        {name:"ランランランララララララ",id:7},
    ];

    return(
        <div>
            <div> これはFollowColumn　の挙動画面です</div>
            
            <FollowColumn id={1} onSelect={onSelect} users={manyUser} teams={manyTeam} user={oneUser}  />

            <FollowColumn id={5} onSelect={onSelect} users={manyUser} teams={manyTeam} team={oneTeam}/>

            <FollowColumn id={6} onSelect={onSelect} users={manyUser} teams={manyTeam} />

        </div>
 
    )

}

const mapStateToProps=state=>{
   
    return {deleteId:state.deleteId};
    
}

export default connect(mapStateToProps)(TestFollowColumn);
