export type APICall = {
    id: string
    name: string
    desc: string
    endpoint: string
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
    headers: Headers[]
    body: Body[]
}

export type Headers = {
    key: string
    value: string
}

export type Body = {
    key: string
    value: string
}

export type RunAPICallResult = {
  responseStatus: number;
  responseStatusText: string;
  responseHeaders: Record<string, string>;
  responseBody: any;
  error?: string;
};