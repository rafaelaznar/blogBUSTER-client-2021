import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost, IPost2Send } from 'src/app/model/model-interfaces';
import { PostService } from 'src/app/service/post.service';
import { Location } from '@angular/common';

declare let bootstrap: any;
declare let $: any;

@Component({
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})

export class NewPostComponent implements OnInit {

  oPost2Send: IPost2Send = null;
  strUsuarioSession: string;

  oForm = this.oFormBuilder.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    cuerpo: ['', Validators.required],
    etiquetas: ['', Validators.required],
    fecha: ['', Validators.required],
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


  getStrFecha2Send = (oFecha: String): string => {
    return oFecha.split(" ")[0].split("-").reverse().join("-") + " " + oFecha.split(" ")[1];
  }

  onSubmit(): void {
    if (this.oForm) {
      this.oPost2Send = {
        id: null,
        titulo: this.oForm.value.titulo,
        cuerpo: this.oForm.value.cuerpo,
        etiquetas: this.oForm.value.etiquetas,
        fecha: this.getStrFecha2Send(this.oForm.value.fecha),
        visible: this.oForm.value.visible
      }
      this.new();
    }
  }

  new = () => {
    this.oPostService.newOne(this.oPost2Send).subscribe((id: number) => {
      if (id) {
        this.showModal("El post se ha creado correctamente", "/view/" + id)
      } else {
        this.showModal("Error en la creación del registro")
      }
    })
  }

  goBack() {
    this._location.back();
  }

}
