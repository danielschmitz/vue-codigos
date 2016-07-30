import {URL} from '../config.js'
import Vue from 'vue'

export default class SupplierService{

    static getAll(){
        return Vue.http.get(`${URL}/suppliers`);
    }

}