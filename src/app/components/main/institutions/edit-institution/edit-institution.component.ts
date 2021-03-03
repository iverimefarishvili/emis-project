import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InstitutionsService } from 'src/app/services/institutions/institutions.service';

@Component({
  selector: 'app-edit-institution',
  templateUrl: './edit-institution.component.html',
  styleUrls: ['./edit-institution.component.scss']
})
export class EditInstitutionComponent implements OnInit, OnDestroy {
  public getDataSubscription: Subscription;
  public routeSub: Subscription;

  public institutionData: any = {
    pid: '',
    name: '',
    number: ''
  };

  public institutionItem:any;

  constructor(private institutionsService: InstitutionsService, private route: ActivatedRoute, private router: Router) { 
    // this.getDataSubscription = institutionsService.passData$.subscribe(
    //   data => {
    //     console.log(data);
    //     this.institutionItem = data;
    //     this.institutionData.name = this.institutionItem.name;
    //     this.institutionData.number = this.institutionItem.number;
    //     this.institutionData.pid = this.institutionItem.pid;
    // });
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.getInstitutionData(params['id']);
    });
  }

  public getInstitutionData(id: number): void {
    this.institutionsService.getInstitutionDetail(id).subscribe((res) => {
      this.institutionItem = res;
        this.institutionData.name = this.institutionItem.name;
        this.institutionData.number = this.institutionItem.number;
        this.institutionData.pid = this.institutionItem.pid;
    })
  }

  public updateInstitution(): void {
    this.institutionsService.updateInstitution(this.institutionItem.id, this.institutionData).subscribe((res) => {
      this.router.navigate(['/institutions']);
    })
  }

  ngOnDestroy(): void {
    // this.getDataSubscription.unsubscribe();
    this.routeSub.unsubscribe();
  }

}
