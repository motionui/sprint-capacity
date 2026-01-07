export type Todo = {
  id?: string;
  task: string;
  ownerId: string;
  completed: boolean;
  dueDate: string;
};

export type TodosState = {
  loading: boolean;
  todos: Todo[];
  selectedTodo: Todo | null;
};

export const todosInitialState: TodosState = {
  loading: false,
  todos: [],
  selectedTodo: null,
};
