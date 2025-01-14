'use client';

import 'bootstrap/dist/css/bootstrap.min.css';

import TimeTracker from "@/shared/components/TimerTracker/TimeTracker";
import NavbarComponent from "@/shared/components/Navbar/Navbar";
import FooterComponent from "@/shared/components/Footer/Footer";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useParams} from 'next/navigation'

export default function Page() {
    const router = useRouter();
    const params = useParams<{ projectId: string }>()
    const [project, setProject] = useState<{
        id: number;
        name: string;
        time: number;
    }>({id: 0, name: "", time: 0});

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

                setProject(await response.json())
            } catch (err) {
                console.error(err);
                router.push("/home");
            }
        };

        fetchProject();
    }, [params.projectId, router, setProject]);

    return (
        <>
            <div className="d-flex flex-column min-vh-100">
                <NavbarComponent/>
                <main className="container my-5 flex-grow-1 text-center">
                    <div className="mt-3">
                        <TimeTracker project={project}/>
                    </div>
                </main>
                <FooterComponent/>
            </div>
        </>
    );
}
