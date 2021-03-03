import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InstitutionsService } from 'src/app/services/institutions/institutions.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-add-personal',
  templateUrl: './add-personal.component.html',
  styleUrls: ['./add-personal.component.scss']
})
export class AddPersonalComponent implements OnInit {
  public routeSub: Subscription;

  public personalData: any = {
    pid: '',
    name: ''
  };

  public institutionId: number = null;
  public branchId: number = null;

  constructor(
    private notificationService: NotificationService, 
    private institutionsService: InstitutionsService, 
    private route: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.institutionId = params['id'];
      this.branchId = params['id1'];
    });
  }

  public createPersonal(): void {
    if(this.personalData.pid === '' || this.personalData.name === '') {
      this.notificationService.changeGrowlState('danger', 'fields_are_not_filled');
      return;
    }
    this.institutionsService.createPersonal(this.institutionId,this.branchId,this.personalData).subscribe((res) => {
      this.router.navigate([`/institutions/${this.institutionId}/branches/${this.branchId}`]);
    })
  }

}
