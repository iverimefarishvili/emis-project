import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class NonAuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  public canActivate(): boolean {
    if (!localStorage.getItem('access_token')) {
      localStorage.clear();
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
