import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InstitutionsComponent } from './institutions.component';
import { FormsModule } from '@angular/forms';
import { AddInstitutionComponent } from './add-institution/add-institution.component';
import { ViewInstitutionComponent } from './view-institution/view-institution.component';
import { EditInstitutionComponent } from './edit-institution/edit-institution.component';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { ViewBranchComponent } from './view-branch/view-branch.component';
import { EditBranchComponent } from './edit-branch/edit-branch.component';
import { AddPersonalComponent } from './add-personal/add-personal.component';
import { EditPersonalComponent } from './edit-personal/edit-personal.component';
import { ViewPersonalComponent } from './view-personal/view-personal.component';

const routes: Routes = [
  {
    path: '', children: [
      {path: '', component: InstitutionsComponent},
      {path: 'create', component: AddInstitutionComponent },
      {path: ':id/edit', component: EditInstitutionComponent },
      {path: ':id', component: ViewInstitutionComponent}, 
      {path: ':id/branches/create', component: AddBranchComponent },
      {path: ':id/branches/:id1/edit', component: EditBranchComponent },
      {path: ':id/branches/:id1', component: ViewBranchComponent },
      {path: ':id/branches/:id1/personal/create', component: AddPersonalComponent },
      {path: ':id/branches/:id1/personal/:id2/edit', component: EditPersonalComponent },
      {path: ':id/branches/:id1/personal/:id2', component: ViewPersonalComponent }
    ]
  },
];

@NgModule({
  declarations: [InstitutionsComponent, AddInstitutionComponent, ViewInstitutionComponent, EditInstitutionComponent, AddBranchComponent, ViewBranchComponent, EditBranchComponent, AddPersonalComponent, EditPersonalComponent, ViewPersonalComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class InstitutionsModule { }
