import React, { useState, useEffect } from 'react'
import { BarChart, Bar, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Chart from '../components/Chart'
import { useStateContext } from '../context'

const Dashboard = () => {
    
    const { getAllTransactions, getTransactionFromTo } = useStateContext();

    const [dataGraphLine, setDataGraphLine] = useState(null);


    useEffect(() => {
       dataForLine();
    
    }, [])
    


   const dataForLine = async () => {
        const arrTrans = await getTransactionFromTo()
        const data = arrTrans.reduce((acc, cur) => {
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

    // const dataForLine = () => {
    //     getAllTransactions().then((res) => {
    //         const data = res.reduce((acc, cur) => {
    //             const existingItem = acc.find(item => item.hour === cur.hour);
    //             if (existingItem) {
    //               existingItem.count += cur.count;
    //             } else {
    //               acc.push({ hour: cur.hour, count: cur.count });
    //             }
    //             return acc;
    //           },[]);
    //         setDataGraphLine(data);
    //     })
    // }

    return (
        <div className="w-[80%] h-[80%] m-auto mt-10 flex items-center justify-center flex-col sm:flex-row flex-wrap gap-6 ">
            <Chart type="line" data={dataGraphLine && dataGraphLine}/>
            <Chart type="bar"data={dataGraphLine && dataGraphLine}/>
            <Chart type="pie"/>
            <Chart type="heatmap"/>
        </div>
    )
}

export default Dashboard