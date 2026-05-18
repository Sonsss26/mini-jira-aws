import { useCallback, useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  pointerWithin,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { toast } from "sonner";
import { KanbanColumn } from "./KanbanColumn";
import { TaskDragPreview } from "./SortableTask";

const COLUMNS = ["To Do", "In Progress", "In Review", "Done"];

export default function KanbanBoard({ tasks, onUpdateStatus, userRole, onDeleteTask, comments, commentInputs, setCommentInputs, onCreateComment }) {
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const collisionDetection = useCallback((args) => {
    const pointerCollisions = pointerWithin(args);
    if (pointerCollisions.length > 0) {
      return pointerCollisions;
    }
    return rectIntersection(args);
  }, []);

  const handleDragStart = (event) => {
    const task = tasks.find((t) => t.id === event.active.id);
    setActiveTask(task ?? null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) {
      return;
    }

    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    let newStatus = null;

    if (COLUMNS.includes(over.id)) {
      newStatus = over.id;
    } else {
      const overTask = tasks.find((t) => t.id === over.id);
      if (overTask) {
        newStatus = overTask.status;
      }
    }

    if (newStatus && newStatus !== activeTask.status) {
      onUpdateStatus(activeTask.id, newStatus);
      toast.success(`Task moved to ${newStatus}`);
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveTask(null)}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {COLUMNS.map((column) => (
          <KanbanColumn
            key={column}
            column={column}
            tasks={getTasksByStatus(column)}
            userRole={userRole}
            onDeleteTask={onDeleteTask}
            onUpdateStatus={onUpdateStatus}
            columns={COLUMNS}
            comments={comments}
            commentInputs={commentInputs}
            setCommentInputs={setCommentInputs}
            onCreateComment={onCreateComment}
          />
        ))}
      </div>

      <DragOverlay dropAnimation={null}>
        {activeTask ? <TaskDragPreview task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
