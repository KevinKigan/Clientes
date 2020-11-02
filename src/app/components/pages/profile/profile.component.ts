import { Component, OnInit, Input } from '@angular/core';



import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import {ClienteService} from '../../services/cliente.service';
import {ModalService} from '../../services/modal.service';
import {Cliente} from '../clientes/cliente';

@Component({
  selector: 'profile-client',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() cliente: Cliente;

  titulo: string = "Perfil del cliente";
  selectedImage: File;
  progress: number = 0;

  constructor(private clienteService: ClienteService,
    public modalService: ModalService) { }

  ngOnInit() { }

  selectFoto(event) {
    this.selectedImage = event.target.files[0];
    this.progress = 0;
    if (this.selectedImage.type.indexOf('image') < 0) {
      // @ts-ignore
      swal('Error seleccionar imagen: ', 'El archivo debe ser del tipo imagen', 'error');
      this.selectedImage = null;
    }
  }

  uploadFoto() {

    if (!this.selectedImage) {
      // @ts-ignore
      swal('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else {
      this.clienteService.uploadPhoto(this.selectedImage, this.cliente.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.cliente = response.cliente as Cliente;

            this.modalService.notifyUpload.emit(this.cliente);
            // @ts-ignore
            swal('La foto se ha subido completamente!', response.mensaje, 'success');
          }
        });
    }
  }

  closeModal() {
    this.modalService.closeModal();
    this.selectedImage = null;
    this.progress = 0;
  }

}
