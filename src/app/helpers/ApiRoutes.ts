import { ApiRoutesInterface } from "./Interfaces"

const ApiRoutes: ApiRoutesInterface = {
    BASEURL: "https://api.cloudinstaller.app/v1",
    ENDPOINTS: {
        signup: "signup/",
        login : "login/",
        changePassword : "/change-password",
        ota : "ota/",
        download: "",
        listuserapp : "users/files/",
         deletefile: "ota/",

        
        


    },
    DOWNLOAD_ASSET_URL : "https://assets.cloudinstaller.app/"

}
export default ApiRoutes

