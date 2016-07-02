
export function setLogin({dispatch},user){
    let login = user;
    login.token = "123";
    dispatch("SET_LOGIN",login);
}
