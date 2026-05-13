import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const fetchProjects = async () => {
    const response = await axios.get("http://localhost:5000/api/projects");
    setProjects(response.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/projects", form);

    setForm({
      name: "",
      description: "",
    });

    fetchProjects();
  };

  const handleDeleteProject = async (projectId) => {
    const confirmed = window.confirm("Delete this project?");
    if (!confirmed) return;

    await axios.delete(`http://localhost:5000/api/projects/${projectId}`);
    fetchProjects();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Projects
        </h1>

        <form
          onSubmit={handleCreateProject}
          className="bg-white rounded-xl shadow p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input
            className="border rounded-lg px-3 py-2"
            placeholder="Project name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <input
            className="border rounded-lg px-3 py-2"
            placeholder="Project description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg px-4 py-2"
          >
            Create Project
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow p-5">
              <h2 className="text-lg font-semibold text-gray-900">
                {project.name}
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                {project.description}
              </p>

              <button
                onClick={() => handleDeleteProject(project.id)}
                className="mt-4 text-xs bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded"
              >
                Delete Project
              </button>
            </div>
          ))}

          {projects.length === 0 && (
            <div className="text-gray-400 bg-white rounded-xl shadow p-6">
              No projects yet
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Projects;