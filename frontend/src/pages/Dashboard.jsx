import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import axios from "axios";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import KanbanBoard from "../components/KanbanBoard";

function Dashboard() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [tasks, setTasks] = useState([]);
  const [comments, setComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

const email = auth.user?.profile?.email;

const user = {
  name: email || "User",
  role: email === "hussainse7sa@gmail.com" ? "manager" : "employee",
  teamId: email === "hussainse7sa@gmail.com" ? "management" : "frontend",
};

console.log("COGNITO PROFILE:", auth.user?.profile);

  const getAuthHeaders = () => ({
    headers: {
      Authorization: `Bearer ${auth.user?.access_token}`,
    },
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    deadline: "",
    image: null,
    teamId: "frontend",
    assigneeId: "sara",
    assigneeName: "Sara",
  });

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
      return;
    }

    fetchTasks();
  }, [auth.isAuthenticated]);

  const fetchTasks = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/tasks?role=${user.role}&teamId=${user.teamId}`,
      getAuthHeaders()
    );

    setTasks(response.data);

    response.data.forEach((task) => {
      fetchComments(task.id);
    });
  };

  const fetchComments = async (taskId) => {
    const response = await axios.get(
      `http://localhost:5000/api/comments/${taskId}`,
      getAuthHeaders()
    );

    setComments((prev) => ({
      ...prev,
      [taskId]: response.data,
    }));
  };

  const handleCreateComment = async (taskId) => {
    const text = commentInputs[taskId];

    if (!text) return;

    await axios.post(
      `http://localhost:5000/api/comments/${taskId}`,
      {
        text,
        authorName: user.name,
        authorRole: user.role,
      },
      getAuthHeaders()
    );

    setCommentInputs((prev) => ({
      ...prev,
      [taskId]: "",
    }));

    fetchComments(taskId);
    toast.success("Comment added!");
  };

 const handleCreateTask = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("title", form.title);
  formData.append("description", form.description);
  formData.append("priority", form.priority);
  formData.append("deadline", form.deadline);
  formData.append("teamId", form.teamId);
  formData.append("assigneeId", form.assigneeId);
  formData.append("assigneeName", form.assigneeName);

  if (form.image) {
    formData.append("image", form.image);
  }

  await axios.post(
    "http://localhost:5000/api/tasks",
    formData,
    getAuthHeaders()
  );

  setForm({
    title: "",
    description: "",
    priority: "Medium",
    deadline: "",
    image: null,
    teamId: "frontend",
    assigneeId: "sara",
    assigneeName: "Sara",
  });

  fetchTasks();
  toast.success("Task created successfully!");
};

  const handleDeleteTask = async (taskId) => {
    const confirmed = window.confirm("Delete this task?");
    if (!confirmed) return;

    await axios.delete(
      `http://localhost:5000/api/tasks/${taskId}`,
      getAuthHeaders()
    );

    fetchTasks();
    toast.success("Task deleted successfully!");
  };

  const handleUpdateStatus = async (taskId, status) => {
    await axios.patch(
      `http://localhost:5000/api/tasks/${taskId}/status`,
      { status },
      getAuthHeaders()
    );

    fetchTasks();
    toast.success(`Task status updated to ${status}!`);
  };

  const handleLogout = () => {
    auth.removeUser();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
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
              onChange={(e) => setForm({ ...form, title: e.target.value })}
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
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <input
              type="date"
              className="border rounded-lg px-3 py-2"
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              required
            />
            <input
              type="file"
              accept="image/*"
              className="border rounded-lg px-3 py-2"
              onChange={(e) =>
                setForm({ ...form, image: e.target.files[0] })
              }
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

        <KanbanBoard
          tasks={tasks}
          onUpdateStatus={handleUpdateStatus}
          userRole={user.role}
          onDeleteTask={handleDeleteTask}
          comments={comments}
          commentInputs={commentInputs}
          setCommentInputs={setCommentInputs}
          onCreateComment={handleCreateComment}
        />
      </main>
    </div>
  );
}

export default Dashboard;