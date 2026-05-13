import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleDemoLogin = (role) => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: role === "manager" ? "Sons" : "Sonss",
        role,
        teamId: role === "manager" ? null : "frontend",
      })
    );

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Mini Jira AWS
        </h1>

        <p className="text-gray-500 mb-8">
          Demo login for manager and employee views.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => handleDemoLogin("manager")}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700"
          >
            Login as Manager Sons
          </button>

          <button
            onClick={() => handleDemoLogin("employee")}
            className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-black"
          >
            Login as Employee Sonss
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;