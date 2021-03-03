import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InstitutionsService } from 'src/app/services/institutions/institutions.service';

@Component({
  selector: 'app-edit-personal',
  templateUrl: './edit-personal.component.html',
  styleUrls: ['./edit-personal.component.scss']
})
export class EditPersonalComponent implements OnInit {
  public routeSub: Subscription;

  public personalData: any = {
    pid: '',
    name: ''
  };

  public institutionId: number = null;
  public branchId: number = null;

  public personalItem: any;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private institutionsService: InstitutionsService
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.institutionId = params['id'];
      this.branchId = params['id1'];
      this.getPersonalDetail(params['id'], params['id1'], params['id2']);
    });
  }

  public getPersonalDetail(institutionId: number, branchId: number, personalId: number): void {
    this.institutionsService.getPersonalDetail(institutionId, branchId, personalId).subscribe((res) => {
      this.personalItem = res;
      this.personalData.pid = this.personalItem.pid;
      this.personalData.name = this.personalItem.name;
    })
  }

  public editPersonal(): void {
    this.institutionsService.updatePersonal(this.institutionId, this.branchId,this.personalItem.id, this.personalData).subscribe((res) => {
      this.router.navigate([`/institutions/${this.institutionId}/branches/${this.branchId}`]);
    })
  }

}
