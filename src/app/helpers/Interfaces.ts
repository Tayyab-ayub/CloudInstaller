export interface ApiRoutesInterface {
    BASEURL: string,
    ENDPOINTS: {
        signup: string,
        login: string,
        changePassword: string,
        ota : string,
        download : string,
        listuserapp : string,
        deletefile : string,
        


        
    }
    DOWNLOAD_ASSET_URL : string
}
export interface UserResponseModel {
    id: number,
    first_name: string,
    last_name: string,
    username: string,
    email: string,
}

export interface GlobalSliceState {
    loading: boolean,
    error: any,
}

export interface FileUploadProgress {
    fileProgress :number
}


export interface UserSliceState extends GlobalSliceState,FileUploadProgress {
    user: UserResponseModel | null,
    authToken: string | null,
    listapps : FileDetails[],
}
// export interface FileList{
//     listapps : FileDetails[] | [] ,
// }



export interface GlobalResponseModel {
    message: string,
    success: boolean
}

export interface AuthResponseModel extends GlobalResponseModel {
    data: {
        token: string,
        user: UserResponseModel | null
    }
}

export interface FileDetails extends GlobalResponseModel{
    
        id: number,
        type: string,
        token: string,
        valid_until: string,
        user: number,
        bundle_name : string,
        bundle_identifier : string,
        version_code: string,
       
    }
 export interface FileDetailsResponse extends GlobalResponseModel {
    data: FileDetails[];   
}

