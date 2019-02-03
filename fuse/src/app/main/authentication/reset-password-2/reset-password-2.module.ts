import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { ResetPassword2Component } from './reset-password-2.component';




const routes: Routes = [
    {
        path     : 'reset-password/:token',
        component: ResetPassword2Component,
        children : [],
        resolve  : {
           // chat: CalendarService
        }
    }, 
    {
        path: 'reset-password',
        component: ResetPassword2Component,
        children: []
    }
];

@NgModule({
    declarations: [
        ResetPassword2Component
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,

        FuseSharedModule
    ]
})
export class ResetPassword2Module
{
}
