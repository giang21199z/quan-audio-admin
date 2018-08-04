import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SlideService } from '../../services/slide.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-slide-detail',
  templateUrl: './slide-detail.component.html',
  styleUrls: ['./slide-detail.component.css']
})
export class SlideDetailComponent implements OnInit, OnDestroy {

  private sub: any;
  private id: any;
  public slide = {
    idslide: 0,
    title: '',
    description: '',
    content: '',
    image: '',
    advertisement: ''
  };
  public isShowImage = true;
  public isShowAdvertisement = true;
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef,
  private slideService: SlideService, private route: ActivatedRoute,) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.slideService.getDetailSlide(this.id, data => {
        this.slide.idslide = +this.id;
        this.slide.title = data.title;
        this.slide.description = data.description;
        this.slide.content = data.content;
        this.slide.image = data.image;
        this.slide.advertisement = data.advertisement;
    }, error => {
        console.log(error)
    });
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  onUploadFinished(evt){
    const urlFile = evt.serverResponse.response.url + evt.serverResponse.response._body;
    this.slide.image = urlFile;
    this.isShowImage = false;
    this.toastr.success("Cập nhật ảnh thành công", "Upload ảnh");
  }

  onUploadAdvertisementFinished(evt){
    const urlFile = evt.serverResponse.response.url + evt.serverResponse.response._body;
    this.slide.advertisement = urlFile;
    this.isShowAdvertisement = false;
    this.toastr.success("Cập nhật ảnh thành công", "Upload ảnh");
  }
  updateSlide(){
    this.slideService.putUpdateSlide(this.id, this.slide, data=>{
        this.toastr.success("Cập nhật slide thành công", "Cập nhật slide");
      }, error => {
        this.toastr.error("Cập nhật slide tức thất bại", "Cập nhật slide");
      });
  }
}
