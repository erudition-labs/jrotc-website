import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserMangComponent } from './usermang.component';

import {
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatCardModule
  } from '@angular/material';

const routes = [
  {
      path     : 'usermang',
      component: UserMangComponent
  }
];

@NgModule({
  declarations: [
    UserMangComponent
],
imports     : [
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
],
exports     : [
    UserMangComponent
]
})
export class UserMangModule { }
