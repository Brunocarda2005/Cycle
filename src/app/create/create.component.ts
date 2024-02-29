import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Product } from "../../domain/product";
import { RatingModule } from "primeng/rating";
import { TagModule } from "primeng/tag";
import { FormsModule } from "@angular/forms";
import { AutoCompleteModule } from "primeng/autocomplete";
import { ButtonModule } from "primeng/button";
import { FormGroup } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from "primeng/checkbox";
import { FileUploadModule } from "primeng/fileupload";
import { MessageService } from "primeng/api";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputNumberModule } from "primeng/inputnumber";
import { ToastModule } from "primeng/toast";
import { CommonModule } from '@angular/common';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: "app-create",
  standalone: true,
  imports: [
    ButtonModule,
    AutoCompleteModule,
    InputNumberModule,
    RatingModule,
    ToastModule,
    TagModule,
    InputTextareaModule,
    CommonModule,
    FileUploadModule,
    FormsModule,
    CheckboxModule,
    InputTextModule,
  ],
  templateUrl: "./create.component.html",
  styleUrl: "./create.component.scss",
  providers: [MessageService],
})
export class CreateComponent {
  price: number = 1000.0; // variable para el precio

  formGroup: FormGroup | undefined; // variable para el form

  CreateOn: boolean = false; // variable para desaparecer el create

  selectedValues: [] = []; // valores de etiqueta

  uploadedFiles: any[] = []; // valor del file cargado

  value: any = null; // valor usado para inputs

  @Input() products: Product[]; // lista de productos enviados desde productComponent
  @Output() enviar = new EventEmitter<object>(); // la nueva lista de productos con el producto agregado

  constructor(private messageService: MessageService) {}

  // funcion para subir el archivo
  onUpload(event: UploadEvent) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }


  }

  // seleccionar tags
  onSelect(event: any) {
    this.products = [event.value];
  }


  // Creador de producto nuevo
  onClickCreate() {
    // incial
    let id = "1";

    // id, se suma 1 al anterior id
    if (this.products.length > 0) {
      id = this.products[this.products.length - 1].id + 1;
    }

    // form
    const form = document.getElementById("form");
    // image
    const image =
      this.uploadedFiles[0].objectURL.changingThisBreaksApplicationSecurity;

    // newProduct
    const newProduct: Object = {
      id: id,
      title: form[0].value,
      description: form[1].value,
      price: form[7].value,
      category: this.selectedValues,
      image: image,
    };

    // Agregar el nuevo producto a la lista de productos en el servicio
    this.products.push(newProduct);
    this.enviar.emit(this.products);

    // message
    this.messageService.add({
      severity: "info",
      summary: "Product Uploaded",
      detail: "",
    });

    // Restaurar los valores por defecto o limpiar el formulario
    this.value = null;
    this.selectedValues = [];
    this.price = 100.0;
  }
}
