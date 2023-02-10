import React, { useState, useEffect } from 'react'
import { BarChart, Bar, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Chart from '../components/Chart'
import { useStateContext } from '../context'

const Dashboard = () => {
    
    const { getAllTransactions, getTransactionFromTo, getTransactionsOverTime, transactionsPerBlock, blocks } = useStateContext();

    const [dataGraphLine, setDataGraphLine] = useState(null);
    const [dataGraphBar, setDataGraphBar] = useState(null);



    useEffect(() => {
       dataForLine();
       dataForBar();
    
    }, [blocks])
    

    const dataForBar = () => {
        let data = [];
        blocks.map((block) => {
            let info = {};
            info.number = parseInt(block.number.slice(2), 16);
            info.transCount = block.transactions.length;
            data.push(info);
        })
        console.log(data);
        setDataGraphBar(data.slice(0,30));

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


    return (
        <div className="w-[80%] h-[80%] m-auto mt-10 flex items-center justify-center flex-col sm:flex-row flex-wrap gap-6 ">
            <Chart type="line" data={dataGraphLine && dataGraphLine}/>
            <Chart type="bar"data={dataGraphBar && dataGraphBar}/>
            <Chart type="pie"/>
            <Chart type="heatmap"/>
        </div>
    )
}

export default Dashboard