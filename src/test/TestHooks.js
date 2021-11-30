import React from 'react'
import {Button,Modal,Accordion,AccordionSummary,AccordionDetails,Collapse}  from '@material-ui/core';
import { ExpandMoreIcon } from '@material-ui/icons/ExpandMore';

import ButtonSample from './ButtonSample';

const TestHooks=(props)=>{

    const [expanded ,setexpanded]=React.useState(false);
    const [ids,setId]=React.useState(0);

    const openSample=()=>{
        console.log("実行1");
        setexpanded(!expanded);
        //const ids=id;
        setId(ids+20);
    }
    // React.useEffect(()=>{
    //     //const ids=id+20;
    //     console.log("実行2");
    //     setId(ids+20);
    // },[ids]);

    
    const onClick=()=>{
        console.log("実行3");
        //const ids=id+20;
        setId(ids+20);
    }


    return (
        <div>AAAA
            <button onClick={onClick}>ASSDDD</button>
          <Button onClick={openSample}>いい感じのボタン</Button>
            <h3>{ids}</h3>
             {/* <Collapse in={expanded}>
                <div>中に書いてあるもの</div>
            </Collapse> */}
             <div>後に書いてあるもの</div>

           {/* <ButtonSample
                onClick={onClick}
            /> */}

        </div>
    )

}

export default TestHooks;