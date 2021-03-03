import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InstitutionsService } from 'src/app/services/institutions/institutions.service';

@Component({
  selector: 'app-view-institution',
  templateUrl: './view-institution.component.html',
  styleUrls: ['./view-institution.component.scss']
})
export class ViewInstitutionComponent implements OnInit, OnDestroy {
  public getDataSubscription: Subscription;
  public routeSub: Subscription;

  public institutionItem:any = {};

  public tableData: any = [];

  constructor(private institutionsService: InstitutionsService, private route: ActivatedRoute, public router: Router) { 
    // this.getDataSubscription = institutionsService.passData$.subscribe(
    //   data => {
    //     console.log(data);
    //     this.institutionItem = data;
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
      this.getBranches();
    })
  }

  public getBranches(): void {
    this.tableData = [];
    this.institutionsService.getBranches(this.institutionItem.id).subscribe((res) => {
      console.log(res);
      this.tableData = res.data;
    })
  }

  public createBranch(): void {
    this.router.navigate([`institutions/${this.institutionItem.id}/branches/create`])
  }

  public editInstitution(item: any): void {
    this.router.navigate([`institutions/${this.institutionItem.id}/branches/${item.id}/edit`]);
  }

  public viewInstitution(item: any): void {
    this.router.navigate([`institutions/${this.institutionItem.id}/branches/${item.id}`]);
  }

  ngOnDestroy(): void {
    // this.getDataSubscription.unsubscribe();
    this.routeSub.unsubscribe();
  }

}
