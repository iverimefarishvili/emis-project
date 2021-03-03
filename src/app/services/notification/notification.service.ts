import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NotificationService {
  public growl$: Observable<string[]>;
  public loading$: Observable<boolean>;
  private growl: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.growl$ = this.growl.asObservable();
    this.loading$ = this.loading.asObservable();
  }

  public changeLoadingState(loading: boolean): void {
    this.loading.next(loading);
  }

  public changeGrowlState(type: string, message: string, notTranslateAble?: string): void {
    if (notTranslateAble) {
      this.growl.next([type, message, notTranslateAble]);
    } else {
      this.growl.next([type, message]);
    }
  }
}
