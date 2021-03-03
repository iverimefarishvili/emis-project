import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { NonAuthGuard } from 'src/app/guards/nonAuth.guard';


const routes: Routes = [
  {
    path: '', children: [
      {path: '', component: AuthComponent, canActivate: [NonAuthGuard]},
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [NonAuthGuard]
})
export class AuthModule { }
