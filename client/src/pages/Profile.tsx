import { CircleAlert, Loader2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "@/redux/user/userSlice";

export const Profile = () => {
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false)

  const { currentUser, loading, error } = useSelector((state: any) => state.user);
  const dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if(data.success === false) {
        dispatch(updateUserFailure(data.message))
        return
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error))
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json()
      if(data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess())
    } catch (error) {
      dispatch(deleteUserFailure(error))
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          defaultValue={currentUser.email}
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 disabled:opacity-85 text-center flex items-center justify-center"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update"}
        </button>
      </form>
      <div className="flex justify-between items-center mt-4">
        <span onClick={handleDelete} className="text-rose-700 cursor-pointer">Delete Account</span>
        <span className="text-rose-700 cursor-pointer">Sign Out</span>
      </div>
      {error && (
        <div className="mt-4 p-3 border-2 rounded-md border-rose-400 bg-rose-400 text-white flex gap-4 items-center">
          <CircleAlert className="h-4 w-4 mr-2" />
          Something went wrong
        </div>
      )}
      {updateSuccess && (
        <div className="mt-4 p-3 border-2 rounded-md border-emerald-400 bg-emerald-400 text-white flex gap-4 items-center">
          <CircleAlert className="h-4 w-4 mr-2" />
          User updated successfully
        </div>
      )}
    </div>
  );
};
