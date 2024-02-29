// module
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


// component
import { NavComponent } from "./nav/nav.component";
import { ProductsComponent } from "./products/Products.component";
import { AppRoutingModule } from "./app-routing.module.ts";
import { AppComponent } from "./app.component";
import { MessageService } from "primeng/api";
import { ProductService } from "../service/productservice";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    NavComponent,
    ProductsComponent,
    AppRoutingModule,
    RouterModule.forRoot([{ path: "", component: AppComponent }]),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [ProductService, MessageService],
})
export class AppModule {}
