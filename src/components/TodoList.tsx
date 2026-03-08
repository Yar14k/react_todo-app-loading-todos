import { useState } from 'react';
import TodoItem from './TodoItem';
import { getTodos } from '../api/todos';
import { useEffect } from 'react';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type Filter = 'all' | 'active' | 'completed';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await getTodos();

        setTodos(data);
        setError('');
      } catch (err) {
        setError('Unable to load todos');
      }

    };

    loadTodos();
  }, []);

  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  return (
    <>
      <section className="todoapp__main" data-cy="TodoList">
        {/* This is a completed todo */}
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
              className={`filtered__link ${filter === 'all' ? 'selected' : ''}`}
              data-cy="FilterLinkAll"
              onClick={() => setFilter('all')}
            >
              All
            </a>

            <a
              href="#/active"
              className={`filtered__link ${filter === 'all' ? 'selected' : ''}`}
              data-cy="FilterLinkActive"
              onClick={() => setFilter('active')}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={`filtered__link ${filter === 'all' ? 'selected' : ''}`}
              data-cy="FilterLinkCompleted"
              onClick={() => setFilter('completed')}
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
       <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${error ? '' : 'hidden'}`}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </>
  );
};

export default TodoList;
