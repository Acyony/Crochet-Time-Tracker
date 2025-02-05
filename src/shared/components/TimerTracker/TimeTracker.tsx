'use client';
import {useEffect, useState} from "react";

export const TimeTracker = (props: { project: {
        id: number;
        name: string;
        time: number;
    }; }) => {
    const [isCounting, setIsCounting] = useState(false);
    const [time, setTime] = useState(0);
    const selectedProject = props.project;
    const [totalTime, setTotalTime] = useState(0);

    useEffect(() => {
        setTotalTime(selectedProject.time);
    }, [selectedProject.time]);

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

    const handleStop = async () => {
        setIsCounting(false);

        const sessionTime = time; // Time for this session
        const updatedTotalTime = totalTime + sessionTime;

        setTotalTime(updatedTotalTime); // Update local state
        setTime(0); // Reset the session time

        try {
            // Update the total time in the database
            const response = await fetch(`/api/projects/${[selectedProject?.id]}/save-time`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    additionalTime: sessionTime, // Increment time in seconds
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update project time');
            }

            const data = await response.json();
            console.log(updatedTotalTime);
            console.log('Updated total time in DB:', data.time); // Log the updated total time
        } catch (error) {
            console.error('Error updating project time:', error);
        }
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
            <div className="col-sm-12 mt-3 mb-4">
                <h5 className="card-title">
                    Project: {selectedProject?.name}
                </h5>
            </div>
            <div className="col-sm-4 gy-3">
                <div className="card">
                    <div className="card-body">
                        <button
                            type="button"
                            className="btn btn-primary button-start-time"
                            onClick={handleStart}
                        >
                            Start Timer
                        </button>
                        <p className="card-text mt-3">Time: {formatTime(time)} </p>
                    </div>
                </div>
            </div>
            <div className="col-sm-4 gy-3">
                <div className="card">
                    <div className="card-body">
                        <button
                            type="button"
                            className="btn btn-danger button-stop-time"
                            onClick={handleStop}
                        >
                            Stop Timer
                        </button>
                        <p className="card-text mt-3">Current Session Time: {formatTime(time)} </p>
                    </div>
                </div>
            </div>
            <div className="col-sm-4 gy-3">
                <div className="card h-100">
                    <div className="card-body d-flex flex-column justify-content-between">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            disabled
                        >
                            Total Time
                        </button>
                        <p className="card-text mt-3">Total Time Worked: {formatTime(totalTime)} </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TimeTracker;
