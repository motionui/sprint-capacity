import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Page } from '@motionui/ui-lib';
import { catchError, EMPTY, filter, switchMap } from 'rxjs';
import { Role, RolesService } from '../../../services/roles.service';
import { Todos } from '../containers/todos/todos';
import { RoleDialog } from './role-dialog/role-dialog';

@Component({
  selector: 'roles',
  imports: [CommonModule, MatTooltipModule, MatButtonModule, MatIconModule, MatTableModule, MatMenuModule, Page, Todos],
  templateUrl: './roles.html',
  styleUrl: './roles.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Roles {
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private rolesService = inject(RolesService);

  protected displayedColumns: string[] = ['name', 'description', 'menu'];
  protected roles = toSignal(this.rolesService.getRoles$(), {
    initialValue: [],
  });

  protected onClickAddRole = (): void => {
    const dialogRef = this.dialog.open(RoleDialog, {
      disableClose: true,
      width: '350px',
      data: {
        role: null,
      },
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter((result): result is Role => !!result && !result.id),
        switchMap((role) =>
          this.rolesService.addRole$(role).pipe(
            catchError((error) => {
              this.snackBar.open(error.message, 'OK', {
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
              });
              return EMPTY;
            }),
          ),
        ),
      )
      .subscribe();
  };

  onClickEdit = (role: Role): void => {
    const dialogRef = this.dialog.open(RoleDialog, {
      disableClose: true,
      width: '350px',
      data: {
        role,
      },
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter((result): result is Role => !!result && result.id),
        switchMap((role) =>
          this.rolesService.updateRole$(role).pipe(
            catchError((error) => {
              this.snackBar.open(error.message, 'OK', {
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
              });
              return EMPTY;
            }),
          ),
        ),
      )
      .subscribe();
  };

  onClickDelete = (role: Role): void => {
    this.rolesService
      .deleteRole$(role)
      .pipe(
        catchError((error) => {
          this.snackBar.open(error.message, 'OK', {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          return EMPTY;
        }),
      )
      .subscribe();
  };
}
