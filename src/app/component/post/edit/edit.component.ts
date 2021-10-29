import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IFecha, IPost, IPost2Send } from 'src/app/model/model-interfaces';
import { PostService } from 'src/app/service/post.service';
import { Location } from '@angular/common';
declare let bootstrap: any;

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditPostComponent implements OnInit {

  oPost2Show: IPost = null;
  oPost2Send: IPost2Send = null;
  id: number = null;
  oForm: FormGroup = null;


  get f() { return this.oForm.controls; }

  constructor(private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oPostService: PostService,
    private oActivatedRoute: ActivatedRoute,
    private _location: Location) {

    this.id = this.oActivatedRoute.snapshot.params.id
    this.getOne();

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
      this.oPost2Send = {
        id: this.oForm.value.id,
        titulo: this.oForm.value.titulo,
        cuerpo: this.oForm.value.cuerpo,
        etiquetas: this.oForm.value.etiquetas,
        fecha: this.oForm.value.fecha + " " + this.oForm.value.hora,
        visible: this.oForm.value.visible
      }
      this.update();
    }
  }

  update = () => {
    this.oPostService.updateOne(this.oPost2Send).subscribe((id: number) => {
      if (id) {
        this.oRouter.navigate(['/view/', this.id]);
      } else {
        this.showModal("Error en la modificación del post")
      }
    })
  }

  getDoubleDigitStr = (nData: number): string => {
    if (nData <= 9) {
      return "0" + nData;
    } else {
      return "" + nData;
    }
  }

  getStrFecha = (oFecha: IFecha): string => {
    return oFecha.date.year + "-" + this.getDoubleDigitStr(oFecha.date.month) + "-" + this.getDoubleDigitStr(oFecha.date.day);
  }

  getStrHora = (oFecha: IFecha): string => {
    return this.getDoubleDigitStr(oFecha.time.hour) + ":" + this.getDoubleDigitStr(oFecha.time.minute);
  }


  getOne = () => {
    this.oPostService.getOne(this.id).subscribe((oData: IPost) => {
      this.oPost2Show = oData;
      this.oForm = this.oFormBuilder.group({
        id: [this.oPost2Show.id],
        titulo: [this.oPost2Show.titulo, [Validators.required, Validators.minLength(5)]],
        cuerpo: [this.oPost2Show.cuerpo, Validators.required],
        etiquetas: [this.oPost2Show.etiquetas, Validators.required],
        fecha: [this.getStrFecha(this.oPost2Show.fecha), Validators.required],
        hora: [this.getStrHora(this.oPost2Show.fecha), Validators.required],
        visible: [this.oPost2Show.visible]
      });
    })
  }


  goBack() {
    this._location.back();
  }

}
