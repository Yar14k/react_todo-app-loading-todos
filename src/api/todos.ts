import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 4059;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

type NewTodo = {
  title: string;
  completed?: boolean;
  userId: number;
};

export const createTodo = (data: NewTodo) => {
  return client.post('/todos', data);
};

export const deleteTodo = (id: number) => {
  return client.delete(`/todos/${id}`);
};
