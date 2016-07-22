import {URL} from '../config.js'
import Vue from 'vue'

export default class CategoryService{

    static getAll(){
        return Vue.http.get(`${URL}/categories`);
    }

}