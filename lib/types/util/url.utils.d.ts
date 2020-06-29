export declare type UrlOptions = {
    queryParams?: {
        [key: string]: string | number;
    };
    pathParams?: {
        [key: string]: string | number;
    };
};
export declare function buildUrl(endpoint: string, options?: UrlOptions): string;
