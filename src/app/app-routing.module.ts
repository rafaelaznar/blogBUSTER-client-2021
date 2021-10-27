import { LoginComponent } from './component/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LogoutComponent } from './component/logout/logout.component';
import { SessionResolver } from './resolve/session.resolve';
import { PlistPostComponent } from './component/post/plist/plist.component';
import { ViewPostComponent } from './component/post/view/view.component';


const routes: Routes = [
  { path: '', component: HomeComponent, resolve: { message: SessionResolver } },
  { path: 'home', component: HomeComponent, resolve: { message: SessionResolver } },
  { path: 'login', component: LoginComponent, resolve: { message: SessionResolver } },
  { path: 'logout', component: LogoutComponent, resolve: { message: SessionResolver } },  
  { path: 'plist', component: PlistPostComponent, resolve: { message: SessionResolver } },
  { path: 'view/:id', component: ViewPostComponent, resolve: { message: SessionResolver } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
