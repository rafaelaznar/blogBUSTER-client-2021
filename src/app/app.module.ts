import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { SecretComponent } from './component/secret/secret.component';
import { LogoutComponent } from './component/logout/logout.component';
import { MenuComponent } from './component/menu/menu.component';
import { SessionService } from './service/session.service';
import { HttpClientModule } from "@angular/common/http";
import { SessionResolver } from './resolve/session.resolve';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SecretComponent,
    LogoutComponent,
    MenuComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SessionService,SessionResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
