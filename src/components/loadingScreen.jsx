import React from 'react';
import {MoonLoader} from "react-spinners";

const LoadingScreen = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-900 text-white">

            <MoonLoader
                color="#5f36d6"
                cssOverride={{}}
                loading
                size={120}
                speedMultiplier={0.5}
            />

        </div>
    );
};

export default LoadingScreen;