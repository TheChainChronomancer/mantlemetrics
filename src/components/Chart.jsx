import React, { useEffect } from 'react'

import { LineChart, XAxis, YAxis, ComposedChart, Rectangle, ReferenceArea, ReferenceDot, ReferenceLine, Brush, CartesianGrid, Legend, Tooltip, Line, Customized, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'



const Chart = ({type, data}) => {
  


    // const data = [
    //     {
    //       "day": "Page A",
    //       "uv": 4000,
    //       "pv": 2400,
    //       "count": 2400
    //     },
    //     {
    //       "day": "Page B",
    //       "uv": 3000,
    //       "pv": 1398,
    //       "count": 2210
    //     },
    //     {
    //       "day": "Page C",
    //       "uv": 2000,
    //       "pv": 9800,
    //       "count": 2290
    //     },
    //     {
    //       "day": "Page D",
    //       "uv": 2780,
    //       "pv": 3908,
    //       "count": 2000
    //     },
    //     {
    //       "day": "Page E",
    //       "uv": 1890,
    //       "pv": 4800,
    //       "count": 2181
    //     },
    //     {
    //       "day": "Page F",
    //       "uv": 2390,
    //       "pv": 3800,
    //       "count": 10
    //     },
    //     {
    //       "day": "Page G",
    //       "count": 2100
    //     }
    //   ]

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
    { day: 'Mon', hour: '1', value: 120 },
    { day: 'Mon', hour: '2', value: 80 },
    { day: 'Mon', hour: '3', value: 40 },
    { day: 'Tue', hour: '4', value: 70 },
    { day: 'Tue', hour: '5', value: 50 },
    { day: 'Tue', hour: '6', value: 90 },
    { day: 'Wed', hour: '7', value: 30 },
    { day: 'Wed', hour: '8', value: 60 },
    { day: 'Wed', hour: '9', value: 110 },
    ];

    return (
        <div className="p-4 border-4 rounded-lg border-gray-200 shadow-lg sm:w-[35vw] sm:h-[20vw] w-[80vw] h-[40vh]">
            {type === "line" && (
                <ResponsiveContainer>
                    <LineChart data={data && data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" name="Number of transactions" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            )}
            {type === "bar" && (
                <ResponsiveContainer>

                <BarChart data={data && data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey='hour' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                    <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
                </ResponsiveContainer>
            )}
            {type === "pie" && (
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
                <ResponsiveContainer>
                <ComposedChart data={datarec} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <XAxis dataKey="hour" />
                    <YAxis dataKey="day" />
                    <Tooltip />
                    <Legend />
                    
                    <Rectangle
                        name={datarec.value}
                        dataKey={datarec.value}
                        fill="#8884d8"
                        x={0}
                        y={0}
                        width={100}
                        height={100}
                    />
                </ComposedChart>
                </ResponsiveContainer>
            )}
        </div>
    )
}

export default Chart