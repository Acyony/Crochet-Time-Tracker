'use client';

import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import NavbarComponent from "@/shared/components/Navbar/Navbar";
import FooterComponent from "@/shared/components/Footer/Footer"; // Correct import for the App Router

interface Project {
    id: number;
    name: string;
    time: number;
}

const ProjectList = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [error, setError] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setSelectedProject] = useState<Project | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProjects = async () => {
            const token = localStorage.getItem("token"); // Get the token
            if (!token) {
                setError("You are not authenticated!");
                return;
            }

            try {
                const response = await fetch("/api/projects", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch projects!");
                }

                const data: Project[] = await response.json();
                setProjects(data); // Set projects to state
            } catch (err) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setError(err.message || "An unexpected error occurred!");
            }
        };

        fetchProjects(); // Call the async function
    }, []);

    if (error) {
        return <div>{error}</div>; // Show error message if any
    }

        // Delete a project
        const deleteProject = async (projectId: number) => {
            try {
                const response = await fetch(`/api/projects/${projectId}/delete-project`, {
                    method: "DELETE",
                });
                if (!response.ok) {
                    throw new Error("Failed to delete project");
                }
                // Update the state to remove the deleted project
                setProjects((prevProjects) =>
                    prevProjects.filter((project) => project.id !== projectId)
                );
            } catch (error) {
                console.error("Error deleting project:", error);
            }
        };

        // Handle project click
        const handleProjectClick = (project: Project) => {
            setSelectedProject(project);
            const projectUrl = `/projects/${project.id}`; // Construct the correct route
            console.log("Navigating to:", projectUrl); // Debug to confirm the route
            router.push(projectUrl); // Navigate to the project page
        };

        // Fetch projects on component mount
    /*    useEffect(() => {
            fetchProjects();
        }, []);*/

        return (
            <>
                <NavbarComponent/>
                <main className="container my-5 flex-grow-1 ">
                    <div className="container">
                        <div className="d-flex justify-content-center align-items-center  mt-xl-5 mb-xl-5">
                            <div>
                                <h1>All Projects</h1>
                                <p>Look how many great projects you did ==^.^==!</p>
                            </div>
                        </div>

                        <ul className="list-group mt-5 ">
                            {projects.map((project) => (
                                <li
                                    key={project.id}
                                    className="list-group-item mt-2 d-flex justify-content-between align-items-center"
                                    style={{cursor: "pointer"}}
                                    onClick={() => handleProjectClick(project)}
                                >
                                    {project.name}
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering the `handleProjectClick` event
                                            deleteProject(project.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>


                    </div>
                </main>
                <FooterComponent/>
            </>
        );
    };

    export default ProjectList;
