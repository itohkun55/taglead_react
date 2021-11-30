import React from 'react';
import TwiRow from './TwiRow';

const TwiTable=({datas})=>(
    <div>
        <h1>SSSSS</h1>

        <ul>

            {datas.map(data=>(
                <TwiRow data={data}/>
            ))}
        </ul> 
    </div>

);

export default TwiTable;