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
    const [loading, setLoading] = useState<boolean>(true); // Add loading state
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setSelectedProject] = useState<Project | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProjects = async () => {
            const token = localStorage.getItem("token"); // Get the token
            if (!token) {
                setError("You are not authenticated!");
                setLoading(false); // Stop loading if unauthenticated
                router.push("/auth/login");
                return;
            }

            try {
                const response = await fetch("/api/projects", {
                    headers: {Authorization: `Bearer ${token}`},
                });

                if (!response.ok) {
                    router.push("/auth/login");
                }

                const data: Project[] = await response.json();
                setProjects(data); // Set projects to state
            } catch (err) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setError(err.message || "An unexpected error occurred!");
            } finally {
                setLoading(false); // Stop loading after fetching
            }
        };

        fetchProjects(); // Call the async function
    }, []);

    if (loading) {
        // Show loading animation while fetching data
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>; // Show error message if any
    }



    const handleProjectEditName = (projectId: number) => {
        const projectUrl = `/projects/${projectId}/edit`;
        router.push(projectUrl);
    };


    // Delete a project
    const deleteProject = async (projectId: number) => {

        const token = localStorage.getItem("token"); // Get the token
        if (!token) {
            setError("You are not authenticated!");
            setLoading(false); // Stop loading if unauthenticated
            router.push("/auth/login");
            return;
        }

        try {
            const response = await fetch(`/api/projects/${projectId}/delete-project`, {
                method: "DELETE",
                headers: {Authorization: `Bearer ${token}`},

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
                                className="list-group-item mt-2 mb-2 d-flex justify-content-between align-items-center project-name-li"
                                style={{cursor: "pointer"}}
                                onClick={() => handleProjectClick(project)}
                            >
                                {project.name}
                                <div className="d-flex gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-sm w-100 w-md-auto button-edit"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering the `handleProjectClick` event
                                            handleProjectEditName(project.id);
                                        }}
                                    >Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm w-100 w-md-auto button-delete"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering the `handleProjectClick` event
                                            if (window.confirm("Are you sure you want to delete this project?")) {
                                                deleteProject(project.id);
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
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
