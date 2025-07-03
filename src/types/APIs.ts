export type APICall = {
  id: string;
  name: string;
  desc: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers: Headers[];
  body: Body[];
  savedResponses: SavedResponse[] | null
};

export type Headers = {
  key: string;
  value: string;
};

export type Body = {
  key: string;
  value: string;
};

export type RunAPICallResult = {
  responseID: string;
  responseStatus: number;
  responseStatusText: string;
  responseHeaders: Record<string, string>;
  responseBody: any;
  time: string;
  error?: string;
};

export type SavedResponse = {
  responseID: string;
  responseStatus: number;
  responseStatusText: string;
  responseHeaders: Record<string, string>;
  responseBody: any;
  time: string;
};
