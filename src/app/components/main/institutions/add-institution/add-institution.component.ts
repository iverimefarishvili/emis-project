import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstitutionsService } from 'src/app/services/institutions/institutions.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-add-institution',
  templateUrl: './add-institution.component.html',
  styleUrls: ['./add-institution.component.scss']
})
export class AddInstitutionComponent implements OnInit {
  public institutionData: any = {
    pid: '',
    name: '',
    number: ''
  }

  constructor(private institutionsService: InstitutionsService, private notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {
  }

  public createInstitution(): void {
    if(this.institutionData.pid === '' || this.institutionData.name === '' || this.institutionData.number === '' ) {
      this.notificationService.changeGrowlState('danger', 'fields_are_not_filled');
      return;
    }
    this.institutionsService.createInstitution(this.institutionData).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/institutions']);
    })
  }

}
