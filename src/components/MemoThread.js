import React  from 'react';
import MemoColumn from './MemoColumn';
//ReplyThread用のパーツ
//親にさらにコンポーネントを挟んで、これ自体はPropsから値をもらって表示するだけにする

const MemoThreads=(props)=>{
    //const dispatch=useDispatch();
    
    const thread=props.thread;

    return (
        <div>
            {
                thread.map((d)=>{
                    return (<MemoColumn
                        key={d.commentId}
                        userId={d.userId}
                        unitId={d.unitId}
                        threadId={d.threadId}
                        parentId={d.parentId}
                        hasStar={d.hasStar}
                        time={d.time}
                        read={d.read}
                        detailText={d.message}
                        senderName={d.senderName}

                    />)
                })
            }
        </div>
    )
}

export default MemoThreads;
