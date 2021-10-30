import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IFecha, IPost, IPost2Send } from 'src/app/model/model-interfaces';
import { PostService } from 'src/app/service/post.service';
import { Location } from '@angular/common';

declare let bootstrap: any;
declare let $: any;

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditPostComponent implements OnInit {

  oPost2Show: IPost = null;
  oPost2Send: IPost2Send = null;
  id: number = null;
  oForm: FormGroup = null;
  strUsuarioSession: string;

  get f() { return this.oForm.controls; }

  constructor(private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oPostService: PostService,
    private oActivatedRoute: ActivatedRoute,
    private _location: Location) {

    if (this.oActivatedRoute.snapshot.data.message) {
      this.strUsuarioSession = this.oActivatedRoute.snapshot.data.message;
      localStorage.setItem("user", this.oActivatedRoute.snapshot.data.message);
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }

    this.id = this.oActivatedRoute.snapshot.params.id
    this.getOne();

  }

  ngOnInit(): void {
    $('#fecha').datetimepicker({
      defaultDate: "+1w",
      numberOfMonths: 1,
      dateFormat: 'dd-mm-yy',
      timeFormat: 'hh:mm',
      showAnim: "fold",
      onClose: (dateText: string, inst: any) => {
        this.oForm.controls['fecha'].setValue(dateText);
        this.oForm.controls['fecha'].markAsDirty();
      }
    });
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

  onSubmit(): void {
    if (this.oForm) {
      this.oPost2Send = {
        id: this.oForm.value.id,
        titulo: this.oForm.value.titulo,
        cuerpo: this.oForm.value.cuerpo,
        etiquetas: this.oForm.value.etiquetas,
        fecha: this.getStrFecha2Send(this.oForm.value.fecha), //this.getStrFecha2Send($('#fecha').val()),
        visible: this.oForm.value.visible
      }

      this.update();
    }
  }

  update = () => {
    this.oPostService.updateOne(this.oPost2Send).subscribe((id: number) => {
      if (id) {
        this.showModal("El post ha sido modificado", "/view/" + this.id);
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

  getStrFecha2Show = (oFecha: IFecha): string => {
    return this.getDoubleDigitStr(oFecha.date.day) + "-" + this.getDoubleDigitStr(oFecha.date.month) + "-" + oFecha.date.year + " " + this.getDoubleDigitStr(oFecha.time.hour) + ":" + this.getDoubleDigitStr(oFecha.time.minute);
  }

  getStrFecha2Send = (oFecha: String): string => {
    return oFecha.split(" ")[0].split("-").reverse().join("-") + " " + oFecha.split(" ")[1];
  }

  fechaHoraPattern = "^([1-9]|([012][0-9])|(3[01]))-([0]{0,1}[1-9]|1[012])-\d\d\d\d [012]{0,1}[0-9]:[0-6][0-9]$"

  getOne = () => {
    this.oPostService.getOne(this.id).subscribe((oData: IPost) => {
      this.oPost2Show = oData;
      this.oForm = this.oFormBuilder.group({
        id: [this.oPost2Show.id],
        titulo: [this.oPost2Show.titulo, [Validators.required, Validators.minLength(5)]],
        cuerpo: [this.oPost2Show.cuerpo, Validators.required],
        etiquetas: [this.oPost2Show.etiquetas, Validators.required],
        fecha: [this.getStrFecha2Show(this.oPost2Show.fecha), Validators.required],  //, Validators.pattern(this.fechaHoraPattern)
        visible: [this.oPost2Show.visible]
      });
    })
  }

  goBack() {
    this._location.back();
  }

}
