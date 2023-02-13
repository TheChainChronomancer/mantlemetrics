import React, { useEffect } from 'react'

import { Loader } from './index'

import { LineChart, XAxis, YAxis, AreaChart, Area, ComposedChart, Label, Brush, CartesianGrid, Legend, Tooltip, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'




const Chart = ({type, data, title}) => {
  

    const dataTest = [
        {number: 1, transCount: 30},
        {number: 2, transCount: 8},
        {number: 3, transCount: 3},
        {number: 4, transCount: 6},
        {number: 18, transCount: 5},
        {number: 19, transCount: 10},
        {number: 20, transCount: 10},
        {number: 21, transCount: 10},
        {number: 22, transCount: 10},
        {number: 23, transCount: 10},
        {number: 24, transCount: 10},
        {number: 25, transCount: 10},
        {number: 26, transCount: 10},
        {number: 27, transCount: 10},
        {number: 28, transCount: 10},
        {number: 29, transCount: 10},
        {number: 30, transCount: 10},
    ]

    const colors = [ '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#19F83E', '#AC2C98', '#FCBA4B', '#403A3A', '#955F20', '#0E294B', '#D53032', '#A03472', '#955F20', '#2E3A23', '#45322E', '#8A9597' ];

    const data01 = [
        {
          "name": "Group A",
          "value": 400
        },
        {
          "name": "Group B",
          "value": 300
        },
        {
          "name": "Group C",
          "value": 300
        },
        {
          "name": "Group D",
          "value": 200
        },
        {
          "name": "Group E",
          "value": 278
        },
        {
          "name": "Group F",
          "value": 189
        }
      ];

    const datarec = [
        { x: 1, y: 1, value: 10 },
        { x: 1, y: 2, value: 5 },
        { x: 2, y: 1, value: 15 },
        { x: 2, y: 2, value: 8 },
        { x: 3, y: 1, value: 20 },
        { x: 3, y: 2, value: 12 },
    ];


    return (
        <div className="flex flex-col items-center">
        <h2 className="p-3 font-semibold bg-[#cad6eb] drop-shadow-md sm:w-[35vw] w-[80vw] text-center rounded-t-lg ">{title}</h2>
        <div className="p-4 rounded-b-lg bg-white hover:drop-shadow-xl drop-shadow-md sm:w-[35vw] sm:h-[20vw] w-[80vw] h-[40vh] text-[12px] flex">
            {(!data || data?.length < 1) && ( <Loader /> )}
            {type === "line" && data && data.length > 1 && (
                <ResponsiveContainer>
                    <LineChart data={data && data}>
                        <CartesianGrid strokeDasharray="1 1" />
                        <XAxis dataKey="hour">
                        </XAxis>
                        <YAxis>
                        </YAxis>
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" legendType='plainline' dataKey="count" name="Number of transactions" stroke="#8884d8" />
                        <Brush  dataKey="hour" height={20} />
                    </LineChart>
                </ResponsiveContainer>
            )}
            {type === "area" && data && data.length > 1 && (
                <ResponsiveContainer>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="10%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                <stop offset="100%" stopColor="#82ca9d" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                            <CartesianGrid strokeDasharray="1 1" />
                            <XAxis dataKey="number">
                            </XAxis>
                            <YAxis allowDecimals={false}>
                            </YAxis>
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" legendType="plainline" dataKey="transCount" name="Transaction in the last block" stroke="#82ca9d" fillOpacity={1} fill="url(#colorTransactions)" />
                            <Brush  dataKey="number" height={20} />
                    </AreaChart>
                </ResponsiveContainer>
            )}
            {type === "bar" && data && data.length > 1 && (
                <ResponsiveContainer>

                <BarChart data={data && data} >
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey='time'>
                    </XAxis>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="countBlocks" name="Blocks count" legendType='plainline'>
                    {
                        data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))
                    }
                    </Bar>
                    <Brush  dataKey="time" height={20} />
                </BarChart>
                </ResponsiveContainer>
            )}
            {type === "bartransfersvalues" && data && data.length > 1 && (
                <ResponsiveContainer>

                <BarChart data={data && data} >

                    <defs>
                            <linearGradient id="colorValueBar" x1="0" y1="1" x2="0" y2="0">
                                <stop offset="40%" stopColor="#ffa500" stopOpacity={0.4}/>
                                <stop offset="100%" stopColor="#ffa500" stopOpacity={1.0}/>
                            </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey='time'>
                    </XAxis>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar type="linear" legendType="rect" dataKey="transfersValue" name="Transfers value" stroke="#ffa500" fillOpacity={1} fill="url(#colorValueBar)">
                    </Bar>
                    <Brush  dataKey="time" height={20} />
                </BarChart>
                </ResponsiveContainer>
            )}
            {type === "areaTransfersAverage" && data && data.length > 1 && (
                <ResponsiveContainer>

                <AreaChart data={data && data} >

                    <defs>
                            <linearGradient id="colorAverageBar" x1="0" y1="1" x2="0" y2="0">
                                <stop offset="40%" stopColor="#ed3419" stopOpacity={0.4}/>
                                <stop offset="100%" stopColor="#ed3419" stopOpacity={1.0}/>
                            </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey='time'>
                    </XAxis>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" legendType="rect" dataKey="transfersAverage" name="Average value/transaction" stroke="#ed3419" fillOpacity={1} fill="url(#colorAverageBar)">
                    </Area>
                    <Brush  dataKey="time" height={20} />
                </AreaChart>
                </ResponsiveContainer>
            )}
            {type === "linetransfers" && data && data.length > 1 && (

                <ResponsiveContainer>
                <LineChart data={data && data} >
                    <defs>
                            <linearGradient id="colorTransactionsLine" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="10%" stopColor="#82ca9d" stopOpacity={1.0}/>
                                <stop offset="100%" stopColor="#82ca9d" stopOpacity={0.4}/>
                            </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey='time'>
                    </XAxis>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="linear" legendType="plainline" dataKey="transfersCount" name="Transfers count" stroke="#82ca9d" fillOpacity={1} fill="url(#colorTransactionsLine)">
                    </Line>
                    <Brush  dataKey="time" height={20} />
                </LineChart>
                </ResponsiveContainer>

            )}
            {type === "pie" && (
                <ResponsiveContainer>
                <PieChart>
                    <Tooltip />
                    <Legend />
                    <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={100} fill="#82ca9d" label>
                    {
                        data01.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))
                    }
                    </Pie>
                </PieChart>

                </ResponsiveContainer>
            )}
            {type === "composed" && data?.length > 1 && (
                <ResponsiveContainer>
                    <ComposedChart data={data}>
                        <XAxis dataKey="number" />
                        <YAxis allowDecimals={false}/>
                        <Tooltip />
                        <Legend />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Bar dataKey="difficulty" name="Block difficulty" fill="#820263" />
                        <Line type="monotone" legendType ="plainline" name="Total value transferred" dataKey="sumValues" fill="#fb8b24" stroke="#fb8b24" />
                        <Line type="monotone" legendType="rect" name="Transactions included" dataKey="transCount" fill="#05f4ad" stroke="#05f4ad" />
                        <Brush  dataKey="number" height={20} startIndex={10} endIndex={1} />
                    </ComposedChart>
                    <Brush  dataKey="number" height={20} />
                </ResponsiveContainer>
            )
            }
        </div>

        </div>
    )
}

export default Chart