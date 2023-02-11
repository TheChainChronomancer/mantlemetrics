import React, { useEffect } from 'react'

import { Loader, Heatmap } from './index'

import { LineChart, XAxis, YAxis, AreaChart, Area, ComposedChart, Rectangle, Label, ReferenceDot, ReferenceLine, Brush, CartesianGrid, Legend, Tooltip, Line, Customized, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'




const Chart = ({type, data}) => {
  

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

    const colors = [ '#0088FE', '#00C49F', '#FFBB28', '#FF8042' ];

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
        <div className="p-4 border-4 rounded-lg border-gray-200 shadow-lg sm:w-[35vw] sm:h-[20vw] w-[80vw] h-[40vh] text-[12px] flex">
            {(!data || data?.length < 1) && ( <Loader /> )}
            {type === "line" && data && data.length > 1 && (
                <ResponsiveContainer>
                    <LineChart data={data && data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" name="Number of transactions" stroke="#8884d8" />
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
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="number">
                                <Label value="Last 30 blocks transaction count" offset={0} position="insideBottom" />
                            </XAxis>
                            <YAxis allowDecimals={false}>
                                <Label value="Transaction count" angle={-90} position="center" />
                            </YAxis>
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey="transCount" name="Transaction in the last block" stroke="#82ca9d" fillOpacity={1} fill="url(#colorTransactions)" />
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
                    <Bar dataKey="countBlocks" name="Blocks count">
                    {
                        data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))
                    }
                    </Bar>
                </BarChart>
                </ResponsiveContainer>
            )}
            {type === "pie" && data && data.length > 1 && (
                <ResponsiveContainer>
                <PieChart>
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
            {type === "heatmap" && (
                <Heatmap />
            )}
        </div>
    )
}

export default Chart