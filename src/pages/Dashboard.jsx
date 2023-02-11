import React, { useState, useEffect } from 'react'
import { BarChart, Bar, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { Chart } from '../components'
import { Heatmap } from '../components'
import { useStateContext } from '../context'

const Dashboard = () => {
    
    const {  getBlocksFromTo, blocks } = useStateContext();

    const [dataGraphLine, setDataGraphLine] = useState(null);
    const [dataGraphBar, setDataGraphBar] = useState(null);
    const [dataAreaChart, setDataAreaChart] = useState(null);




    useEffect(() => {
       dataForLine();
       dataForBar();
       getTransactionsPerBlock();
    
    }, [blocks])
    


    const dataForArea = () =>{

    }

    const dataForBar = () => {
        let data = [];
        let countBlocks = 1;

        let olderBlockTime = blocks[0]?.timestamp * 1000;

        blocks?.map((block) => {
            if(olderBlockTime <= block.timestamp * 1000 && block.timestamp * 1000 <= olderBlockTime + 15 * 60 * 1000){

                countBlocks++;

            } else if (block.timestamp * 1000 > olderBlockTime + 15 * 60 * 1000){
                let info = {};

                let time1 = new Date(olderBlockTime).toTimeString().slice(0,5)
                let time2  = new Date(olderBlockTime + 15 * 60 * 1000).toTimeString().slice(0,5)

                info.countBlocks = countBlocks;
                info.time = time1 + ' - ' + time2;
                
                olderBlockTime = block.timestamp * 1000;
                countBlocks = 0;
                
                data.push(info)
            } else {
                console.log("block", olderBlockTime, block.timestamp  * 1000, olderBlockTime + 15 * 60 * 1000)
            }
        })
        setDataGraphBar(data);

    }

    const dataForLine = () => {
        let transactions = [];
        blocks.map((block) => {
            let info = {};
            let hour = new Date(block.timestamp * 1000).getHours().toString();
            info.hour = hour + ":00";
            info.count = block.transactions.length;
            transactions.push(info);
        })

        const data = transactions.reduce((acc, cur) => {
            const existingItem = acc.find(item => item.hour === cur.hour);
            if (existingItem) {
                existingItem.count += cur.count;
            } else {
                acc.push({ hour: cur.hour, count: cur.count });
            }
            return acc;
            },[]);
        setDataGraphLine(data);
    }


    const getTransactionsPerBlock = () => {
        if(!blocks || blocks.length < 1)    return;
        let data = [];
        for(let i = blocks.length - 30; i < blocks.length; i++)
        {
            let info = {};
            if(blocks.length - i < 10){
                info.number = "0"+(blocks.length - i).toString();
            } else {
                info.number = (blocks.length - i).toString();
            }
            info.transCount = blocks[i].transactions.length;
            //info.transCount = Math.floor(Math.random() * 100);
            data.push(info);
        }
        setDataAreaChart(data);
    }


    return (
        <div className="m-auto mt-10 flex items-center justify-center flex-col sm:flex-row flex-wrap gap-6 ">
            <Chart type="line" data={dataGraphLine && dataGraphLine}/>
            <Chart type="bar" data={dataGraphBar && dataGraphBar}/>
            <Chart type="area" data={dataAreaChart && dataAreaChart}/>
            <Chart type="pie"/>
            <Chart type="heatmap"/>
        </div>
    )
}

export default Dashboard