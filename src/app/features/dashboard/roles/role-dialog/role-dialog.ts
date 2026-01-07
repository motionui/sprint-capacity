import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Field, form, maxLength, minLength, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { ENTITY_DESCRIPTION_MAX_LENGTH, ENTITY_NAME_MAX_LENGTH, ENTITY_NAME_MIN_LENGTH } from '../../../../common/constants';
import { Role } from '../../../../services/roles.service';

export type RoleDialogData = {
  role?: Role;
};

type RoleFormModel = Role;

@Component({
  selector: 'role-dialog',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatIconModule,
    ReactiveFormsModule,
    Field,
  ],
  templateUrl: './role-dialog.html',
  styleUrl: './role-dialog.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleDialog {
  protected dialogData = inject<RoleDialogData>(MAT_DIALOG_DATA);
  protected dialogRef = inject(MatDialogRef<RoleDialog>);

  protected formModel = signal<RoleFormModel>(
    this.dialogData.role
      ? {
          id: this.dialogData.role.id,
          name: this.dialogData.role.name,
          description: this.dialogData.role.description,
        }
      : {
          name: '',
          description: '',
        },
  );
  protected roleForm = form<RoleFormModel>(this.formModel, (schemaPath) => {
    // role name
    required(schemaPath.name, {
      message: 'Role name is a required field',
    });
    minLength(schemaPath.name, ENTITY_NAME_MIN_LENGTH, {
      message: `Role name must be at least ${ENTITY_NAME_MIN_LENGTH} characters`,
    });
    maxLength(schemaPath.name, ENTITY_NAME_MAX_LENGTH, {
      message: `Role name cannot exceed ${ENTITY_NAME_MAX_LENGTH} characters`,
    });

    // role descriptoin
    maxLength(schemaPath.description, ENTITY_DESCRIPTION_MAX_LENGTH, {
      message: `Role description cannot exceed ${ENTITY_DESCRIPTION_MAX_LENGTH} characters`,
    });
  });

  onClickSave = (): void => {
    this.dialogRef.close({
      ...this.formModel(),
    });
  };
}
