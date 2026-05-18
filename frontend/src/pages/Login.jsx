import { useAuth } from "react-oidc-context";

function Login() {
  const auth = useAuth();

  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (auth.error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Error: {auth.error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Mini Jira AWS
        </h1>

        <p className="text-gray-500 mb-8">
          Sign in using AWS Cognito.
        </p>

        <button
          onClick={() => auth.signinRedirect()}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700"
        >
          Sign in with Cognito
        </button>
      </div>
    </div>
  );
}

export default Login;