import { APICall, RunAPICallResult } from "types/APIs";

export default async function RunAPICall(apiCall: APICall): Promise<RunAPICallResult> {
  try {
    const { endpoint, method, headers, body } = apiCall;

    // Convert headers array to object
    const formattedHeaders: Record<string, string> = {};
    headers?.forEach(({ key, value }) => {
      if (key && value) {
        formattedHeaders[key] = value;
      }
    });

    // Determine if body should be included
    const shouldIncludeBody = !['GET', 'DELETE'].includes(method);

    // Convert body array to object
    const bodyObject: Record<string, any> = {};
    body?.forEach(({ key, value }) => {
      if (key) {
        bodyObject[key] = value;
      }
    });

    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...formattedHeaders,
      },
      ...(shouldIncludeBody && Object.keys(bodyObject).length > 0
        ? { body: JSON.stringify(bodyObject) }
        : {}),
    });

    const contentType = response.headers.get('Content-Type');
    let parsedBody: any;

    if (contentType?.includes('application/json')) {
      parsedBody = await response.json();
    } else {
      parsedBody = await response.text();
    }

    // Convert response headers to plain object
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    return {
      responseID: 'string',
      responseStatus: response.status,
      responseStatusText: response.statusText,
      responseHeaders,
      responseBody: parsedBody,
      time: new Date().toISOString()
    };
  } catch (err: any) {
    return {
      responseID: 'string',
      responseStatus: 0,
      responseStatusText: 'Network or parsing error',
      responseHeaders: {},
      responseBody: null,
      error: err?.message || 'Unknown error',
      time: new Date().toISOString()
    };
  }
}
