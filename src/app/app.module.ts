import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { MainComponent } from './components/main/main.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor/interceptor';
import { NotificationService } from './services/notification/notification.service';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Err500Component } from './shared/err500/err500.component';
import { Err404Component } from './shared/err404/err404.component';
import { FormsModule } from '@angular/forms';
import { GrowlComponent } from './shared/growl/growl.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { CommonModule } from '@angular/common';
import { MainModule } from './components/main/main.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const routes: Routes = [
  {path: '', loadChildren: () => import('./components/main/main.module').then(m => m.MainModule)},
  {path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)},
  {path: 'error-500', component: Err500Component},
  {path: 'error-404', component: Err404Component},
  {path: '**', redirectTo: 'error-404'}
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    Err500Component,
    Err404Component,
    LoaderComponent,
    GrowlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MainModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {
      useHash: Boolean(history.pushState) === false
    })
  ],
  providers: [
    NotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
