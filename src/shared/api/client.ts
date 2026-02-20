const defaultErrorMessage = "API 호출에 실패했습니다.";

interface ErrorBody {
  error?: string;
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
  method: HttpMethod;
  body?: unknown;
}

export async function request<T>(
  url: string,
  options: RequestOptions
): Promise<T> {
  const { method, body } = options;

  const init: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body !== undefined && body !== null && method !== "GET") {
    init.body = JSON.stringify(body);
  }

  const response = await fetch(url, init);

  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as ErrorBody;
    throw new Error(data.error || defaultErrorMessage);
  }

  const data = await response.json().catch(() => undefined);
  return data as T;
}

export async function get<T>(url: string): Promise<T> {
  return request<T>(url, { method: "GET" });
}

export async function post<T>(url: string, body?: unknown): Promise<T> {
  return request<T>(url, { method: "POST", body });
}

export async function put<T>(url: string, body?: unknown): Promise<T> {
  return request<T>(url, { method: "PUT", body });
}

export async function patch<T>(url: string, body?: unknown): Promise<T> {
  return request<T>(url, { method: "PATCH", body });
}

export async function del<T>(url: string): Promise<T> {
  return request<T>(url, { method: "DELETE" });
}
