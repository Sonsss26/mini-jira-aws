import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";

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
    <div className="bg-white border rounded-xl p-4 shadow-xl w-[280px] cursor-grabbing rotate-1 scale-[1.02]">
      <div className="flex items-start gap-2">
        <GripVertical size={16} className="text-gray-400 mt-1 shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{task.title}</h3>
          {task.description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{task.description}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-2">
            <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
            <span className="text-xs text-gray-500">Team: {task.teamId}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SortableTask({ 
  task, 
  userRole, 
  onDeleteTask, 
  onUpdateStatus,
  columns,
  comments,
  commentInputs,
  setCommentInputs,
  onCreateComment
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: task.id,
    data: {
      type: "task",
      task,
    },
  });

  const style = {
    transform: isDragging ? undefined : CSS.Transform.toString(transform),
    transition: isDragging ? undefined : transition,
    opacity: isDragging ? 0.35 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow ${
        isDragging ? "ring-2 ring-blue-200 border-dashed" : ""
      }`}
    >
      <div className="flex items-start gap-2">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing mt-1 p-1"
        >
          <GripVertical size={16} className="text-gray-400" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{task.title}</h3>
          
          <p className="text-sm text-gray-500 mt-1">{task.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-2">
            <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
            <span className="text-xs text-gray-500">
              Team: {task.teamId}
            </span>
            {task.deadline && (
              <span className="text-xs text-gray-500">
                Due: {new Date(task.deadline).toLocaleDateString()}
              </span>
            )}
          </div>

          {task.imageUrl && (
            <img
              src={task.imageUrl}
              alt={task.title}
              className="mt-3 w-full h-32 object-cover rounded-lg border"
            />
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            {columns
              .filter((status) => status !== task.status)
              .map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    onUpdateStatus(task.id, status);
                  }}
                  className="text-xs bg-gray-100 hover:bg-blue-100 text-gray-700 px-2 py-1 rounded transition-colors"
                >
                  Move to {status}
                </button>
              ))}
          </div>

          {userRole === "manager" && (
            <button
              onClick={() => onDeleteTask(task.id)}
              className="mt-3 text-xs bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded flex items-center gap-1"
            >
              <Trash2 size={12} /> Delete
            </button>
          )}

          <div className="mt-4 border-t pt-3">
            <h4 className="text-sm font-semibold mb-2">Comments ({comments[task.id]?.length || 0})</h4>

            <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
              {(comments[task.id] || []).map((comment) => (
                <div key={comment.id} className="bg-gray-50 rounded p-2 text-sm">
                  <div className="font-medium text-xs text-gray-600">
                    {comment.authorName}
                  </div>
                  <div className="text-gray-700">{comment.text}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                className="border rounded px-2 py-1 text-sm flex-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Add a comment..."
                value={commentInputs[task.id] || ""}
                onChange={(e) =>
                  setCommentInputs((prev) => ({
                    ...prev,
                    [task.id]: e.target.value,
                  }))
                }
                onKeyPress={(e) => e.key === 'Enter' && onCreateComment(task.id)}
              />
              <button
                onClick={() => onCreateComment(task.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}