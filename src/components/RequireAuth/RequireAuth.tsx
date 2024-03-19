import {useSelector} from "react-redux";
import {selectCurrentToken} from "../../features/auth/authSlice";
import {Navigate, useLocation} from "react-router-dom";

const RequireAuth = ({children}: any) => {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();

    return (
        token ? children : <Navigate to='/signin' state={{from: location}} replace/>
    );
};

export default RequireAuth;