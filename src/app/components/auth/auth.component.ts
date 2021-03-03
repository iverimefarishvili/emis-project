import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public user: any = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  public ngOnInit(): void {
    console.log(this.user);
  }

  public onSubmit(): void {
    this.authService.login(this.user).subscribe((res) => {
      console.log(res);
      localStorage.setItem('access_token', res.token);
      this.router.navigate(['/']);
    })
  }

}
