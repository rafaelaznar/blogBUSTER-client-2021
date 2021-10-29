import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost, IPost2Send } from 'src/app/model/model-interfaces';
import { PostService } from 'src/app/service/post.service';
import { Location } from '@angular/common';
declare let bootstrap: any;

@Component({
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})

export class NewPostComponent implements OnInit {

  oPost: IPost2Send = null;
  strUsuarioSession: string;

  oForm = this.oFormBuilder.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    cuerpo: ['', Validators.required],
    etiquetas: ['', Validators.required],
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    visible: ['']
  });

  get f() { return this.oForm.controls; }

  constructor(private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oRoute: ActivatedRoute,
    private oPostService: PostService,
    private _location: Location) {

      if (this.oRoute.snapshot.data.message) {
        this.strUsuarioSession = this.oRoute.snapshot.data.message;
        localStorage.setItem("user", this.oRoute.snapshot.data.message);
      } else {
        localStorage.clear();
        oRouter.navigate(['/home']);
      }

     }

  ngOnInit(): void {
  }

  strModalTittle: string = null;
  strModalBody: string = null;

  showModal = (strModalBody: string) => {
    this.strModalTittle = "blogBUSTER";
    this.strModalBody = strModalBody;
    var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
      keyboard: false
    })
    myModal.show()
  }

  onSubmit(): void {
    if (this.oForm) {
      this.oPost = {
        id: null,
        titulo: this.oForm.value.titulo,
        cuerpo: this.oForm.value.cuerpo,
        etiquetas: this.oForm.value.etiquetas,
        fecha: this.oForm.value.fecha + " " + this.oForm.value.hora,
        visible: this.oForm.value.visible
      }
      this.new();
    }
  }

  new = () => {
    this.oPostService.newOne(this.oPost).subscribe((id: number) => {
      if (id) {
        this.oRouter.navigate(['/view/', id]);
      } else {
        this.showModal("Error en la creación del registro")
      }
    })
  }

  goBack() {
    this._location.back();
  }

}
