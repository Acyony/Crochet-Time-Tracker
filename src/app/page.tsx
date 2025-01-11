import 'bootstrap/dist/css/bootstrap.min.css';
import FooterComponent from "@/shared/components/Footer/Footer";
import UserAuthentication from "@/shared/components/Home/UserAuthentication";
import NavbarLogInComponent from "@/shared/components/Navbar/NavbarLogIn";

export default function Home() {
    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Navbar */}
            <NavbarLogInComponent/>
            {/*<main>*/}
            <div className="mt-3">
                <UserAuthentication register={true}/>
            </div>
            {/*</main>*/}
            {/* Footer */}
            <FooterComponent/>
        </div>
    );
}
