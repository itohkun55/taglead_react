import React, { useState, useLayoutEffect, useRef,useEffect } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ReplyColumn from './ReplyColumns';
import MemoColumn from './MemoColumn';

/**
 * Styled component
 */


const useStyles=makeStyles({

    wrapper:props=>({
        width: "100%",
        margin: "2em auto",
        position: "relative",
        padding: "0em 1em",

        '&:after': {
            content: '',
            display: "table",
            clear: "both"
        },
    
        '&:before': {
            content: '""',
            position: "absolute",
            top: 0,
            left: "10px",
            height:(props.lineHeight)+"px",
            width: "2px",
            background: "black"
        }
        
    })
});


const  ReplyColumnList=({data,fav,read})=> {
	const [lineHeight, setLineHeight] = useState(0);
    const classes=useStyles({lineHeight});
	const wrapperHeight = useRef(null);
    //console.log(" ReplyColumnList ",props);
    
	useLayoutEffect(() => {
		const handleResize = () => {
			setLineHeight(
				wrapperHeight.current.clientHeight
                // -wrapperHeight.current.lastChild.clientHeight
			);
		};

		window.addEventListener('resize', handleResize)
		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
		}
	}, [data, lineHeight]);


	return (
		<div
            className={classes.wrapper}
			ref={wrapperHeight}
			lineHeight={lineHeight}
		>
            {
                data.map((d)=>{
                    return ( <MemoColumn
                        boxstyle={"thread"}
                        key={d.id}
                        data={d}
                        fav={fav}
                        read={read}
                        rep={true}

                    />)
                    
                })
            }


	        
		</div>
	)
}

export default ReplyColumnList
