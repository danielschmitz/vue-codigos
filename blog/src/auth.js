var Auth = {
    user: {
        name:"",
        _id:""
    },
    token:"",
    logged:function(){
        return this.token!=""
    }
}
export default Auth;