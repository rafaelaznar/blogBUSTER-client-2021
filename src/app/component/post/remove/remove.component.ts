import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost } from 'src/app/model/model-interfaces';
import { PaginationService } from 'src/app/service/pagination.service';
import { Location } from '@angular/common';
import { PostService } from 'src/app/service/post.service';
declare let bootstrap: any;

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemovePostComponent implements OnInit {

  id: number = 0;
  oPost: IPost;
  strUsuarioSession: string;

  constructor(
    private oPostService: PostService,
    private oActivatedRoute: ActivatedRoute,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private _location: Location
  ) {

    if (this.oRoute.snapshot.data.message) {
      this.strUsuarioSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", this.oRoute.snapshot.data.message);
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }

    this.id = this.oActivatedRoute.snapshot.params.id
    this.getOne();
  }

  ngOnInit() {
  }

  getOne = () => {
    this.oPostService.getOne(this.id).subscribe((oData: IPost) => {
      this.oPost = oData;
    })
  }

  goBack() {
    this._location.back();
  }

  remove() {
    this.oPostService.removeOne(this.id).subscribe((data: number) => {
      if (data) {
        this.showModal("El post ha sido eliminado", "/plist");
      } else {
        this.showModal("Error en el borrado del post")
      }
    })
  }
  strModalTittle: string = null;
  strModalBody: string = null;

  showModal = (strModalBody: string, url: string = "") => {
    this.strModalTittle = "blogBUSTER";
    this.strModalBody = strModalBody;
    var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
      keyboard: false
    })
    var myModalEl = document.getElementById('myModal')
    myModalEl.addEventListener('hidden.bs.modal', (event) => {
      if (url) {
        this.oRouter.navigate([url]);
      }
    })
    myModal.show()
  }

}
