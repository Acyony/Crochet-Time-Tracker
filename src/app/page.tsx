import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./page.module.css";
import TimeTracker from "@/shared/components/TimerTracker/TimeTracker";
import FooterComponent from "@/shared/components/Footer/Footer";
import NavbarComponent from "@/shared/components/Navbar/Navbar";

export default function Home() {
    return (
        <div className={styles.page}>
            <NavbarComponent/>
            <main >
                <h1>Time Tracker</h1>
                <TimeTracker/>
            </main>
            <FooterComponent/>
        </div>
    );
}
