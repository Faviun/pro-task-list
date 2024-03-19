import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setCredentials} from "../../features/auth/authSlice";
import useUserPass from "./hooks/useUserPass";

const SignInPage = () => {
    const navigate = useNavigate();
    const {
        userRef,
        errRef,
        user,
        setUser,
        pass,
        setPass,
        errMsg,
        setErrMsg,
        login,
        isLoading
    } = useUserPass(navigate);
    const dispatch = useDispatch();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const userData = await login({username: user, password: pass}).unwrap();
            dispatch(setCredentials({...userData, user}));
            setUser('');
            setPass('');
            navigate('/taskslist')
        } catch (err: any) {

            if (!err?.response) {
                setErrMsg('No server response')
            } else if (err?.response.status === 400) {
                setErrMsg('Missing username or password')
            } else if (err?.response.status === 401) {
                setErrMsg('Unauthorized')
            } else {
                setErrMsg('Login failed')
            }
            // @ts-ignore
            // errRef.current.focus();
        }
    }

    const handleUserInput = (e: any) => setUser(e.target.value)
    const handlePassInput = (e: any) => setPass(e.target.value)
    return (
        <main>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className="text-[40px] uppercase text-center">Tasks List</h1>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in
                        to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Enter
                                username</label>
                            <div className="mt-2">
                                <input
                                    onChange={handleUserInput}
                                    value={user}
                                    ref={userRef}
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password"
                                       className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <input
                                    value={pass}
                                    onChange={handlePassInput}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                                in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default SignInPage;