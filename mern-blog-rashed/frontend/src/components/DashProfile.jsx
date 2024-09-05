import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

export default function DashProfile() {
  const user = localStorage.getItem("user")?.split(",");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:5000/api/user/${user[0]}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setCurrentUser(data.data.user)
    })();
}, [user[2], user[1]]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }

    try {
        setLoading(true)
        setError(false)
      const res = await fetch(`http://localhost:5000/api/user/${user[0]}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setUpdateUserError(data.message);
        setError(data.message)
        setLoading(false)
      } else {
        setLoading(false)
        setError(null)
        const { user } = data.data;
        localStorage.setItem("user", [
          user._id,
          user.email,
          user.userName,
          user.role,
        ]);
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      setError(null)
      setLoading(true)
      const res = await fetch(
        `http://localhost:5000/api/user/${user[0]}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.message)
        setLoading(false)
      } else {
        setCurrentUser(null)
        setLoading(false)
        localStorage.clear()
        navigate('/sign-in')
        setUpdateUserSuccess(data)
      }
    } catch (error) {
      setError(error.message)
    }
  };

  const handleSignout = () => {
    try {
      localStorage.clear();
      navigate("/sign-in");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput
          type="text"
          id="fullName"
          placeholder="Full name"
            defaultValue={currentUser?.fullName}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="userName"
          placeholder="username"
            defaultValue={currentUser?.userName}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
            defaultValue={currentUser?.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button type="submit" color={"dark"} disabled={loading}>
          {loading ? "Loading..." : "Update"}
        </Button>
        {[user[3]].role == "admin" && (
          <Link to={"/create-post"}>
            <Button type="button" className="w-full">
              Create a post
            </Button>
          </Link>
        )}
      </form>

      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
          Delete Account
        </span>
        <span onClick={handleSignout} className="cursor-pointer">
          Sign Out
        </span>
      </div>

      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
