type RequestOptions = Readonly<{
    endpoint: string;
    options?: Record<string, string>;
}>;

class Loader {
    private readonly baseLink: string;
    private readonly options: { apiKey: string };

    constructor(baseLink: string, options: { apiKey: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp<T>(
        requestOptions: RequestOptions,
        callback: (data: T) => void = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', requestOptions.endpoint, callback, requestOptions.options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }

            throw new Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Record<string, string>, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };

        const params = new URLSearchParams(urlOptions);
        const query = params.toString();

        const url = `${this.baseLink}${endpoint}`;

        return query ? `${url}?${query}` : url;
    }

    private load<T>(
        method: string,
        endpoint: string,
        callback: (data: T) => void,
        options: Record<string, string> = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: T) => callback(data))
            .catch((err: unknown) => console.error(err));
    }
}

export default Loader;
