import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';

import { TodosStore } from '../../../../store/todos/todos.store';
import { TodoList } from './todo-list/todo-list';

@Component({
  selector: 'todos',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatLabel,
    MatButtonModule,
    MatRadioModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TodoList,
  ],
  providers: [TodosStore, TodoList],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Todos implements OnInit {
  private readonly store = inject(TodosStore);

  protected loading = this.store.loading;
  protected todos = this.store.todos;
  protected selectedTodo = this.store.selectedTodo;

  protected selectedFilter = signal<'all' | 'pending' | 'completed'>('all');
  protected filteredTodos = computed(() => {
    const todos = this.todos();
    const filter = this.selectedFilter();

    if (filter === 'all') {
      return todos;
    }

    return todos?.filter((todo) => (filter === 'pending' ? !todo.completed : todo.completed));
  });

  ngOnInit(): void {
    this.store.getTodos();
  }

  onEnterTask = (inputElement: HTMLInputElement, todoTask: string): void => {
    const task = todoTask.trim();
    if (task) {
      if (this.selectedTodo()) {
        this.store.updateTodo({
          todo: {
            ...this.selectedTodo()!,
            task,
          },
        });
      } else {
        inputElement.value = '';
        this.store.addTodo({
          todo: {
            task,
            ownerId: '',
            completed: false,
            dueDate: '',
          },
        });
      }
    }
  };
}
