"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";

type Project = {
    id: number;
    name: string;
    time: number;
};

export const SearchProject = () => {
    const [projectName, setProjectName] = useState("");
    const [projects, setProjects] = useState<Project[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Fetch projects by name
    const searchProjects = async (name: string) => {
        const token = localStorage.getItem("token"); // Get the token
        if (!token) {
            setError("You are not authenticated!");
            setIsLoading(false); // Stop loading if unauthenticated
            return;
        }
        if (!name.trim()) {
            setError("Please enter a valid project name.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/projects/search-project?name=${encodeURIComponent(name)}`, {
                headers: {Authorization: `Bearer ${token}`},
            });

            if (!response.ok) {
                throw new Error("Failed to fetch projects");
            }

            const data: Project[] = await response.json();
            setProjects(data);

            if (data.length === 0) {
                setError("No projects found.");
            }
        } catch (error) {
            console.error("Error searching projects:", error);
            setError("An error occurred while searching for projects.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleProjectClick = (project: Project) => {
        const projectUrl = `/projects/${project.id}`;
        router.push(projectUrl);
    };

    return (
        <div className="mt-xl-5 mb-3">
            <label htmlFor="basic-url" className="form-label text-start">Search for existing project</label>
            <div className="d-flex align-items-center gap-2">
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
                        onClick={() => searchProjects(projectName)}
                        disabled={isLoading}
                    >
                        {isLoading ? "Searching..." : "Search"}
                    </button>
                </div>

                {error && (
                    <div className="alert alert-danger mt-3" role="alert">
                        {error}
                    </div>
                )}

                {projects.length > 0 && (
                    <ul className="list-group mt-5">
                        {projects.map((project) => (
                            <li
                                key={project.id}
                                className="list-group-item mt-2 d-flex justify-content-between align-items-center"
                                style={{cursor: "pointer"}}
                                onClick={() => handleProjectClick(project)}
                            >
                                {project.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
    );
};

export default SearchProject;
