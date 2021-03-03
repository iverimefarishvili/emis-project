import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InstitutionsService } from 'src/app/services/institutions/institutions.service';

@Component({
  selector: 'app-view-branch',
  templateUrl: './view-branch.component.html',
  styleUrls: ['./view-branch.component.scss']
})
export class ViewBranchComponent implements OnInit, OnDestroy {
  public routeSub: Subscription;

  public branchItem: any;

  public institutionId: number;

  public branchData: any = {
    address: '',
    manager_name: ''
  };

  public tableData: any = [];

  constructor(private route: ActivatedRoute, private router: Router, private institutionsService:InstitutionsService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.institutionId = params['id'];
      this.getBranchDetail(params['id'], params['id1']);
    });
  }

  public getBranchDetail(institutionId: number, branchId: number): void {
    this.institutionsService.getBranchDetail(institutionId, branchId).subscribe((res) => {
      this.branchItem = res;
      this.branchData.address = this.branchItem.address;
      this.branchData.manager_name = this.branchItem.manager_name;
      this.getPersonals();
    })
  }

  public getPersonals(): void {
    this.tableData = [];
    this.institutionsService.getPersonal(this.institutionId, this.branchItem.id).subscribe((res) => {
      this.tableData = res.data;
    })
  }

  public createPersonal(): void {
    this.router.navigate([`institutions/${this.institutionId}/branches/${this.branchItem.id}/personal/create`])
  }

  public editInstitution(item: any): void {
    this.router.navigate([`institutions/${this.institutionId}/branches/${this.branchItem.id}/personal/${item.id}/edit`]);
  }

  public viewInstitution(item: any): void {
    this.router.navigate([`institutions/${this.institutionId}/branches/${this.branchItem.id}/personal/${item.id}`]);
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}
