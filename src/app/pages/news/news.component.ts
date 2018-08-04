import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Pagination } from '../../common/pagination/pagination';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

    category = 'TINTUC';
    news: [any];
    pagination: Pagination;
    keyword: '';
    constructor( private newsService: NewsService,public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.newsService.getLatestNews({category: this.category, pageNum: 0}, data => {
            this.news = data.data;
            this.pagination = new Pagination({totalPage: data.totalPage, pageNum: data.pageNum});
        }, error => {
            console.log(error);
        });
    }
    deleteNews(news){
        this.newsService.deleteNews(news.idnews, data =>{
        this.toastr.success("Xóa tin tức thành công", "Xóa tin tức");
        this.newsService.getLatestNews({category: this.category, pageNum: 0}, data => {
            this.news = data.data;
            this.pagination = new Pagination({totalPage: data.totalPage, pageNum: data.pageNum});
        }, error => {
            console.log(error);
        })
        }, error => {
            this.toastr.error("Xóa thất bại", "Xóa sản phẩm");
        })
    }
    changeCategory(evt){
        this.newsService.getLatestNews({category: this.category, pageNum: 0}, data => {
            this.news = data.data;
            this.pagination = new Pagination({totalPage: data.totalPage, pageNum: data.pageNum});
        }, error => {
            console.log(error);
        });
    }
    search(){}
}
