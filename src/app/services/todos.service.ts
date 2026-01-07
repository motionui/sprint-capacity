import { inject, Injectable } from '@angular/core';
import { Database, onValue, push, ref, remove, update } from '@angular/fire/database';

import { from, Observable } from 'rxjs';
import { Todo } from '../store/todos/todos.state';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private database = inject(Database);

  private todosPath = 'sprint-planning/todos';

  getTodos$ = (): Observable<Todo[]> => {
    return new Observable<Todo[]>((observer) => {
      const todosRef = ref(this.database, this.todosPath);

      // set up a live listener so any changes are reflected in real-time
      // this causes patchState to be called in the signal store
      const unsubscribe = onValue(todosRef, (snapshot) => {
        const data = snapshot.val() ?? {};
        observer.next(
          Object.entries(data).map(([id, value]) => ({
            id,
            ...(value as Omit<Todo, 'id'>),
          })),
        );
      });

      return () => unsubscribe();
    });
  };

  addTodo$ = (todo: Todo): Observable<string> => {
    const newRef = push(ref(this.database, this.todosPath), todo);
    return from(Promise.resolve(newRef.key));
  };

  updateTodo$ = (todo: Todo): Observable<void> => {
    return from(update(ref(this.database, `${this.todosPath}/${todo.id}`), todo as Omit<Todo, 'id'>));
  };

  deleteTodo$ = (todo: Todo): Observable<void> => {
    return from(remove(ref(this.database, `${this.todosPath}/${todo.id}`)));
  };
}
