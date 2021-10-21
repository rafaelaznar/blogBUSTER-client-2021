import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.css']
})
export class SecretComponent implements OnInit {

  constructor(private _location: Location,
    private oRoute: ActivatedRoute,
    private oRouter: Router) {
    if (oRoute.snapshot.data.message) {
      localStorage.setItem("user", oRoute.snapshot.data.message);      
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    // llamada al secret: subscribirse al observable
  }
  goBack() {
    this._location.back();
  }
}
