export type UrlOptions = {
    queryParams?: { [key: string]: string | number };
    pathParams?: { [key: string]: string | number };
}

export function buildUrl(endpoint: string, options: UrlOptions = {}): string {
    let url = endpoint;
    const {queryParams, pathParams} = options;
    if (pathParams) { // todo update logic and add exception
        Object.getOwnPropertyNames(pathParams).forEach(key => {
            url = url.replace(new RegExp(`({${key}})|(:${key})`, 'g'), `${pathParams[key]}`);
        });
    }
    url.replace(new RegExp('({.*})|(:.*?\\/)', 'g'), '');
    if (queryParams) {
        let queryUrl = Object.getOwnPropertyNames(queryParams)
            .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(`${queryParams[k]}`)}`)
            .join('&');
        if (queryUrl) url += `?${queryUrl}`;
    }
    return url;
}
