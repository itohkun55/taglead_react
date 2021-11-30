import React from 'react';

// import TestHooks  from './TestHooks';
// import TestMemoInsertButton  from './TestMemoInsertButton';
// import TestMakeMemoModal  from './TestMemoMakeModal';
// import TestMemoDeleteModal  from './TestMemoDeleteModal';
// import {TestMemoColumn} from './TestMemoColumn';
 import {TestMainHeader} from '../test/TestMainHeader';
// import TestPasswordModal from './TestPasswordModal';
// import TestFollowColumn from './TestFollowColumn';
 import TestFollowList from '../test/TestFollowList';
// import {TestMemoList} from './TestMemoList';
// import TestAuthAction  from './TestAuthAction';


const TestMain=(props)=>{

    return (
        <div>
            <h1>Test Main</h1>
            {/* <TestAuthAction/> 
             <TestMemoInsertButton/>
            <TestMakeMemoModal/>
            <TestPasswordModal/> 
            <TestMemoColumn/>
            <TestMemoDeleteModal/>
            <TestMemoList/>*/}
 
            <TestMainHeader/> 
            {/*<TestFollowColumn/>*/}
            <TestFollowList/>
        </div>
    )


}

export default TestMain;
