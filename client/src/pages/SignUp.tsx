import { Loader2, CircleAlert } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false)
    try {
      setLoading(true)
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if(data.success === false) {
        setError(true)
        return 
      }
      setError(false)
    } catch (error) {
      setLoading(true)
      setError(true)
    } finally {
      setLoading(false)
    }
    
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 disabled:opacity-85 text-center flex items-center justify-center"
        >
          {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Sign up"
          )}
        </button>
      </form>
      <div className="flex gap-4 mt-2">
        <p>Already have an account</p>
        <Link to="/sign-in">
          <span className="text-blue-500 text-sm hover:underline">Sign in</span>
        </Link>
      </div>
      {error && (
        <div className="p-3 border-2 rounded-md border-rose-400 bg-rose-400 text-white flex gap-4 items-center">
          <CircleAlert className="h-4 w-4 mr-2" />
          Something went wrong
        </div>
      )}
    </div>
  );
};
