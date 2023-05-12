import {query} from "../../utils/GraphQlQuery";

interface IJwtToken {
    id: number | string,
    name: string,
    login: string,
    roles: string[],
}

export function setCookiesToken(login: string, password: string) {
    return query(`{
      allUsers{
        nodes{      
          id
          login
          password
          name
          surname
          otchestvo
          roleId
          roleByRoleId{
            name
          }
        }
      }
    }`, 3).then((answer) => {
        let finds = answer.filter((user: any) => user.login == login && user.password == password)
        if (finds.length == 0){
            return false
        }
        let user = finds[0]
        localStorage.setItem("user", JSON.stringify({
            id: user.id,
            name: user.name,
            login: user.login,
            roles: [user.roleByRoleId.name]
        } as unknown as IJwtToken))
        return true
    })


}

export function deleteCookiesToken() {
    localStorage.setItem("user", "")
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem("user")!!) as IJwtToken
}