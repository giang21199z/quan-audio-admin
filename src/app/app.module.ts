import { Routes, RouterModule } from '@angular/router';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import { HeaderComponent } from './common/header/header.component';
import { LeftMenuComponent } from './common/left-menu/left-menu.component';
import { CreateProductComponent } from './pages/product/create-product/create-product.component';
const appRoutes: Routes = [
    { path: '', redirectTo: '/tao-moi-san-pham', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'tao-moi-san-pham', component: CreateProductComponent },
];
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ProductComponent,
        HeaderComponent,
        LeftMenuComponent,
        CreateProductComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
    ],
    providers: [
        Location, {provide: LocationStrategy, useClass: HashLocationStrategy},
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
