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
    name: string
    value: string
}

export type Body = {
    name: string
    value: string
}