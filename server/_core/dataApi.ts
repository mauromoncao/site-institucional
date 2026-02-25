// Data API helper - stub (not used in this project)
// This was a Manus-specific API proxy. For external APIs, use fetch directly.

export type DataApiCallOptions = {
  query?: Record<string, unknown>;
  body?: Record<string, unknown>;
  pathParams?: Record<string, unknown>;
  formData?: Record<string, unknown>;
};

export async function callDataApi(
  _apiId: string,
  _options: DataApiCallOptions = {}
): Promise<unknown> {
  throw new Error(
    "Data API not configured. Use fetch() directly to call external APIs."
  );
}
