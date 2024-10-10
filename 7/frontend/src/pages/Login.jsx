import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json()
      if(!data.success){
        toast.error(data.message)
      }
      localStorage.setItem("access_token", data.data.token)
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <div className="py-20">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <input
          type="text"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
