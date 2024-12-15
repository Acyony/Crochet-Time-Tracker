'use client';
import { useEffect, useState } from "react";

export const TimeTracker = () => {
    const [isCounting, setIsCounting] = useState(false);
    const [time, setTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (isCounting) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isCounting]);

    const handleStart = () => {
        setIsCounting(true);
    };

    const handleStop = () => {
        setIsCounting(false);
        setTotalTime((prevTotal) => prevTotal + time);
        setTime(0);
    };

    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="row">
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-body">
                        <button type="button" className="btn btn-primary" onClick={handleStart}>
                            Start Timer
                        </button>
                        <p>Time: {formatTime(time)} </p>
                    </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-body">
                        <button type="button" className="btn btn-danger" onClick={handleStop}>
                            Stop Timer
                        </button>
                        <p>Current Session Time: {formatTime(time)} </p>
                    </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-body">
                        <p>Total Time Worked: {formatTime(totalTime)} </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeTracker;
