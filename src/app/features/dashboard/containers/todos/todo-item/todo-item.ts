import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Todo } from '../../../../../store/todos/todos.state';
import { TodosStore } from '../../../../../store/todos/todos.store';

@Component({
  selector: 'todo-item',
  imports: [MatCheckboxModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItem {
  private readonly store = inject(TodosStore);

  public todo = input.required<Todo>();

  protected selectedTodo = this.store.selectedTodo;

  onToggleTodoCompleted = (): void => {
    this.store.updateTodo({
      todo: {
        ...this.todo(),
        completed: !this.todo().completed,
      },
    });
  };

  onSelectTodo = (): void => {
    this.store.setSelectedTodo(this.selectedTodo()?.id === this.todo().id ? null : this.todo());
  };

  onDeleteTodo = (): void => {
    this.store.deleteTodo({
      todo: this.todo(),
    });
  };
}
