import React, { useContext, createContext, useState, useEffect } from 'react';

import Web3 from 'web3';

const StateContext = createContext();

// const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc.testnet.mantle.xyz/'));
const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc.testnet.mantle.xyz/'));

export const StateContextProvider = ( {children} ) => {
    const [blocks, setBlocks] = useState([]);
    
    useEffect(() => {
        getBlocksFromTo();
    }, [])
    

    const getAllTransactions = async () => {
        try {
            let trans = [];
            
            const broxk = await web3.eth.getBlockNumber()
            for(let i = broxk - 30; i < broxk; i++){
                let info = {};
                const block = await web3.eth.getBlock(i)
                let hour = new Date(block.timestamp * 1000).getHours().toString();
                let minutes = new Date(block.timestamp * 1000).getMinutes().toString();
                let seconds = new Date(block.timestamp * 1000).getSeconds().toString();
                info.hour = hour + ":" + minutes + ":" + seconds; 
                info.count = block.trans.length;
                trans.push(info);
            }
            return trans;

        } catch (err) {
            console.log(err)
        }
    }

    const getBlocksFromTo = async () => {
        let totalBlocks = await web3.eth.getBlockNumber();
        let blockss = [];
        let transactions = [];
        let promises = [];
      
        for(let i = 0; i < 3; i++){
            promises.push(new Promise((resolve, reject) => {
            if(i > 0) totalBlocks -= 1000;
            web3.currentProvider.send({
              jsonrpc: "2.0",
              id: 1,
              method: "eth_getBlockRange",
              params: ["0x" + (totalBlocks-1000).toString(16), "0x" + totalBlocks.toString(16), true]
            }, (err, res) => {
              if (err) {
                reject(err);
              }
              res.result.map((trans) => {
                  blockss.push(trans)
                })
                resolve();
            });
          }));
        }

        await Promise.all(promises);
        blockss.sort((a, b) => (parseInt(a.timestamp,16) - parseInt(b.timestamp,16)))
        setBlocks(blockss);
    };
    




    return (
        <StateContext.Provider
            value={
                {
                    getAllTransactions,
                    getBlocksFromTo,
                    blocks,

                }
            }
        >
            {children}
        </StateContext.Provider>
    );
  }


export const useStateContext = () => useContext(StateContext);