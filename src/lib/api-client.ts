import { env } from "@/config/env";
import { z } from "zod";

type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type QueryValue = string | number | boolean | null | undefined;
type ApiPayload = Record<string, QueryValue>;

export class ApiClientError extends Error {
  readonly status: number;
  readonly details: unknown;

  constructor(message: string, status: number, details: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.details = details;
  }
}

type ApiRequestOptions<TInput extends ApiPayload, TOutput> = {
  method: ApiMethod;
  path: string;
  input?: TInput;
  inputSchema?: z.ZodType<TInput>;
  responseSchema: z.ZodType<TOutput>;
  init?: Omit<RequestInit, "body" | "method">;
};

const baseUrl = env.NEXT_PUBLIC_API_BASE_URL;

function buildUrl(path: string, input?: ApiPayload): string {
  if (!path.startsWith("http") && !baseUrl) {
    const searchParams = new URLSearchParams();

    if (input) {
      for (const [key, value] of Object.entries(input)) {
        if (value === undefined || value === null || value === "") {
          continue;
        }

        searchParams.set(key, String(value));
      }
    }

    const queryString = searchParams.toString();
    return queryString ? `${path}?${queryString}` : path;
  }

  const requestUrl = path.startsWith("http")
    ? new URL(path)
    : new URL(path, baseUrl);

  if (!input) {
    return requestUrl.toString();
  }

  for (const [key, value] of Object.entries(input)) {
    if (value === undefined || value === null || value === "") {
      continue;
    }

    requestUrl.searchParams.set(key, String(value));
  }

  return requestUrl.toString();
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

async function request<TInput extends ApiPayload, TOutput>({
  method,
  path,
  input,
  inputSchema,
  responseSchema,
  init,
}: ApiRequestOptions<TInput, TOutput>): Promise<TOutput> {
  const validatedInput = inputSchema ? inputSchema.parse(input ?? {}) : input;
  const isQueryMethod = method === "GET" || method === "DELETE";
  const response = await fetch(
    buildUrl(path, isQueryMethod ? validatedInput : undefined),
    {
      ...init,
      method,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
      body: isQueryMethod ? undefined : JSON.stringify(validatedInput ?? {}),
    },
  );
  const payload = await parseResponseBody(response);

  if (!response.ok) {
    const message =
      typeof payload === "object" &&
      payload !== null &&
      "message" in payload &&
      typeof payload.message === "string"
        ? payload.message
        : `API request failed with status ${response.status}`;

    throw new ApiClientError(message, response.status, payload);
  }

  return responseSchema.parse(payload);
}

export const apiClient = {
  get<TInput extends ApiPayload, TOutput>(
    options: Omit<ApiRequestOptions<TInput, TOutput>, "method">,
  ) {
    return request({ ...options, method: "GET" });
  },
  post<TInput extends ApiPayload, TOutput>(
    options: Omit<ApiRequestOptions<TInput, TOutput>, "method">,
  ) {
    return request({ ...options, method: "POST" });
  },
  put<TInput extends ApiPayload, TOutput>(
    options: Omit<ApiRequestOptions<TInput, TOutput>, "method">,
  ) {
    return request({ ...options, method: "PUT" });
  },
  patch<TInput extends ApiPayload, TOutput>(
    options: Omit<ApiRequestOptions<TInput, TOutput>, "method">,
  ) {
    return request({ ...options, method: "PATCH" });
  },
  delete<TInput extends ApiPayload, TOutput>(
    options: Omit<ApiRequestOptions<TInput, TOutput>, "method">,
  ) {
    return request({ ...options, method: "DELETE" });
  },
};
