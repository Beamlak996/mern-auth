import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux"

export const Profile = () => {
  const { currentUser, loading } = useSelector((state: any)=> state.user)

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-full flex justify-center items-center">
          <div className="h-24 w-24 rounded-full bg-blue-300 flex items-center justify-center text-white self-center coursor-pointer">
            PP
          </div>
        </div>
        <input
          type="text"
          id="username"
          defaultValue={currentUser.username}
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="email"
          id="email"
          defaultValue={currentUser.email}
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 disabled:opacity-85 text-center flex items-center justify-center"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update"}
        </button>
      </form>
      <div className="flex justify-between items-center mt-4" >
        <span className="text-rose-700 cursor-pointer" >Delete Account</span>
        <span className="text-rose-700 cursor-pointer" >Sign Out</span>
      </div>
    </div>
  );
};
