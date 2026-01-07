import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Todo } from '../../../../../store/todos/todos.state';
import { TodoItem } from '../todo-item/todo-item';

@Component({
  selector: 'todo-list',
  imports: [TodoItem],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoList {
  public todos = input.required<Todo[]>();
}
