
export function setProducts({dispatch}){
    this.$http.get("/products.json").then(
        (response)=>{
           dispatch("SETPRODUCTS",JSON.parse(response.data))
        },
        (error)=>{
            console.error(error.statusText)
        }
    )
}
