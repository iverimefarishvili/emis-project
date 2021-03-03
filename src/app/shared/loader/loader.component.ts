import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})

export class LoaderComponent implements OnInit {
  public isLoaderActive: boolean = false;

  constructor(private notificationService: NotificationService) {
  }

  public ngOnInit(): void {
    this.notificationService.loading$.subscribe((changeLoaderState) => {
      this.isLoaderActive = changeLoaderState;
    });
  }
}
