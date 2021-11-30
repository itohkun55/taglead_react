import React from 'react';
import {throttle} from 'lodash';

export const ScrollUpdater=(props)=>{

    //実行関数　setNewTimeLine

    //監視パラメータ　timeline
    

    const checkInEnd=throttle(() => {
        const m1=Math.round(window.innerHeight + document.documentElement.scrollTop);
        const m2=Math.round(document.documentElement.scrollHeight);
        //console.log("m1 ",m1,"m2 ",m2);

        if (
            //ブラウザによってずれが起きるためトリガーに少しだけ範囲を作る
            Math.abs(m1-m2)>5
        ) {
            return;
        }
        if (!props.endflg)  props.scrollFunc();
    
        }, 200
    );
    
    
    React.useEffect(()=>{
        //画面を切り替えたらとりあえずトップに戻す
        document.documentElement.scrollTop=0;
        props.scrollFunc();
    },[]);
    
    React.useEffect(() => {
        
        window.removeEventListener('scroll', checkInEnd);
        window.addEventListener('scroll', checkInEnd);
        
    
        return () => {
        window.removeEventListener('scroll', checkInEnd);
        
        };
        //propsの中身は随時更新しないと同じ初期値を使いまわすことになる
    }, [props.checkParam]); // eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <div/>
    )

}

