import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICONS } from 'src/app/interceptor/utils';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public pastRoute: string = '';
  public routerInfo: any = null;

  public icons: string = ICONS;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
}
