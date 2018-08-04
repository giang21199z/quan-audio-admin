import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { AudioService } from '../../../services/audio.service';
import { ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { error } from 'protractor';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit, OnDestroy {
  audio = {
    idaudio: -1,
    name: '',
    price: 0,
    condition: '',
    brand: '',
    image: [],
    idtype: 0,
    description: 'Quanaudio.vn',
    category: 0,
    sale: ''
  }
  category: any;
  options = {
    imageUploadParam: 'image',
    imageUploadURL: 'http://release.quanaudio.vn/upload',
    imageUploadMethod: 'POST',
    imageManagerLoadURL: 'http://release.quanaudio.vn/upload/gallery.php',
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
  }
  private sub: any;
  private id;
  constructor(private categoryService: CategoryService, private audioService: AudioService,
    private route: ActivatedRoute,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
     }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
        this.categoryService.getAllCategory(data => {
            this.category = data;
            console.log(this.audio);
            this.id = +params['id'];
            if(this.id !== -1){
                this.audioService.getDetailAudioById(this.id, data => {
                    this.audio.idaudio = data.idaudio;
                    this.audio.name = data.name;
                    this.audio.price = data.price;
                    this.audio.brand = data.brand;
                    this.audio.description = data.description;
                    this.audio.sale = data.sale;
                    this.audio.idtype = data.type.idtype;
                    for(const category of this.category){
                        if(category.id == this.audio.idtype){
                            this.audio.category = category;
                            break;
                        }
                    }
                    console.log('data', this.audio);
                }, error => {
                    console.log(error)
                });
            }
          }, error => {
            console.log(error);
          })
        
     });
  }

  updateProduct(){
      if(this.id == -1){
        this.audioService.postNewAudio(this.audio, data => {
            this.toastr.success("Thêm mới thành công", "Thêm sản phẩm");
          }, error => {
              this.toastr.error("Thêm mới thất bại", "Thêm sản phẩm");
          })
      } else {
          this.audioService.putUpdateAudio(this.id, this.audio, data=>{
            this.toastr.success("Cập nhật sản phẩm thành công", "Cập nhật sản phẩm");
          }, error => {
            this.toastr.error("Cập nhật sản phẩm thất bại", "Cập nhật sản phẩm");
          });
      }
  }

  onUploadFinished(evt){
    const urlFile = evt.serverResponse.response.url + evt.serverResponse.response._body;
    this.audio.image.push(urlFile);
    this.toastr.success("Cập nhật ảnh thành công", "Upload ảnh");
  }
  onUploadNewsFinished(evt){
    this.toastr.success("Cập nhật ảnh thành công", "Upload ảnh");
  }
  
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
