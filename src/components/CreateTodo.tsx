import { createTodo } from '../api/todos';

const CreateTodo: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const todo = new FormData(form).get('todo') as string;

    createTodo({
      title: todo,
      userId: 4059,
      completed: false,
    });
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      <form onSubmit={handleSubmit}>
        <input
          name="todo"
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

export default CreateTodo;
