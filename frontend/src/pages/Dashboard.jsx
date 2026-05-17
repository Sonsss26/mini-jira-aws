import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import axios from "axios";
import Navbar from "../components/Navbar";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const COLUMNS = ["To Do", "In Progress", "In Review", "Done"];

const EMPTY_FORM = {
  title: "",
  description: "",
  priority: "Medium",
  deadline: "",
  image: null,
  teamId: "",
  assigneeId: "",
  assigneeName: "",
};

function Dashboard() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [tasks, setTasks] = useState([]);
  const [comments, setComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [employees, setEmployees] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const profile = auth.user?.profile;
  const user = {
    name: profile?.email || "User",
    role: profile?.["custom:role"] || "employee",
    teamId: profile?.["custom:teamId"] || "",
  };
  const isManager = user.role === "manager";

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${auth.user?.id_token}` },
  });

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchTasks();
  }, [auth.isAuthenticated]);

  const fetchTasks = async () => {
    try {
      setLoadingTasks(true);
      const { data } = await axios.get(`${API_BASE}/api/tasks`, getAuthHeaders());
      setTasks(data);
      data.forEach((task) => fetchComments(task.id));
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setLoadingTasks(false);
    }
  };

  const fetchEmployees = async (teamId) => {
    if (!teamId) {
      setEmployees([]);
      return;
    }
    try {
      setLoadingEmployees(true);
      const { data } = await axios.get(
        `${API_BASE}/api/users/team/${teamId}`,
        getAuthHeaders(),
      );
      setEmployees(data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      setEmployees([]);
    } finally {
      setLoadingEmployees(false);
    }
  };

  const fetchComments = async (taskId) => {
    try {
      const { data } = await axios.get(
        `${API_BASE}/api/comments/${taskId}`,
        getAuthHeaders(),
      );
      setComments((prev) => ({ ...prev, [taskId]: data }));
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  const handleCreateComment = async (taskId) => {
    const text = commentInputs[taskId]?.trim();
    if (!text) return;

    await axios.post(
      `${API_BASE}/api/comments/${taskId}`,
      { text, authorName: user.name, authorRole: user.role },
      getAuthHeaders(),
    );

    setCommentInputs((prev) => ({ ...prev, [taskId]: "" }));
    fetchComments(taskId);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!form.teamId || !form.assigneeId) {
      alert("Please select a team and assignee.");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("priority", form.priority);
    formData.append("deadline", form.deadline);
    formData.append("teamId", form.teamId);
    formData.append("assigneeId", form.assigneeId);
    formData.append("assigneeName", form.assigneeName);
    if (form.image) formData.append("image", form.image);

    try {
      await axios.post(`${API_BASE}/api/tasks`, formData, getAuthHeaders());
      setForm(EMPTY_FORM);
      setEmployees([]);
      fetchTasks();
    } catch (error) {
      console.error("Failed to create task:", error);
      alert("Could not create task. Please try again.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await axios.delete(`${API_BASE}/api/tasks/${taskId}`, getAuthHeaders());
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("Could not delete task.");
    }
  };

  const handleUpdateStatus = async (taskId, status) => {
    try {
      await axios.patch(
        `${API_BASE}/api/tasks/${taskId}/status`,
        { status },
        getAuthHeaders(),
      );
      fetchTasks();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleLogout = () => {
    auth.removeUser();
    navigate("/login");
  };

  const employeePlaceholder = !form.teamId
    ? "Select a team first"
    : loadingEmployees
      ? "Loading..."
      : employees.length === 0
        ? "No employees — add users to DynamoDB"
        : "Select assignee";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">
              {user.name}
              <span className="mx-2">·</span>
              <span className="capitalize text-blue-600 font-medium">{user.role}</span>
              {!isManager && user.teamId && (
                <>
                  <span className="mx-2">·</span>
                  <span className="capitalize">{user.teamId} team</span>
                </>
              )}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm border border-gray-200 bg-white text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Sign out
          </button>
        </div>

        {isManager && (
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Create task</h2>
            <form
              onSubmit={handleCreateTask}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <input
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Title *"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <input
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 md:col-span-2"
                placeholder="Description *"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
              <select
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <input
                type="date"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                required
              />
              <input
                type="file"
                accept="image/*"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
              />
              <select
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={form.teamId}
                onChange={(e) => {
                  const teamId = e.target.value;
                  setForm({ ...form, teamId, assigneeId: "", assigneeName: "" });
                  fetchEmployees(teamId);
                }}
                required
              >
                <option value="">Team *</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
              </select>
              <select
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm disabled:bg-gray-50 disabled:text-gray-400"
                value={form.assigneeId}
                disabled={!form.teamId || loadingEmployees}
                onChange={(e) => {
                  const employee = employees.find((emp) => emp.id === e.target.value);
                  setForm({
                    ...form,
                    assigneeId: e.target.value,
                    assigneeName: employee?.name || employee?.email || "",
                  });
                }}
                required
              >
                <option value="">{employeePlaceholder}</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name || employee.email}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Create task
              </button>
            </form>
          </section>
        )}

        {loadingTasks ? (
          <p className="text-center text-gray-400 py-16">Loading tasks…</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {COLUMNS.map((column) => {
              const colTasks = tasks.filter((task) => task.status === column);

              return (
                <div key={column} className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-gray-800">{column}</h2>
                    <span className="text-xs text-gray-400 bg-gray-50 border rounded-full px-2 py-0.5">
                      {colTasks.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {colTasks.map((task) => (
                      <article key={task.id} className="border border-gray-200 rounded-xl p-4">
                        <h3 className="font-semibold text-gray-900">{task.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{task.description}</p>

                        {task.imageUrl && (
                          <img
                            src={task.imageUrl}
                            alt={task.title}
                            className="mt-3 w-full h-32 object-cover rounded-lg border"
                          />
                        )}

                        <div className="text-xs text-gray-400 mt-2 space-y-0.5">
                          <p className="capitalize">Team: {task.teamId} · {task.priority}</p>
                          <p>Due: {task.deadline || "—"}</p>
                          {task.assigneeName && <p>Assignee: {task.assigneeName}</p>}
                        </div>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {COLUMNS.filter((s) => s !== task.status).map((status) => (
                            <button
                              key={status}
                              type="button"
                              onClick={() => handleUpdateStatus(task.id, status)}
                              className="text-xs bg-gray-100 hover:bg-blue-50 hover:text-blue-700 text-gray-600 px-2 py-1 rounded transition-colors"
                            >
                              {status}
                            </button>
                          ))}
                        </div>

                        {isManager && (
                          <button
                            type="button"
                            onClick={() => handleDeleteTask(task.id)}
                            className="mt-3 text-xs text-red-600 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                          >
                            Delete
                          </button>
                        )}

                        <div className="mt-4 border-t pt-3">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Comments</h4>
                          <div className="space-y-2 mb-3 max-h-32 overflow-y-auto">
                            {(comments[task.id] || []).map((comment) => (
                              <div key={comment.id} className="bg-gray-50 rounded-lg px-3 py-2 text-sm">
                                <p className="font-medium text-gray-700">{comment.authorName}</p>
                                <p className="text-gray-600">{comment.text}</p>
                              </div>
                            ))}
                            {(comments[task.id] || []).length === 0 && (
                              <p className="text-xs text-gray-400">No comments yet</p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <input
                              className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
                              placeholder="Add a comment…"
                              value={commentInputs[task.id] || ""}
                              onChange={(e) =>
                                setCommentInputs((prev) => ({
                                  ...prev,
                                  [task.id]: e.target.value,
                                }))
                              }
                              onKeyDown={(e) =>
                                e.key === "Enter" && handleCreateComment(task.id)
                              }
                            />
                            <button
                              type="button"
                              onClick={() => handleCreateComment(task.id)}
                              className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-700"
                            >
                              Send
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}

                    {colTasks.length === 0 && (
                      <p className="text-sm text-gray-400 border border-dashed border-gray-200 rounded-lg p-4 text-center">
                        No tasks
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
