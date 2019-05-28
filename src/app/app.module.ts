import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { baseURL } from 'src/shared/baseURL';
import { IonicStorageModule } from '@ionic/storage';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginPage } from './login/login.page';

@NgModule({
  declarations: [AppComponent, LoginPage],
  entryComponents: [LoginPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
    IonicStorageModule.forRoot() , FormsModule, ReactiveFormsModule,

  HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy } ,
    { provide:'baseURL' , useValue: baseURL}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
