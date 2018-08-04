import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    datas = [];
    activeItem: any;
    activeSlide = 0;
    keyword = '';
    constructor(private audioService: AudioService,
        public toastr: ToastsManager, vcr: ViewContainerRef) {
            this.toastr.setRootViewContainerRef(vcr);
         }

    ngOnInit() {
        this.audioService.getAllAudios(null, data => {
            this.datas = data;
        }, error => {
            console.log(error);
        })
    }

    changeItem(audio){
        this.activeItem = audio;
    }
    deleteAudio(audio){
        this.audioService.deleteAudio(audio.idaudio, data =>{
            this.toastr.success("Xóa sản phẩm thành công", "Xóa sản phẩm");
            this.audioService.getAllAudios(null, data => {
                this.datas = data;
            }, error => {
                console.log(error);
            })
        }, error => {
            this.toastr.error("Xóa thất bại", "Xóa sản phẩm");
        })
    }
    onUploadFinished(evt){
        const urlFile = evt.serverResponse.response.url + evt.serverResponse.response._body;
        this.activeItem.image[this.activeSlide] = urlFile;
        this.toastr.success("Upload ảnh thành công", "Upload ảnh");
    }
    onUploadFinishAdded(evt){
        const urlFile = evt.serverResponse.response.url + evt.serverResponse.response._body;
        this.activeItem.image.push(urlFile);
        this.toastr.success("Upload ảnh thành công", "Upload ảnh");
    }
    slideEvent(type){
        if(type === 'next'){
            this.activeSlide++;
            this.activeSlide = this.activeSlide === this.activeItem.image.length ?
                0 : this.activeSlide;
        }else{
            this.activeSlide++;
            this.activeSlide = this.activeSlide === -1 ?
            this.activeItem.image.length - 1 : this.activeSlide;
        }
    }
    closeModal(){
        this.activeItem = null;
    }
    saveModal(){
        this.audioService.putUpdateImage(
            this.activeItem.idaudio,
            {image: JSON.stringify(this.activeItem.image)},
        data => {
            console.log(data);
            this.activeItem = null;
        }, error => {
            console.log(error);
            this.activeItem = null;
        });
    }
    search(){
        const requestParam = {
            keyword: this.keyword
        }
        this.audioService.getAllAudios(requestParam, data => {
            this.datas = data;
        }, error => {
            this.toastr.error("Tìm kiếm sản phẩm thất bại", "Tìm kiếm sản phẩm");
        })
    }
}
