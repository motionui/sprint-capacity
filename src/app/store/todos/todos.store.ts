import { inject } from '@angular/core';

import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, finalize, pipe, switchMap, tap } from 'rxjs';
import { TodosService } from '../../services/todos.service';
import { Todo, todosInitialState } from './todos.state';

export const TodosStore = signalStore(
  {
    protectedState: true,
  },
  withState(todosInitialState),
  withMethods((store, todosService = inject(TodosService)) => ({
    setSelectedTodo: (selectedTodo: Todo | null): void => {
      patchState(store, { selectedTodo });
    },
    getTodos: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(() =>
          todosService.getTodos$().pipe(
            tap((todos) => patchState(store, { loading: false, todos })),
            catchError((error) => {
              patchState(store, { loading: false, todos: [] });
              return EMPTY;
            }),
            finalize(() => patchState(store, { loading: false })),
          ),
        ),
      ),
    ),
    updateTodo: rxMethod<{ todo: Todo }>(pipe(switchMap(({ todo }) => todosService.updateTodo$(todo)))),
    addTodo: rxMethod<{ todo: Todo }>(pipe(switchMap(({ todo }) => todosService.addTodo$(todo)))),
    deleteTodo: rxMethod<{ todo: Todo }>(
      pipe(
        switchMap(({ todo }) =>
          todosService.deleteTodo$(todo).pipe(
            tap(() => {
              if (store.selectedTodo()?.id === todo.id) {
                patchState(store, { selectedTodo: null });
              }
            }),
          ),
        ),
      ),
    ),
  })),
);
