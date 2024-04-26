import { Link } from "react-router-dom";
import { useSelector } from "react-redux"

export const Header = () => {
  const { currentUser } = useSelector((state: any)=>state.user)

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">Auth App</h1>
        </Link>
        <ul className="flex gap-4 justify-center items-center">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <div className="h-7 w-7 rounded-full bg-blue-300 flex items-center justify-center text-white" >
                  PP
              </div>
            ) : (

            <li>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
};
