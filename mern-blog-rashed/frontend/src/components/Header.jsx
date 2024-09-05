import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const path = useLocation().pathname;
  const navigate = useNavigate();

  const user = localStorage.getItem("user")?.split(",");
  const token = localStorage.getItem("token");

  const handleSignout = async () => {
    try {
      localStorage.clear();
      navigate("/sign-in");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r bg-gray-400 rounded-lg text-white mr-1">
          Daily
        </span>
        Blog
      </Link>

      <div className="flex gap-2 md:order-2">
        {token ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user" rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">@{user[2]}</span>
              <span className="block text-sm font-medium truncate">
                {user[1]}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button color={"dark"} outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Blogs</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
