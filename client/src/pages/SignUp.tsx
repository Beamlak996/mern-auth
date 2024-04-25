import { Link } from "react-router-dom";

export const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 disabled:opacity-85">
          Sign up
        </button>
      </form>
      <div className="flex gap-4 mt-2">
        <p>Already have an account</p>
        <Link to="/sign-in">
          <span className="text-blue-500 text-sm hover:underline">Sign in</span>
        </Link>
      </div>
    </div>
  );
};
