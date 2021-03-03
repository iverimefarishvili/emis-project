import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {
    path: '', component: MainComponent, canActivate: [AuthGuard],children: [
      { path: 'institutions', loadChildren: () => import('./institutions/institutions.module').then(m => m.InstitutionsModule) },
      { path: 'users', component: UsersComponent }
    ]
  }
];

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [AuthGuard]
})
export class MainModule { }
