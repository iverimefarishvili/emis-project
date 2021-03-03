import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InstitutionsService } from 'src/app/services/institutions/institutions.service';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.scss']
})
export class EditBranchComponent implements OnInit, OnDestroy {
  public routeSub: Subscription;

  public branchItem: any;

  public institutionId: number;

  public branchData: any = {
    address: '',
    manager_name: ''
  }

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private institutionsService: InstitutionsService) { }

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
    })
  }

  public editBranch(): void {
    this.institutionsService.updateBranch(this.institutionId, this.branchItem.id, this.branchData).subscribe((res) => {
      this.router.navigate([`/institutions/${this.institutionId}`]);
    })
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
