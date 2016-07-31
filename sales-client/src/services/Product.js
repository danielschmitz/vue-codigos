import {URL} from '../config.js'
import Vue from 'vue'

export default class ProductService{
    
    static save(product){
        return Vue.http.post(`${URL}/product`,product)
    }

    static delete(id){
        return Vue.http.delete(`${URL}/product/${id}`)
    }

    static getAll(page,itensPerPage,keyword){

        let start = (page * itensPerPage) - (itensPerPage - 1);
        let keywordString=""
        if (this.keyword!=null){
          keywordString=`&q=${this.keyword}`
        }
        return Vue.http.get(`${URL}/products`)
    }

}