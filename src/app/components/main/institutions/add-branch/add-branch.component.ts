import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InstitutionsService } from 'src/app/services/institutions/institutions.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss']
})
export class AddBranchComponent implements OnInit {
  public routeSub: Subscription;

  public branchData: any = {
    address: '',
    manager_name: ''
  }

  public institutionId: number = null;

  constructor(
    private notificationService: NotificationService, 
    private institutionsService: InstitutionsService, 
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.institutionId = params['id'];
    });
  }


  public createBranch(): void {
    if(this.branchData.address === '' || this.branchData.manager_name === '') {
      this.notificationService.changeGrowlState('danger', 'fields_are_not_filled');
      return;
    }
    this.institutionsService.createBranch(this.institutionId,this.branchData).subscribe((res) => {
      this.router.navigate([`/institutions/${this.institutionId}`]);
    })
  }
}
