'use client';

import { useState } from "react";


type Project = {
    id: number;
    name: string;
    time: number;
};


export const SearchProject = () => {
    const [projectName, setProjectName] = useState('');
    const [projects, setProjects] = useState<Project | null>(null);

    const handleSubmit = async () => {
        if (!projectName.trim()) {
            alert("Project name is required!");
            return;
        }

        try {
            // Search for an existing project
            const response = await fetch(`/api/projects?name=${encodeURIComponent(projectName)}`);
            if (!response.ok) {
                throw new Error('Error searching for project');
            }

            const foundProject = await response.json();

            if (foundProject) {
                setProjects(foundProject); // Update state with the found project
                alert(`Project "${projectName}" found!`);
            } else {
                setProjects(null); // Clear previous results if no project found
                alert(`No project found with the name "${projectName}".`);
            }
        } catch (error) {
            console.error('Error searching for project:', error);
            alert('An error occurred while searching for the project.');
        }
    };

    return (
        <div className="d-flex flex-column col-sm-12 gap-3">
            <div className="d-flex gap-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Project Name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                />
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                >
                    Search
                </button>
            </div>
            {projects && (
                <div className="mt-3">
                    <h4>Project Details:</h4>
                    <p><strong>Name:</strong> {projects.name}</p>
                    <p><strong>Hours:</strong> {projects.time}</p>
                </div>
            )}
        </div>
    );
};

export default SearchProject;
