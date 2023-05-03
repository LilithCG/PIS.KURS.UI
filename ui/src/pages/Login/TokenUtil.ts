import jwt from "jwt-decode";

interface IJwtToken {
    id: number | string,
    name: string,
    login: string,
    roles: string[],
}

export function setCookiesToken(token: string) {
    localStorage.setItem('token', token);

    const decodeToken = jwt<IJwtToken>(token);
    localStorage.setItem("user", JSON.stringify({
        id: decodeToken.id,
        name: decodeToken.name,
        login: decodeToken.login,
        roles: decodeToken.roles
    } as IJwtToken))
}

export function deleteCookiesToken() {
    localStorage.setItem('token', "");
    localStorage.setItem("user", "")
}

export function getCurrentUser(){
    return JSON.parse(localStorage.getItem("user")!!) as IJwtToken
}