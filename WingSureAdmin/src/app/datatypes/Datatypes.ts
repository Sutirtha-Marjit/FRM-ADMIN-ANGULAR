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

