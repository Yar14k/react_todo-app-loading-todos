import { useState } from 'react';
import TodoItem from './TodoItem';
import { getTodos } from '../api/todos';
import { useEffect } from 'react';
import CreateTodo from './CreateTodo';
import { createTodo } from '../api/todos';
import { USER_ID } from '../api/todos';
import ErrorMessages from './ErrorMessages';
import { ErrorMessagesNotification } from '../api/todos';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [error, setError] = useState<ErrorMessagesNotification | null>(null);

  const handleAddTodo = async (title: string) => {
    try {
      const newTodo = await createTodo({
        title,
        userId: USER_ID,
        completed: false,
      });

      setTodos(prev => [...prev, newTodo]);
    } catch {
      setError(ErrorMessagesNotification.ADD);
    }
  };

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await getTodos();

        setTodos(data);
        setError(null);
      } catch (err) {
        setError(ErrorMessagesNotification.LOAD);
      }
    };

    loadTodos();
  }, []);

  const visibleTodos = todos.filter(todo => {
    if (filter === Filter.Active) {
      return !todo.completed;
    }

    if (filter === Filter.Completed) {
      return todo.completed;
    }

    return true;
  });

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <>
      <CreateTodo
        onAdd={handleAddTodo}
        allCompleted={allCompleted}
        setError={setError}
      />
      <section className="todoapp__main" data-cy="TodoList">
        {visibleTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </section>
      {todos.length > 0 && (
        <footer className="todoapp_footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {todos.filter(todo => !todo.completed).length} items left
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={`filtered__link ${filter === Filter.All ? 'selected' : ''}`}
              data-cy="FilterLinkAll"
              onClick={() => setFilter(Filter.All)}
            >
              All
            </a>

            <a
              href="#/active"
              className={`filtered__link ${filter === Filter.Active ? 'selected' : ''}`}
              data-cy="FilterLinkActive"
              onClick={() => setFilter(Filter.Active)}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={`filtered__link ${filter === Filter.Completed ? 'selected' : ''}`}
              data-cy="FilterLinkCompleted"
              onClick={() => setFilter(Filter.Completed)}
            >
              Completed
            </a>
          </nav>

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            disabled={todos.every(todo => !todo.completed)}
          >
            Clear completed
          </button>
        </footer>
      )}

      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorMessages error={error} setError={setError} />
    </>
  );
};

export default TodoList;
