'use client';


import {useState} from "react";
import {useRouter} from "next/navigation";

export const AuthComponent = ({register}: {register: boolean}) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const router = useRouter();

    const handleAuthentication = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if (!userEmail.trim() || !userPassword.trim()) {
            alert("Both email and password are required!");
            return;
        }

        const endpoint = register ? '/api/auth/register' : '/api/auth/login';
        setIsLoading(true);
        setIsButtonDisabled(true);

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email: userEmail, password: userPassword }),
            });

            if (!response.ok) {
                throw new Error(`Failed to ${register ? "register" : "login"}! Please try again.`);
            }

            const data = await response.json();

            if (data.message) {
                alert(`${register ? "Registration" : "Login"} successful!`);
            }

            if (register) {
                // Redirect to login page after successful registration
                router.push('/auth/login');
            } else {
                localStorage.setItem("token", data.token);

                // Redirect to /home after successful login
                router.push('/home');
            }

        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            alert(error.message);
        } finally {
            setIsLoading(false);
            setIsButtonDisabled(false);
        }
    }

    const handleToggleAuthMode = () => {
        // Redirect based on the current mode
        if (register) {
            router.push('/auth/login'); // Navigate to login page
        } else {
            router.push('/auth/register'); // Navigate to registration page
        }
    };


    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light mb-3">
            <div className="container p-4 shadow bg-white rounded">
                <form
                    onSubmit={handleAuthentication}
                    className="row g-3 text-center w-70 shadow p-4 bg-white rounded"
                    aria-labelledby="form-title"
                >
                    <h1 className="mb-4">{register ? "Register" : "Welcome!"}</h1>
                    <h3 className="mb-4">{register ? "Create an account" : "Please LogIn to start!"}</h3>
                    <div className="col-12 d-flex flex-column align-items-start mb-3">
                        <label htmlFor="emailInput" className="form-label mb-2">
                            Email address:
                        </label>
                        <input
                            type="email"
                            className="form-control w-100"
                            id="emailInput"
                            placeholder="name@example.com"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            required
                            aria-required="true"
                        />
                    </div>
                    <div className="col-12 d-flex flex-column align-items-start mb-3">
                        <label htmlFor="passwordInput" className="form-label mb-2">
                            Password:
                        </label>
                        <input
                            type="password"
                            className="form-control w-100"
                            id="passwordInput"
                            placeholder="Password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            required
                            aria-required="true"
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary button-submit" disabled={isButtonDisabled}>
                            {isLoading ? "Loading..." : (register ? "Register" : "Login")}
                        </button>
                    </div>
                    <div className="col-12 mt-3">
                        <button
                            type="button"
                            className="btn btn-link"
                            onClick={handleToggleAuthMode} // Added redirection handler
                            disabled={isLoading}
                        >
                            {register
                                ? "Already have an account? Log in"
                                : "Don't have an account? Register"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AuthComponent
