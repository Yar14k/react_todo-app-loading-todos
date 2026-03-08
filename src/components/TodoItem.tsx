import { deleteTodo } from '../api/todos';
type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type Props = {
  todo: Todo;
};

const TodoItem = ({ todo }: Props) => {
  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
    } catch (error) {
      alert('Failed to delete todo');
    }
  };

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
        />
        Completed
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        Completed Todo
      </span>

      {/* Remove button appears only on hover */}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={handleDelete}
      >
        ×
      </button>

      {/* overlay will cover the todo while it is being deleted or updated */}
      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};

export default TodoItem;
