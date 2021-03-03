import { Component, OnInit } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import { ICONS } from 'src/app/interceptor/utils';
import { NotificationService } from 'src/app/services/notification/notification.service';


@Component({
  selector: 'growl',
  templateUrl: 'growl.component.html',
  styleUrls: ['growl.component.scss'],
  animations: [
    trigger(
      'growlState', [
        transition(':enter', [
          style({opacity: 0}),
          animate('500ms', style({opacity: 1}))
        ]),
        transition(':leave', [
          style({opacity: 1}),
          animate('900ms', style({opacity: 0}))
        ])
      ]
    )
  ]
})

export class GrowlComponent implements OnInit {
  public iconPath: string = ICONS;
  public message: string = '';
  public additionMessage: string = '';
  public display: boolean = false;
  public type: string = '';

  constructor(private notificationService: NotificationService) {
  }

  public ngOnInit(): void {
    this.notificationService.growl$.subscribe((params) => {
      if (params.length !== 0) {
        if (params[0] === '' && params[1] === '') {
          return;
        }
        this.display = true;
        this.type = params[0];
        this.message = params[1];
        if (params[2]) {
          this.additionMessage = params[2]
        }
        setTimeout(() => {
          this.display = false;
          this.additionMessage = '';
        }, 3000);
      }
    });
  }
}
