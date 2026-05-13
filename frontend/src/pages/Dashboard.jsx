import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    deadline: "",
    teamId: "frontend",
    assigneeId: "sara",
    assigneeName: "Sara",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/tasks?role=${user.role}&teamId=${user.teamId}`
    );

    setTasks(response.data);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/tasks", form);

    setForm({
      title: "",
      description: "",
      priority: "Medium",
      deadline: "",
      teamId: "frontend",
      assigneeId: "sara",
      assigneeName: "Sara",
    });

    fetchTasks();
  };

  const handleDeleteTask = async (taskId) => {
    const confirmed = window.confirm("Delete this task?");

    if (!confirmed) return;

    await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);

    fetchTasks();
  };

  const handleUpdateStatus = async (taskId, status) => {
    await axios.patch(`http://localhost:5000/api/tasks/${taskId}/status`, {
      status,
    });

    fetchTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const columns = ["To Do", "In Progress", "In Review", "Done"];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard
            </h1>

            <p className="text-gray-500">
              Welcome, {user.name} — {user.role}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        {user.role === "manager" && (
          <form
            onSubmit={handleCreateTask}
            className="bg-white rounded-xl shadow p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <input
              className="border rounded-lg px-3 py-2"
              placeholder="Task title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              required
            />

            <input
              className="border rounded-lg px-3 py-2"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />

            <select
              className="border rounded-lg px-3 py-2"
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <input
              type="date"
              className="border rounded-lg px-3 py-2"
              value={form.deadline}
              onChange={(e) =>
                setForm({ ...form, deadline: e.target.value })
              }
              required
            />

            <select
              className="border rounded-lg px-3 py-2"
              value={form.teamId}
              onChange={(e) => {
                const teamId = e.target.value;

                setForm({
                  ...form,
                  teamId,
                  assigneeId: teamId === "frontend" ? "sara" : "omar",
                  assigneeName: teamId === "frontend" ? "Sara" : "Omar",
                });
              }}
            >
              <option value="frontend">Frontend Team</option>
              <option value="backend">Backend Team</option>
            </select>

            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-4 py-2"
            >
              Create Task
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {columns.map((column) => {
            const filteredTasks = tasks.filter(
              (task) => task.status === column
            );

            return (
              <div
                key={column}
                className="bg-white rounded-xl shadow p-4"
              >
                <h2 className="font-semibold text-gray-800 mb-4">
                  {column}
                </h2>

                <div className="space-y-3">
                  {filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className="border rounded-xl p-4"
                    >
                      <h3 className="font-semibold text-gray-900">
                        {task.title}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {task.description}
                      </p>

                      <div className="text-xs text-gray-400 mt-2">
                        Team: {task.teamId} | Priority: {task.priority}
                      </div>

                      <div className="text-xs text-gray-400 mt-1">
                        Deadline: {task.deadline || "No deadline"}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {columns
                          .filter((status) => status !== task.status)
                          .map((status) => (
                            <button
                              key={status}
                              onClick={() =>
                                handleUpdateStatus(task.id, status)
                              }
                              className="text-xs bg-gray-100 hover:bg-blue-100 text-gray-700 px-2 py-1 rounded"
                            >
                              Move to {status}
                            </button>
                          ))}
                      </div>

                      {user.role === "manager" && (
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="mt-3 text-xs bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded"
                        >
                          Delete Task
                        </button>
                      )}
                    </div>
                  ))}

                  {filteredTasks.length === 0 && (
                    <div className="text-sm text-gray-400 border border-dashed rounded-lg p-4 text-center">
                      No tasks
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;