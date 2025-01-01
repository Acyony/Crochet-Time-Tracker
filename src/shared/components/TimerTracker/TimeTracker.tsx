'use client';
import {useEffect, useState} from "react";

type Project = {
    id: number;
    name: string;
    hours: number;
};



export const TimeTracker = () => {
    const [isCounting, setIsCounting] = useState(false);
    const [time, setTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectName, setProjectName] = useState('');
    const [hasProjectName, setHasProjectName] = useState(false);
    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await fetch('/api/projects');
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        }

        fetchProjects();
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

    const handleStart = () => {
        setIsCounting(true);
    };

    const handleSubmit = async () => {
        if (!projectName.trim()) {
            alert("Project name is required!");
            return;
        }

        try {
            const newProject = {
                name: projectName,
                hours: 0, // Default hours as 0 initially
            };

            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProject),
            });

            if (!response.ok) {
                throw new Error('Failed to save the project');
            }

            const savedProject = await response.json();
            setProjects((prevProjects) => [...prevProjects, savedProject]);
            setProjectName(projectName);
            setHasProjectName(true); // Disable input and button
        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    const handleStop = async () => {

        setIsCounting(false);
        const sessionTime = time;
        setTotalTime((prevTotal) => prevTotal + sessionTime);
        setTime(0);

        try {
            const projectData = {
                name: projectName,
                hours: sessionTime / 3600, // Convert seconds to hours
            };

            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                throw new Error('Failed to save time to the database');
            }

            const newProject = await response.json();
            setProjects((prevProjects) => [...prevProjects, newProject]);
        } catch (error) {
            console.error('Error saving project time:', error);
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
            <div className="d-flex col-sm-12 gap-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Project Name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                />
                <button
                    type="button"
                    className="btn btn-primary ps-3"
                    onClick={handleSubmit}
                    disabled={!projectName.trim() || hasProjectName} // Disable button after submission
                >
                    Submit
                </button>
            </div>
            <div className="col-sm-12 mt-3">
                {projects.length > 0 && (
                    <span className="badge bg-info">
                 Project: {projects[projects.length - 1]?.name}
            </span>
                )}
            </div>
            <div className="col-sm-4 gy-3">
                <div className="card">
                    <div className="card-body">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleStart}
                            disabled={!hasProjectName}
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
