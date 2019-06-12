export interface StatCakeConfig{
    bigText:string,
    smallText:string,
    graphData?:any,
    bgColor?:string,
    isDark?:boolean,
    inProgress:boolean
}

export interface AuthTokenObject{
    access_token:string;
    token_type:string;
    refresh_token:string,
    scope?:string;
    expires_in?:string
}

export interface AdvFormData{

    meta:Array<{name:string,filetype:string}>,
    data:FormData,
    rejecteds?:Array<File>

}

export interface FileUploadStatusInfo{
    id:string,
    contentURL:string,
    inProgress:boolean,
    title:string,
    description:string,
    tags:string,
    mediaTYpe:string,
    defaultThumbnailPath:string,
    file?:any
}
