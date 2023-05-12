import {router} from "../../utils/routes";

function RequireAuth({ children } : any) {
    const authed = localStorage.getItem("user")

    // fix old local storage
    // if(authed){
    //     setCookiesToken(authed)
    // }

    // Болванка на время
    return authed ? children : router.navigate("/login");
}
export default RequireAuth
