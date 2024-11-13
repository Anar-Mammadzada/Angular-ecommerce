import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [
  {path : "category/:id", component : ProductListComponent},
  {path : "category", component : ProductListComponent},
  {path : "products", component : ProductListComponent},
  {path : "", redirectTo : "/products", pathMatch : "full"},
  {path : "**", redirectTo : "/products", pathMatch : "full"}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
