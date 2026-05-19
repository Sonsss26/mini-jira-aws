import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { api, authHeaders } from "../lib/api";

function Projects() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);

  const profile = auth.user?.profile;
  const isManager = profile?.["custom:role"] === "manager";
  const headers = () => authHeaders(auth.user?.id_token);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchProjects();
  }, [auth.isAuthenticated]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/projects", headers());
      setProjects(data);
    } catch {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/projects", form, headers());
      toast.success("Project created");
      setForm({ name: "", description: "" });
      fetchProjects();
    } catch {
      toast.error("Failed to create project");
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await api.delete(`/api/projects/${projectId}`, headers());
      toast.success("Project deleted");
      fetchProjects();
    } catch {
      toast.error("Failed to delete project");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="p-6 max-w-screen-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Projects</h1>

        {isManager && (
          <form
            onSubmit={handleCreateProject}
            className="bg-white rounded-xl border border-gray-200 p-5 mb-6 flex gap-3 flex-wrap"
          >
            <input
              className="border rounded-lg px-3 py-2 text-sm flex-1 min-w-[180px]"
              placeholder="Project name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className="border rounded-lg px-3 py-2 text-sm flex-1 min-w-[180px]"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
            >
              Create
            </button>
          </form>
        )}

        {loading ? (
          <p className="text-gray-400 text-center py-12">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl border border-gray-200 p-5">
                <h2 className="font-semibold text-gray-900">{project.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                {isManager && (
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="mt-4 text-xs text-red-600 hover:bg-red-50 px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
            {projects.length === 0 && (
              <p className="text-gray-400 col-span-3 text-center py-12">No projects yet</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Projects;
