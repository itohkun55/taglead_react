// onLoad問題を再現できるかテスト
import React from 'react';

import {Button} from '@material-ui/core';


const ButtonSample=(props)=>{

    const onClick=()=>{
        props.onClick();
    }

    return(
        <div>
            {/* <Button onClick={onClick}>押すと屁が出る</Button> */}

        </div>
    )
}

export default ButtonSample;