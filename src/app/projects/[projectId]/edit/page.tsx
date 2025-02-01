'use client';

import {useParams, useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import NavbarComponent from "@/shared/components/Navbar/Navbar";
import FooterComponent from "@/shared/components/Footer/Footer";

export default function Page() {
    const router = useRouter();
    const params = useParams<{ projectId: string }>()
    const [loading, setLoading] = useState<boolean>(true); // Add loading state
    const [error, setError] = useState<string | null>(null);

    const [project, setProject] = useState<{
        id: number;
        name: string;
        time: number;
    }>({id: 0, name: "", time: 0});

    const [projectName, setProjectName] = useState("");

    useEffect(() => {
        const fetchProject = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/auth/login");
                return;
            }

            try {
                const response = await fetch(`/api/projects/${params.projectId}`, {
                    headers: {Authorization: `Bearer ${token}`},
                });

                if (response.status === 403) {
                    router.push("/home");
                } else if (!response.ok) {
                    throw new Error("Error validating project");
                }

                const projectResponse = await response.json();
                setProject(projectResponse)
                setProjectName(projectResponse.name)
            } catch (err) {
                console.error(err);
                router.push("/home");
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [params.projectId, router, setProject, setProjectName]);


    // Update a project name
    const updateProjectName = async (projectId: number, newName: string) => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("You are not authenticated!");
            setLoading(false);
            router.push("/auth/login");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`/api/projects/${projectId}/update-project-name`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({newProjectName: newName})
            });

            if (!response.ok) {
                throw new Error("Failed to update project name");
            }

            router.push(`/projects/${projectId}`);
        } catch (error) {
            console.error("Error updating project name:", error);
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return <div>{error}</div>; // Show error message if any
    }


    return loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    ) : (
        <div className="d-flex flex-column min-vh-100">
            <NavbarComponent/>
            <main className="container my-5 flex-grow-1 text-center">
                <div className="mb-4">
                    <label htmlFor="basic-url" className="form-label text-start">Add a new project name</label>
                    <div className="d-flex align-items-center gap-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Project Name"
                            value={projectName}
                            onChange={(event) => setProjectName(event.target.value)}
                        />
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => updateProjectName(project.id, projectName)}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </main>
            <FooterComponent/>
        </div>
    );

}
