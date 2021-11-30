import React from 'react';
import {connect}  from 'react-redux';

import FollowList from '../components/FollowList';


const TestFollowList=(props)=>{


    
    const onSelect=(props)=>{
        console.log(props);
    }

    const current=[
        {id:4,user:-1,team:3},
        {id:5,user:2,team:-1},
        {id:6,user:5,team:5},
    ]


    
    const oneUser=[{name:"伊藤正彦",id:3}];
    const oneTeam=[{name:"2番街",id:2}];
    const manyUser=[
        {name:"伊藤正彦",id:2},
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
            <div> これはFollowList　の挙動画面です</div>
            <FollowList
                followers={current}
                users={manyUser}
                teams={manyTeam}
            />
            

        </div>
 
    )

}

const mapStateToProps=state=>{
   
    return {deleteId:state.deleteId};
    
}

export default connect(mapStateToProps)(TestFollowList);
