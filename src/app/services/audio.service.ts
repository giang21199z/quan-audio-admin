import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { APP_CONSTANTS } from '../common/config/constants';
import { Audio } from '../entities/audio';
import { Type } from '../entities/type';
@Injectable()
export class AudioService {

constructor(private http:HttpClient) { }

    /**
     * get audio for home page
     */
    getAllAudios(requestParams, successCb, errorCb){
        if(requestParams != null){
            let params = '?';
            if(requestParams.keyword != null){
                params +='&keyword=' + requestParams.keyword;
            }
            if(requestParams.limit != null){
                params +='&limit=' + requestParams.limit;
            }
            if(requestParams.offset != null){
                params +='&offset=' + requestParams.offset;
            }
            this.http.get(APP_CONSTANTS.URL_GET_AUDIO + params)
            .subscribe(data => {
                successCb(this.mappingData(data))
            }, error => errorCb);
        } else {
            this.http.get(APP_CONSTANTS.URL_GET_AUDIO)
            .subscribe(data => {
                successCb(this.mappingData(data))
            }, error => errorCb);
        }
        
    }

    /**
     * get audio for home page
     */
    getAudiosByType(idtype, successCb, errorCb){
        this.http.get(APP_CONSTANTS.URL_GET_AUDIO_BY_TYPE + '/' + idtype)
        .subscribe(data => {
            successCb(this.mappingData(data))
        }, error => errorCb);
    }

    mappingData(datas): any{
        let result = [];
        for(const data of datas){
            data.image = JSON.parse(data.image);
            result.push(data);
        }
        return result;
    }

    /**
     * get detail audio
     */
    getDetailAudioById(id, successCb, errorCb){
        this.http.get(
            APP_CONSTANTS.URL_GET_DETAIL_AUDIO + '/' + id
        ).subscribe(data => {
            successCb(this.mappingDetailAudio(data))
        }, error => errorCb);
    }
    mappingDetailAudio(data){
        const idaudio = data.idaudio;
        const name = data.name;
        const price = +data.price;
        const sale = data.sale;
        const brand = data.brand;
        const description = data.description;
        const image = JSON.parse(data.image);
        const image2 = data.image2;
        const image3 = data.image3;
        const image4 = data.image4;
        const updated = data.updated.date;
        const type = new Type({idtype: data.idtype, name: ''});
        const audio = new Audio(
            {
                id: idaudio,name: name, price: price,
                sale: sale, brand: brand,
                image: image, image2: image2, image3: image3, image4: image4,
                updated: updated, type: type, description: description
            }
        );
        return audio;
    }

    /**
     * post new audio
     */
    postNewAudio(audio, successCb, errorCb){
        const dataPost = this.mappingDataPost(audio);
        console.log(dataPost);
        this.http.post(APP_CONSTANTS.URL_POST_AUDIO, dataPost)
        .subscribe(data => {
            successCb(data)
        }, error => errorCb);
    }

    mappingDataPost(data){
        return {
            name: data.name,
            brand: data.brand,
            price: Number(data.price),
            description: data.description,
            sale: data.sale,
            image: JSON.stringify(data.image),
            image2: "",
            image3: "",
            image4: "",
            idtype: data.idtype.id
        }
    }

    deleteAudio(id, successCb, errorCb){
        this.http.delete(APP_CONSTANTS.URL_DELETE_AUDIO + '/' + id)
            .subscribe(data => {
                successCb(data)
            }, error => errorCb);
    }

    putUpdateImage(id, data, successCb, errorCb){
        this.http.put(APP_CONSTANTS.URL_UPDATE_IMAGE + '/' + id, data)
            .subscribe(data => {
                successCb(data)
            }, error => errorCb);
    }

    putUpdateAudio(id, data, successCb, errorCb){
        const dataPut = this.mappingUpdateAudio(data);
        this.http.put(APP_CONSTANTS.URL_UPDATE_PRODUCT + '/' + id, dataPut)
            .subscribe(data => {
                successCb(data)
            }, error => errorCb);
    }

    mappingUpdateAudio(audio){
        return {
            name: audio.name,
            price: audio.price,
            brand: audio.brand,
            description: audio.description,
            sale: audio.sale
        }
    }
}
