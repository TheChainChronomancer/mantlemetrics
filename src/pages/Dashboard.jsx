import React, { useState, useEffect } from 'react'

import { Chart, Navbar } from '../components'
import { useStateContext } from '../context'


const Dashboard = () => {
    
    const { blocks } = useStateContext();

    const [dataGraphLine, setDataGraphLine] = useState(null);
    const [blocksPerPeriodChart, setBlocksPerPeriodChart] = useState(null);
    const [dataAreaChart, setDataAreaChart] = useState(null);
    const [transfersPerPeriodChart, setTransfersPerPeriodChart] = useState(null);
    const [transfersValueChart, setTransfersValueChart] = useState(null);
    const [transfersAverageChart, setTransfersAverageChart] = useState(null);
    const [dataComposedChart, setDataComposedChart] = useState(null);
    



    useEffect(() => {
       dataForLine();
       dataForBar();
       dataForTransfersCountandValuePerPeriod();
       getTransactionsPerBlock(300);
    //    getTransactionInfoPerBlock(30);
    
    }, [blocks])
    

    const dataForTransfersCountandValuePerPeriod = () => {
        let dataCount = [];
        let dataValue = [];
        let dataAverage = [];
        var transfersCount = 0;
        var transfersValue = 0;
        var transfersAverage = 0;

        var olderBlockTime = blocks[0]?.timestamp * 1000;

        blocks?.map((block) => {
            if(olderBlockTime <= block.timestamp * 1000 && block.timestamp * 1000 <= olderBlockTime + 15 * 60 * 1000){
                block.transactions.map((transaction) => {
                    if(transaction.value * 1 > 0){
                        transfersCount++;
                        transfersValue += transaction.value * 1;
                        transfersAverage += transaction.value * 1;
                    }
                })
            } else if (block.timestamp * 1000 > olderBlockTime + 15 * 60 * 1000) {
                let infoCount = {};
                let infoValue = {};
                let infoAverage = {};
                
                let time1 = new Date(olderBlockTime).toTimeString().slice(0,5)
                let time2  = new Date(olderBlockTime + 15 * 60 * 1000).toTimeString().slice(0,5)

                infoCount.transfersCount = transfersCount;
                infoCount.time = time1 + ' - ' + time2;

                infoValue.transfersValue = transfersValue / 10 ** 18;
                infoValue.time = time1 + ' - ' + time2;

                infoAverage.transfersAverage = (transfersAverage / 10 ** 18) / transfersCount;
                infoAverage.time = time1 + ' - ' + time2;

                olderBlockTime = block.timestamp * 1000;


                dataCount.push(infoCount)
                dataValue.push(infoValue)
                dataAverage.push(infoAverage)

                transfersAverage = 0;
                transfersValue = 0
                transfersCount = 0;
            } else {
                console.log("block", olderBlockTime, block.timestamp  * 1000, olderBlockTime + 15 * 60 * 1000)
            }
        })
        setTransfersPerPeriodChart(dataCount);
        setTransfersValueChart(dataValue);
        setTransfersAverageChart(dataAverage);
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
        setBlocksPerPeriodChart(data);

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
    
    const getTransactionsPerBlock = (numberLastBlocks) => {
        if(!blocks || blocks.length < 1)    return;
        let data = [];
        for(let i = blocks.length - numberLastBlocks; i < blocks.length; i++)
        {
            let info = {};
            if(blocks.length - i < 10){
                info.number = "0"+(blocks.length - i).toString();
            } else {
                info.number = (blocks.length - i).toString();
            }
            info.transCount = blocks[i].transactions.length;
            data.push(info);
        }
        setDataAreaChart(data);
    }

    const getTransactionInfoPerBlock = (numberLastBlocks) => {
        if(!blocks || blocks.length < 1)    return;
        let data = [];
        for(let i = blocks.length - numberLastBlocks; i < blocks.length; i++)
        {
            var info = {};
            if(blocks.length - i < 10){
                info.number = "0"+(blocks.length - i).toString();
            } else {
                info.number = (blocks.length - i).toString();
            }

            
            var sumValues = 0;
            
            blocks[i].transactions.map((transaction) => {
                sumValues =+ transaction.value * 1;
            })

            info.sumValues = sumValues / 10 ** 18;
            info.difficulty = (blocks[i].difficulty * 1)
            info.transCount = blocks[i].transactions.length;

            data.push(info);
        }
        console.log(data);
        setDataComposedChart(data);
    }



    return (
        <>
            <div className="py-5">
                <Navbar />

            </div>

            <div className="mx-auto p-10 flex items-center justify-center flex-col sm:flex-row flex-wrap gap-6 bg-[#f5f5f5]">
                <Chart type="line" data={dataGraphLine && dataGraphLine} title="Transactions mined"/>
                <Chart type="bar" data={blocksPerPeriodChart && blocksPerPeriodChart} title="Mined blocks"/>
                <Chart type="area" data={dataAreaChart && dataAreaChart} title="Transactions included in last mined blocks"/>
                <Chart type="linetransfers" data={transfersPerPeriodChart && transfersPerPeriodChart} title="Transfers made"/>
                <Chart type="bartransfersvalues" data={transfersValueChart && transfersValueChart} title="Amount total transfers"/>
                <Chart type="areaTransfersAverage" data={transfersAverageChart && transfersAverageChart} title="Average of amount per transfer"/>
                {/* <Chart type="composed" data={dataComposedChart && dataComposedChart} title="test chart"/> */}
            </div>
        </>
    )
}

export default Dashboard