import {URL} from '../config.js'
import Vue from 'vue'

export default class ProductService{

    static save(product){
        return Vue.http.post(`${URL}/product`,product)
    }

    static delete(id){
        return Vue.http.delete(`${URL}/product/${id}`)
    }

    static getAll(page,itensPerPage,keyword=null){

        let start = (page * itensPerPage) - (itensPerPage - 1);
        let keywordString=""
        if (keyword!=null){
          keywordString=`&q=${keyword}`
        }
        return Vue.http.get(`${URL}/products?start=${start}&limit=${itensPerPage}${keywordString}`)
    }

}
