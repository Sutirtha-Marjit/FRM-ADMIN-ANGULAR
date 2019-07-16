export interface StatCakeConfig{
    bigText:string,
    smallText:string,
    graphData?:any,
    bgColor?:string,
    isDark?:boolean,
    inProgress:boolean,
    errorData:AppErrorObject
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

export interface FeaturedBlockDataSet{
    id?:string;
    pattern:string;
    heading?:string;
    viewed:number;
    liked:number;
    downloaded:number;
    listened:number;
    dateOfPublish:Date;
    thumbnail:string;
    expandURL?:string;
    resourceURL:string;
    mediaType:string,
}

export interface AppErrorObject{
    heading:string,
    description:string,
    code:string
}
