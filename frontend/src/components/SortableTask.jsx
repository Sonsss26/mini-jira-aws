import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const getPriorityColor = (priority) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700";
    case "Medium":
      return "bg-yellow-100 text-yellow-700";
    case "Low":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export function TaskDragPreview({ task }) {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-xl w-[280px] cursor-grabbing">
      <h3 className="font-semibold text-gray-900 truncate">{task.title}</h3>
      <span className={`text-xs px-2 py-0.5 rounded-full mt-2 inline-block ${getPriorityColor(task.priority)}`}>
        {task.priority}
      </span>
    </div>
  );
}

export function SortableTask({
  task,
  userRole,
  onDeleteTask,
  comments,
  commentInputs,
  setCommentInputs,
  onCreateComment,
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { type: "task", task },
  });

  const style = {
    transform: isDragging ? undefined : CSS.Transform.toString(transform),
    transition: isDragging ? undefined : transition,
    opacity: isDragging ? 0.35 : 1,
  };

  const imageSrc = task.resizedImageUrl || task.imageUrl;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border rounded-xl p-4 shadow-sm ${
        isDragging ? "ring-2 ring-blue-200 border-dashed" : ""
      }`}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing mt-1 px-1 text-gray-400 text-xs"
          aria-label="Drag task"
        >
          ⋮⋮
        </button>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900">{task.title}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{task.description}</p>

          <div className="flex flex-wrap gap-2 mt-2">
            <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
            <span className="text-xs text-gray-500 capitalize">Team: {task.teamId}</span>
          </div>

          {imageSrc && (
            <img src={imageSrc} alt={task.title} className="mt-3 w-full h-28 object-cover rounded-lg border" />
          )}

          {task.assigneeName && (
            <p className="text-xs text-gray-500 mt-2">Assignee: {task.assigneeName}</p>
          )}

          {userRole === "manager" && (
            <button
              type="button"
              onClick={() => onDeleteTask(task.id)}
              className="mt-3 text-xs text-red-600 hover:bg-red-50 px-2 py-1 rounded"
            >
              Delete
            </button>
          )}

          <div className="mt-4 border-t pt-3">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Comments ({comments[task.id]?.length || 0})
            </h4>
            <div className="space-y-2 mb-3 max-h-32 overflow-y-auto">
              {(comments[task.id] || []).map((comment) => (
                <div key={comment.id} className="bg-gray-50 rounded-lg px-2 py-1.5 text-sm">
                  <p className="text-xs font-medium text-gray-600">{comment.authorName}</p>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                className="border rounded-lg px-2 py-1 text-sm flex-1"
                placeholder="Add a comment…"
                value={commentInputs[task.id] || ""}
                onChange={(e) =>
                  setCommentInputs((prev) => ({ ...prev, [task.id]: e.target.value }))
                }
                onKeyDown={(e) => e.key === "Enter" && onCreateComment(task.id)}
              />
              <button
                type="button"
                onClick={() => onCreateComment(task.id)}
                className="bg-blue-600 text-white text-xs px-3 py-1 rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

