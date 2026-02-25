import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import { getLoginUrl } from "./const";
import "./index.css";
import { getStaticFallback } from "./lib/staticData";

const queryClient = new QueryClient();

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  window.location.href = getLoginUrl();
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Mutation Error]", error);
  }
});

/**
 * Custom fetch that intercepts tRPC requests and provides static fallback data
 * when the backend API is not available (e.g., Hostinger static hosting)
 */
async function trpcFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  try {
    const response = await globalThis.fetch(input, {
      ...(init ?? {}),
      credentials: "include",
    });

    // If the server returns HTML (SPA redirect) instead of JSON, use static fallback
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json") && !contentType.includes("text/plain")) {
      const url = typeof input === "string" ? input : input.toString();
      const fallback = getStaticFallback(url);
      if (fallback) {
        return new Response(JSON.stringify(fallback), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }
    }

    // If the server returned 404 or 5xx, use static fallback
    if (response.status >= 400) {
      const url = typeof input === "string" ? input : input.toString();
      const fallback = getStaticFallback(url);
      if (fallback) {
        return new Response(JSON.stringify(fallback), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }
    }

    return response;
  } catch {
    // Network error — use static fallback
    const url = typeof input === "string" ? input : input.toString();
    const fallback = getStaticFallback(url);
    if (fallback) {
      return new Response(JSON.stringify(fallback), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    throw new Error("Network error and no static fallback available");
  }
}

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      fetch: trpcFetch,
    }),
  ],
});

createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </trpc.Provider>
);
