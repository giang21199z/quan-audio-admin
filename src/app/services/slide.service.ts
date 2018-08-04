import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { APP_CONSTANTS } from '../common/config/constants';
import { News } from '../entities/news';
import { Response } from '../entities/response';
import { Slide } from '../entities/slide';
@Injectable()
export class SlideService {

constructor(private http:HttpClient) { }

    /**
     * get slide
     */
    getSlides(requestParams, successCb, errorCb){
        this.http.get(APP_CONSTANTS.URL_GET_SLIDE)
        .subscribe(data => {
            successCb(this.mappingData(data))
        }, error => errorCb);
    }

    mappingData(data){
        let slides = [];
        for(let item of data){
            const idslide = item.idslide;
            const title = item.title;
            const description = item.description;
            const content = item.content;
            const advertisement = item.advertisement;
            const image = item.image;
            const mSlide = new Slide({
                idslide: idslide, title: title, description: description,
                content: content, advertisement: advertisement, image: image
            });
            slides.push(mSlide);
        }
        // const response = new Response({totalPage: data.totalPage, pageNum: data.pageNum, data: slides});
        return slides;
    }

    /**
     * get slide
     */
    getDetailSlide(id, successCb, errorCb){
        this.http.get(APP_CONSTANTS.URL_GET_SLIDE_DETAIL + '/' + id)
        .subscribe(data => {
            successCb(this.mappingDetailSlide(data));
        }, error => errorCb);
    }

    mappingDetailSlide(item){
        const idslide = item.idslide;
        const title = item.title;
        const description = item.description;
        const content = item.content;
        const advertisement = item.advertisement;
        const image = item.image;
        const mSlide = new Slide({
            idslide: idslide, title: title, description: description,
            content: content, advertisement: advertisement, image: image
        });
        return mSlide;
    }

    putUpdateSlide(id, data, successCb, errorCb){
        const dataPut = this.mappingUpdate(data);
        this.http.put(APP_CONSTANTS.URL_PUT_SLIDE + '/' + id, dataPut)
            .subscribe(data => {
                successCb(data)
            }, error => errorCb);
    }

    mappingUpdate(data){
        return {
            title: data.title,
            description: data.description,
            image: data.image,
            content: data.content,
            advertisement: data.advertisement
        }
    }
}
