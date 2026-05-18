import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableTask } from "./SortableTask";

export function KanbanColumn({
  column,
  tasks,
  userRole,
  onDeleteTask,
  onUpdateStatus,
  columns,
  comments,
  commentInputs,
  setCommentInputs,
  onCreateComment,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: column,
    data: { type: "column", column },
  });

  return (
    <div
      ref={setNodeRef}
      className={`bg-gray-50 rounded-xl shadow p-4 transition-colors ${
        isOver ? "ring-2 ring-blue-400 bg-blue-50" : ""
      }`}
    >
      <h2 className="font-semibold text-gray-800 mb-4 pb-2 border-b">
        {column}
        <span className="ml-2 text-sm text-gray-400">({tasks.length})</span>
      </h2>

      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3 min-h-[200px]">
          {tasks.map((task) => (
            <SortableTask
              key={task.id}
              task={task}
              userRole={userRole}
              onDeleteTask={onDeleteTask}
              onUpdateStatus={onUpdateStatus}
              columns={columns}
              comments={comments}
              commentInputs={commentInputs}
              setCommentInputs={setCommentInputs}
              onCreateComment={onCreateComment}
            />
          ))}

          {tasks.length === 0 && (
            <div className="text-sm text-gray-400 border border-dashed rounded-lg p-4 text-center">
              Drop tasks here
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}
