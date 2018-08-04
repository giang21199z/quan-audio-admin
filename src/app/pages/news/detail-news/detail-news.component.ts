import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { CategoryService } from '../../../services/category.service';

import { ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { error } from 'protractor';
import { NewsService } from '../../../services/news.service';
@Component({
  selector: 'app-detail-news',
  templateUrl: './detail-news.component.html',
  styleUrls: ['./detail-news.component.css']
})
export class DetailNewsComponent implements OnInit {
  news = {
    idnews: -1,
    title: '',
    description: '',
    content: 'Quanaudio.vn',
    image: '',
    category: 1
  }
  categorires = [
    {id: 1, name: 'Tin tức'},
    {id: 2, name: 'Công trình hoàn thành'}    
  ]
  options = {
    imageUploadParam: 'image',
    imageUploadURL: 'http://release.quanaudio.vn/upload',
    imageUploadMethod: 'POST',
    imageManagerLoadURL: 'http://release.quanaudio.vn/upload/gallery.php',
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
  }
  private sub: any;
  private id;
  constructor(private newsService: NewsService,
    private route: ActivatedRoute,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
     }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            if(this.id !== -1){
                this.newsService.getDetailNew(this.id, data => {
                    this.news.idnews = data.idnews;
                    this.news.title = data.title;
                    this.news.description = data.description;
                    this.news.content = data.content;
                    this.news.image = data.image;
                }, error => {
                    console.log(error)
                });
            }
     });
  }

  updateNews(){
      if(this.id == -1){
        this.newsService.postNewNews(this.news, data => {
            this.toastr.success("Thêm mới tin tức thành công", "Thêm tin tức");
          }, error => {
              this.toastr.error("Thêm mới tin tức", "Thêm tin tức");
          })
      } else {
          this.newsService.putUpdateNews(this.id, this.news, data=>{
            this.toastr.success("Cập nhật tin tức thành công", "Cập nhật tin tức");
          }, error => {
            this.toastr.error("Cập nhật tin tức thất bại", "Cập nhật tin tức");
          });
      }
  }

  onUploadFinished(evt){
    const urlFile = evt.serverResponse.response.url + evt.serverResponse.response._body;
    this.news.image = urlFile;
    this.toastr.success("Cập nhật ảnh thành công", "Upload ảnh");
  }
  onUploadNewsFinished(evt){
    this.toastr.success("Cập nhật ảnh thành công", "Upload ảnh");
  }
  
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
