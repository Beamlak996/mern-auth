import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

export const PrivateRoute = () => {
    const {currentUser} = useSelector((state: any) => state.user)

    return currentUser ? <Outlet /> : <Navigate to="/sign-in" />
}