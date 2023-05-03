import {router} from "../../utils/routes";
import {setCookiesToken} from "./TokenUtil";

function RequireAuth({ children } : any) {
    const authed = localStorage.getItem("token")
    // fix old local storage
    if(authed){
        setCookiesToken(authed)
    }

    // Болванка на время
    return authed ? children : router.navigate("/login");
}
export default RequireAuth
