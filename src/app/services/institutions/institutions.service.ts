import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { COREAPI } from 'src/app/interceptor/utils';

@Injectable({
  providedIn: 'root'
})
export class InstitutionsService {

  // Observable string sources
  private passData = new Subject<string>();

  // Observable string streams
  passData$ = this.passData.asObservable();

  constructor(private http: HttpClient) {
  }

  // Service message commands
  public announceData(data: string) {
    this.passData.next(data);
  }

  public getInstitutions(object?: any): Observable<any> {
    let params = new HttpParams();
    if(object) {
      params = params.append('page', object.page);
      params = params.append('name', object.name);
      params = params.append('pid', object.pid);
    }
    
    return this.http.get(`${COREAPI}institutions`, { params: params });
  }

  public createInstitution(object: any): Observable<any> {
    return this.http.post(`${COREAPI}institutions/create`, object);
  }

  public getInstitutionInfo(id: number): Observable<any> {
    return this.http.get(`${COREAPI}institutions/${id}`);
  }

  public updateInstitution(id: number, object: any): Observable<any> {
    return this.http.put(`${COREAPI}institutions/${id}`, object);
  }

  public getInstitutionDetail(id: number): Observable<any> {
    return this.http.get(`${COREAPI}institutions/${id}`);
  }

  public getBranches(id: number): Observable<any> {
    return this.http.get(`${COREAPI}institutions/${id}/branches`);
  }

  public getBranchDetail(id: number, branchId: number): Observable<any> {
    return this.http.get(`${COREAPI}institutions/${id}/branches/${branchId}`);
  }
  
  public createBranch(id: number, object: any): Observable<any> {
    return this.http.post(`${COREAPI}institutions/${id}/branches/create`, object);
  }

  public updateBranch(id: number, branchId: number, object: any): Observable<any> {
    return this.http.put(`${COREAPI}institutions/${id}/branches/${branchId}`, object);
  }


  public getPersonal(id: number, branchId: number): Observable<any> {
    return this.http.get(`${COREAPI}institutions/${id}/branches/${branchId}/personal`);
  }

  public getPersonalDetail(id: number, branchId: number, personalId: number): Observable<any> {
    return this.http.get(`${COREAPI}institutions/${id}/branches/${branchId}/personal/${personalId}`);
  }
  
  public createPersonal(id: number,branchId: number, object: any): Observable<any> {
    return this.http.post(`${COREAPI}institutions/${id}/branches/${branchId}/personal/create`, object);
  }

  public updatePersonal(id: number, branchId: number,personalId: number, object: any): Observable<any> {
    return this.http.put(`${COREAPI}institutions/${id}/branches/${branchId}/personal/${personalId}`, object);
  }
}
