export interface ApiRoutesInterface {
    BASEURL: string,
    ENDPOINTS: {
        signup: string,
        login: string,
        changePassword: string,
        ota : string,
        download : string,
        

        
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
    authToken: string | null
}


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