import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import KanbanBoard from "../components/KanbanBoard";
import { api, authHeaders } from "../lib/api";

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

  const headers = () => authHeaders(auth.user?.id_token);

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
      const { data } = await api.get("/api/tasks", headers());
      setTasks(data);
      data.forEach((task) => fetchComments(task.id));
    } catch {
      toast.error("Failed to load tasks");
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
      const { data } = await api.get(`/api/users/team/${teamId}`, headers());
      setEmployees(data);
    } catch {
      setEmployees([]);
    } finally {
      setLoadingEmployees(false);
    }
  };

  const fetchComments = async (taskId) => {
    try {
      const { data } = await api.get(`/api/comments/${taskId}`, headers());
      setComments((prev) => ({ ...prev, [taskId]: data }));
    } catch {
      /* non-fatal */
    }
  };

  const handleCreateComment = async (taskId) => {
    const text = commentInputs[taskId]?.trim();
    if (!text) return;
    try {
      await api.post(`/api/comments/${taskId}`, { text }, headers());
      setCommentInputs((prev) => ({ ...prev, [taskId]: "" }));
      fetchComments(taskId);
    } catch {
      toast.error("Failed to add comment");
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!form.teamId || !form.assigneeId) {
      toast.error("Select a team and assignee");
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
      await api.post("/api/tasks", formData, headers());
      toast.success("Task created");
      setForm(EMPTY_FORM);
      setEmployees([]);
      fetchTasks();
    } catch {
      toast.error("Could not create task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await api.delete(`/api/tasks/${taskId}`, headers());
      toast.success("Task deleted");
      fetchTasks();
    } catch {
      toast.error("Could not delete task");
    }
  };

  const handleUpdateStatus = async (taskId, status) => {
    try {
      await api.patch(`/api/tasks/${taskId}/status`, { status }, headers());
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status } : t))
      );
    } catch {
      toast.error("Failed to update status");
      fetchTasks();
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
            className="text-sm border border-gray-200 bg-white text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            Sign out
          </button>
        </div>

        {isManager && (
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Create task</h2>
            <form onSubmit={handleCreateTask} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                placeholder="Title *"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <input
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm md:col-span-2"
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
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm disabled:bg-gray-50"
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
                className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700"
              >
                Create task
              </button>
            </form>
          </section>
        )}

        {loadingTasks ? (
          <p className="text-center text-gray-400 py-16">Loading tasks…</p>
        ) : (
          <KanbanBoard
            tasks={tasks}
            userRole={user.role}
            onUpdateStatus={handleUpdateStatus}
            onDeleteTask={handleDeleteTask}
            comments={comments}
            commentInputs={commentInputs}
            setCommentInputs={setCommentInputs}
            onCreateComment={handleCreateComment}
          />
        )}
      </main>
    </div>
  );
}

export default Dashboard;
