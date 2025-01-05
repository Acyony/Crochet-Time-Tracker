'use client';
import {useEffect, useState} from "react";

type Project = {
    id: number;
    name: string;
    time: number;
};


export const TimeTracker = (props: { projectId: number; }) => {
    const [isCounting, setIsCounting] = useState(false);
    const [time, setTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        async function fetchProject() {
            try {
                const response = await fetch('/api/projects/' + props.projectId);
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const data = await response.json();
                setSelectedProject(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        }

        fetchProject();
    }, []);


    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (isCounting) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isCounting]);

    // Load totalTime from localStorage on component mount
    useEffect(() => {
        const storedTotalTime = localStorage.getItem('totalTime');
        if (storedTotalTime) {
            setTotalTime(Number(storedTotalTime));
        }
    }, []);

// Save totalTime to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('totalTime', String(totalTime));
    }, [totalTime]);

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
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'update',
                    projectId: selectedProject?.id, // Ensure selected project ID
                    additionalTime: sessionTime, // Increment time in seconds
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update project time');
            }

            const data = await response.json();
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
            <div className="col-sm-12 mt-3">
                <span className="badge bg-info">
                 Project: {selectedProject?.name}
            </span>
            </div>
            <div className="col-sm-4 gy-3">
                <div className="card">
                    <div className="card-body">
                        <button
                            type="button"
                            className="btn btn-primary"
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
                            className="btn btn-danger"
                            onClick={handleStop}
                        >
                            Stop Timer
                        </button>
                        <p className="card-text mt-3">Current Session Time: {formatTime(time)} </p>
                    </div>
                </div>
            </div>
            <div className="col-sm-4 gy-3">
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">Total Time Worked: {formatTime(totalTime)} </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeTracker;
