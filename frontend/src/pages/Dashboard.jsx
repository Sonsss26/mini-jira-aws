import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import axios from "axios";
import Navbar from "../components/Navbar";

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
};

  const handleDeleteTask = async (taskId) => {
    const confirmed = window.confirm("Delete this task?");
    if (!confirmed) return;

    await axios.delete(
      `http://localhost:5000/api/tasks/${taskId}`,
      getAuthHeaders()
    );

    fetchTasks();
  };

  const handleUpdateStatus = async (taskId, status) => {
    await axios.patch(
      `http://localhost:5000/api/tasks/${taskId}/status`,
      { status },
      getAuthHeaders()
    );

    fetchTasks();
  };

  const handleLogout = () => {
    auth.removeUser();
    navigate("/login");
  };

  const columns = ["To Do", "In Progress", "In Review", "Done"];

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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {columns.map((column) => {
            const filteredTasks = tasks.filter(
              (task) => task.status === column
            );

            return (
              <div key={column} className="bg-white rounded-xl shadow p-4">
                <h2 className="font-semibold text-gray-800 mb-4">{column}</h2>

                <div className="space-y-3">
                  {filteredTasks.map((task) => (
                    <div key={task.id} className="border rounded-xl p-4">
                      <h3 className="font-semibold text-gray-900">
                        {task.title}
                      </h3>

                      <p className="text-sm text-gray-500">
  {task.description}
</p>

{task.imageUrl && (
  <img
    src={task.imageUrl}
    alt={task.title}
    className="mt-3 w-full h-32 object-cover rounded-lg border"
  />
)}

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

                      <div className="mt-4 border-t pt-3">
                        <h4 className="text-sm font-semibold mb-2">
                          Comments
                        </h4>

                        <div className="space-y-2 mb-3">
                          {(comments[task.id] || []).map((comment) => (
                            <div
                              key={comment.id}
                              className="bg-gray-50 rounded p-2 text-sm"
                            >
                              <div className="font-medium">
                                {comment.authorName}
                              </div>

                              <div className="text-gray-600">
                                {comment.text}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <input
                            className="border rounded px-2 py-1 text-sm flex-1"
                            placeholder="Add comment"
                            value={commentInputs[task.id] || ""}
                            onChange={(e) =>
                              setCommentInputs((prev) => ({
                                ...prev,
                                [task.id]: e.target.value,
                              }))
                            }
                          />

                          <button
                            onClick={() => handleCreateComment(task.id)}
                            className="bg-blue-600 text-white text-xs px-3 py-1 rounded"
                          >
                            Add
                          </button>
                        </div>
                      </div>
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