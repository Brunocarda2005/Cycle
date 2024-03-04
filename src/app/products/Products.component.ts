import { Component } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { FormGroup } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { CreateComponent } from '../create/create.component';
import { MessageService } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    DataViewModule,
    ButtonModule,
    CreateComponent,
    UpdateComponent,
    AutoCompleteModule,
    ToastModule,
    SplitButtonModule,
    CommonModule,
    InputNumberModule,
    UpdateComponent,
    RatingModule,
    TagModule,
    InputTextareaModule,
    FileUploadModule,
    FormsModule,
    CheckboxModule,
    InputTextModule,
  ],
  templateUrl: './Product.component.html',
  styleUrl: './Products.component.scss',
  providers: [MessageService],
})
export class ProductsComponent {
  // lista de productos
  products: Product[];


  // nuevo producto
  newProduct: Array<Object> = [];

  // productos originales
  originalProducts: Product[] = [];

  // form
  formGroup: FormGroup | undefined;

  // serch product
  serchProduct: any[];

  // layout list | grid
  layout: string = 'list';

  // producto seleccionado en el input serch
  selectedProduct: {};

  // filtrar productos mientras buscas en el serch
  filteredProducts: any[] | undefined;

  // on | off create
  CreateOn: boolean = false;

  // on | off update
  UpdateOn: boolean = false;

  // actualizar producto
  updateProduct: any = {};

  constructor(
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  // aparece el create
  save() {
    this.CreateOn = !this.CreateOn;
    document.body.style.overflow = this.CreateOn ? 'hidden' : 'auto';
  }

  // aparece el update
  update(event: any) {
    let id: number = parseInt(event.target.id);

    window.scrollTo(0, 0);
    this.UpdateOn = !this.UpdateOn;
    document.body.style.overflow = this.UpdateOn ? 'hidden' : 'auto';

    for (let i = 0; i < this.products.length; i++) {
      if (parseInt(this.products[i].id) === id) {
        this.updateProduct = this.products[i];
      }
    }
  }

  // borra products por id
  delete(event: any) {
    const idToDelete: string = event.target.id;

    this.messageService.add({
      severity: 'warn',
      summary: 'Delete',
      detail: 'Product Deleted',
    });

    this.products = this.products.filter(
      (product) => parseInt(product.id) !== parseInt(idToDelete)
    );
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().then((data) => {
      this.products = data;
      this.serchProduct = data;
      this.originalProducts = data;
    });
  }

  // filtrador
  filterProduct(event: any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.serchProduct.length; i++) {
      let product = this.serchProduct[i];
      if (product.title.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(product.title);
      }
    }

    this.filteredProducts = filtered;
    this.products = filtered.length > 0 ? filtered : this.originalProducts;
  }

  // hace que el texto que le pases no sea mas largo que tantos caracteres
  truncateTitle(data: any, maxLength: number): string {
    if (data.length > maxLength) {
      return data.substring(0, maxLength) + '...'; // Truncar y agregar puntos suspensivos
    }

    return data;
  }

  // cuando este vacio los productos se vuelvan a poner como los productos originales
  onInput(event: any) {
    if (!event.target.value.trim()) {
      this.products = this.originalProducts;
    }
  }

  // selecciona los productos en el input serch
  onSelect(event: any) {
    this.products = [event.value];
  }

  // abre el create
  onClickCreate() {
    window.scrollTo(0, 0);
    this.save();

    // si esta el newProduct no vacio y createOn esta en false, se guarda newProduct en product
    if (!this.CreateOn && this.newProduct.length != 0) {
      this.products = this.newProduct; // setea los productos viejos a los valores actuales
      this.originalProducts = this.products; // setea los original viejos a los valores actuales
    }
  }

  // abre update
  onClickUpdate() {
    // seccion que abre update
    this.UpdateOn = !this.UpdateOn;
    document.body.style.overflow = this.UpdateOn ? 'hidden' : 'auto';

    // seccion que agrega los nuevos productos al producto original
    if (!this.UpdateOn && this.newProduct.length != 0) {
      this.products = this.newProduct; // setea los productos viejos a los valores actuales
      this.originalProducts = this.products; // setea los original viejos a los valores actuales
    }
  }

  // recive los nuevos productos
  recibirNewProduct(products: Product[]) {
    this.newProduct = [...products];
    this.serchProduct = [...products];
    this.originalProducts = [...products];
  }
}
