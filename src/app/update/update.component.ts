import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Product } from "../../domain/product";
import { ProductService } from "../../service/productservice";
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
  selector: "app-uptdate",
  standalone: true,
  imports: [
    ButtonModule,
    AutoCompleteModule,
    InputNumberModule,
    CommonModule,
    RatingModule,
    ToastModule,
    TagModule,
    InputTextareaModule,
    FileUploadModule,
    FormsModule,
    CheckboxModule,
    InputTextModule,
  ],
  templateUrl: "./update.component.html",
  styleUrl: "./uptadate.component.scss",
  providers: [MessageService],
})
export class UpdateComponent {
  price: number = 1000.0; // valor para el precio

  formGroup: FormGroup | undefined; // valor para el form

  UpdateOn: boolean = false; // valor para aparecer update

  selectedValues: [] = []; // valor para las tags

  uploadedFiles: any[] = []; // valor para el file [img]

  value: any = null; // valor para inputs

  updateProduct = ""; // nuevo producto

  // informacion de componente madre
  @Input() inputData: { products: Product[]; updateProduct: any };
  @Output() enviar = new EventEmitter<object>(); // informacion que nosotros mandamos a la madre

  constructor(private messageService: MessageService) {}

  // carga el archivo [img]
  onUpload(event: UploadEvent) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: "info",
      summary: "File Uploaded",
      detail: "",
    });
  }

  // actualiza el producto 
  onClickCreate() {
    // id
    let id = this.inputData.updateProduct.id;

    // valor form
    const form = document.getElementById("form");
    // valor de la imagen 
    const image =
      this.uploadedFiles[0].objectURL.changingThisBreaksApplicationSecurity;

    // nuevo producto que actualiza el viejo
    const newProduct: Object = {
      id: this.inputData.updateProduct.id,
      title: form[0].value,
      description: form[1].value,
      price: form[7].value,
      category: this.selectedValues,
      image: image,
    };

    // Agregar el producto editado a la lista de productos en el servicio
    this.inputData.products[id - 1] = newProduct;
    this.enviar.emit(this.inputData.products);

    // mensaje alert no invasivo
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
