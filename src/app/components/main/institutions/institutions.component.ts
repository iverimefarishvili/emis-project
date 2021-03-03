import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstitutionsService } from 'src/app/services/institutions/institutions.service';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.scss']
})
export class InstitutionsComponent implements OnInit {

  public tableData: any = [];
  public pages: number[] = [];

  public searchQuery: any = {
    page: '',
    pid: '',
    name:''
  };

  public identification: string = '';
  public name: string = '';

  constructor(private institutionsService: InstitutionsService, public router: Router) { }

  ngOnInit(): void {
    this.getInstitutions();
  }

  public getInstitutions(): void {
    this.tableData = [];
    this.institutionsService.getInstitutions(this.searchQuery).subscribe((res) => {
        console.log(res);
        this.tableData = res.data;
        this.pages = [];
        for(let i = 1; i <= res.last_page; i++) {
          this.pages.push(i);
        }
    })
  }

  public pageChange(pageNumber: number): void {
    this.searchQuery.page = pageNumber;
    this.getInstitutions();
  }

  public searchInstitution(): void {
    this.searchQuery.pid = this.identification;
    this.searchQuery.name = this.name;
    this.getInstitutions();
  }

  public editInstitution(item: any): void {
    this.router.navigate([`institutions/${item.id}/edit`]);
    // setTimeout(() => {
    //   this.institutionsService.announceData(item);
    // })
  }

  public viewInstitution(item: any): void {
    this.router.navigate([`institutions/${item.id}`]);
    // setTimeout(() => {
    //   this.institutionsService.announceData(item);
    // })
  }
}
