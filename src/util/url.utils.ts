export type UrlOptions = {
    queryParams?: { [key: string]: string | number };
    pathParams?: { [key: string]: string | number };
};

export function buildUrl(endpoint: string, options: UrlOptions = {}): string {
    let url = endpoint;
    const { queryParams, pathParams } = options;
    if (pathParams) {
        // TODO update logic and add exception
        Object.getOwnPropertyNames(pathParams).forEach((key) => {
            url = url.replace(
                new RegExp(`({${key}})|(:${key}\?)|(:${key})`, 'g'),
                `${pathParams[key]}`,
            );
        });
    }
    url.replace(new RegExp('({.*})|(:.*?\\/)', 'g'), '');
    if (queryParams) {
        const queryUrl = Object.getOwnPropertyNames(queryParams)
            .map(
                (key) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(
                        `${queryParams[key]}`,
                    )}`,
            )
            .join('&');
        if (queryUrl) url += `?${queryUrl}`;
    }
    return url;
}
