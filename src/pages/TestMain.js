import React from 'react';

// import TestHooks  from './TestHooks';
// import TestMemoInsertButton  from './TestMemoInsertButton';
// import TestMakeMemoModal  from './TestMemoMakeModal';
// import TestMemoDeleteModal  from './TestMemoDeleteModal';
// import {TestMemoColumn} from '../test/TestMemoColumn';
// import {TestMainHeader} from './TestMainHeader';
//import TestPasswordModal from '../test/TestPasswordModal';
//import TestLogoutModal from '../test/TestLogoutModal';
//import TestSearchForm from '../test/TestSearchForm';
// import TestMemoThread from '../test/TestMemoThread';
// import TestFollowColumn from './TestFollowColumn';
// import TestFollowList from './TestFollowList';
// import {TestMemoList} from './TestMemoList';
 import TestAuthAction  from '../test/TestAuthAction';
//import { TestTagSearchPanel } from '../test/TestTagSearcPanel';
//import { TestTagSearchList } from '../test/TestTagSearcList';
//import TestReplyColumnList from '../test/TestReplyColumnList';
// import {TestTagPutModal} from '../test/TestTagPutModal';
//import {TestNoticeColumn} from '../test/TestNoticeColumn';
//import {TestNoticeList} from '../test/TestNoticeList ';
import {TestFreeTagPutModal} from '../test/TestFreeTagPutModal';
import TestLoading from '../test/TestLoading';

const TestMain=(props)=>{

    return (
        <div>
            <h1>Test Main</h1>
            <TestAuthAction/> 
            {/*  <TestMemoInsertButton/>
            <TestMakeMemoModal/>
             
            <TestPasswordModal/>
            <TestLoading/>
            {/*<TestMemoDeleteModal/>
            <TestMemoList/>
            <TestTagSearchPanel/>
            <TestTagSearchList/>
            <TestReplyColumnList/>
            <TestTagPutModal/>
            <TestNoticeColumn/>
            <TestNoticeList />
            
            <TestFreeTagPutModal/>

            <TestSearchForm/>
            <TestMainHeader/> 
            <TestFollowColumn/>
            <TestFollowList/>*/}
        </div>
    )


}

export default TestMain;
