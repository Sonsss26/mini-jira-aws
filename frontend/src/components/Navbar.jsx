import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-8">
      <Link to="/dashboard" className="text-xl font-bold text-blue-600">
        Mini Jira AWS
      </Link>

      <div className="flex gap-4 text-sm">
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
          Dashboard
        </Link>

        <Link to="/projects" className="text-gray-700 hover:text-blue-600">
          Projects
        </Link>

        <Link to="/login" className="text-gray-700 hover:text-blue-600">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Navbar;