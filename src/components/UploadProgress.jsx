import React, { useState, useEffect } from 'react';
import { CircularLoader, GreyCheckMark, BlueCheckMark } from './CircularLoader/CircularLoader';

export const UploadProgress = (props) => {

    const getIcon = (i) => {
        console.log("active section" + props.activeSection)
        if (i < props.activeSection) {
            return <BlueCheckMark></BlueCheckMark>
        } else if (i == props.activeSection) {
            return <CircularLoader></CircularLoader>
        }
        else {
            return <GreyCheckMark></GreyCheckMark>
        }
    }

    return (

        <div className="flex flex-col p-6 gap-6 bg-white">
            <div className="font-bold text-3xl mb-2 text-[#040405]">Follow Steps</div>
            <div className="flex flex-row">
                <div className="flex justify-center items-center">{getIcon(0)}</div>
                <div className="flex flex-col">
                    <span className="font-bold text-xl text-[#040405]">Upload Art</span>
                    <p className="text-[#6e6e6e]">Uploading of Cover Art To IPFS</p>
                </div>

            </div>
            <div className="flex flex-row">
                <div className="flex justify-center items-center">{getIcon(1)}</div>
                <div className="flex flex-col">
                    <span className="font-bold text-xl text-[#040405]">Upload Track</span>
                    <p className="text-[#6e6e6e]">Uploading of Track To IPFS</p>
                </div>

            </div>
            <div className="flex flex-row">
                <div className="flex justify-center items-center">{getIcon(2)}</div>


                <div className="flex flex-col">
                    <span className="font-bold text-xl text-[#040405]">Mint</span>
                    <p className="text-[#6e6e6e]">Send transaction to create your NFT</p>
                </div>

            </div>
            <div className="flex flex-row">
                <div className="flex justify-center items-cente">{getIcon(3)}</div>
                <div className="flex flex-col">
                    <span className="font-bold text-xl text-[#040405]">Put On Sale</span>
                    <p className="text-[#6e6e6e]">Sign message to set fixed price</p>
                </div>

            </div>
        </div>
    )
};

// https://bafybeiciu7fpruozdjusjtha63dyjpfb2jtnvjragyic36a2dkvpnqbpva.ipfs.infura-ipfs.io/Wiz_Khalifa.See_you_Again.jpg