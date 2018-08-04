import { Routes, RouterModule } from '@angular/router';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { NgModule } from '@angular/core';
import { Angular2ImageGalleryModule } from 'angular2-image-gallery';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import { HeaderComponent } from './common/header/header.component';
import { LeftMenuComponent } from './common/left-menu/left-menu.component';
import { CreateProductComponent } from './pages/product/create-product/create-product.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ImageUploadModule } from "angular2-image-upload";
import { AudioService } from './services/audio.service';
import { CategoryService } from './services/category.service';
import { RemoveTagPipe } from './pipes/remove-tag.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { NewsComponent } from './pages/news/news.component';
import { NewsService } from './services/news.service';
import { PaginationComponent } from './common/pagination/pagination.component';
import { DetailNewsComponent } from './pages/news/detail-news/detail-news.component';
import { SlideComponent } from './pages/slide/slide.component';
import { SlideService } from './services/slide.service';
import { SlideDetailComponent } from './pages/slide-detail/slide-detail.component';
const appRoutes: Routes = [
    { path: '', redirectTo: '/danh-sach-san-pham', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'san-pham/:id', component: CreateProductComponent },
    { path: 'tin-tuc/:id', component: DetailNewsComponent },
    { path: 'danh-sach-san-pham', component: ProductComponent},
    { path: 'danh-sach-tin-tuc', component: NewsComponent},
    { path: 'danh-sach-slides', component: SlideComponent},
    { path: 'slide/:id', component: SlideDetailComponent},
];
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ProductComponent,
        HeaderComponent,
        LeftMenuComponent,
        CreateProductComponent,
        RemoveTagPipe,
        SafeHtmlPipe,
        GalleryComponent,
        NewsComponent,
        PaginationComponent,
        DetailNewsComponent,
        SlideComponent,
        SlideDetailComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
        ImageUploadModule.forRoot(),
        HttpClientModule,
        ToastModule.forRoot(),
        BrowserAnimationsModule,
        Angular2ImageGalleryModule
    ],
    providers: [
        Location, {provide: LocationStrategy, useClass: HashLocationStrategy},
        AudioService, CategoryService, NewsService, SlideService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
