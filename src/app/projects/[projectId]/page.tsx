import 'bootstrap/dist/css/bootstrap.min.css';

import TimeTracker from "@/shared/components/TimerTracker/TimeTracker";
import NavbarComponent from "@/shared/components/Navbar/Navbar";
import FooterComponent from "@/shared/components/Footer/Footer";

export default async function Page({ params }: { params: { projectId: number } }) {
    const id = (await params).projectId;

    return (
        <>
            <div className="d-flex flex-column min-vh-100">
                <NavbarComponent />
                <main className="container my-5 flex-grow-1 text-center">
                    <div className="mt-3">
                        <TimeTracker projectId={id} />
                    </div>
                </main>
                <FooterComponent />
            </div>
        </>
    );
}
