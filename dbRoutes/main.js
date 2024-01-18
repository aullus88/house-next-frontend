import { supabaseUrl } from "@/config";


export async function fetchSupabase(endpoint, options) {
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/${endpoint}`, options);

    if (!response.ok) {
      console.error(`Error fetching ${endpoint}: ${response.statusText}`);
      return null;
    }

    // Check if the response has a JSON content type before attempting to parse
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }

    // Return the response directly for non-JSON content types
    return response;
  } catch (error) {
    console.error(
      `An unexpected error occurred while fetching ${endpoint}:`,
      error
    );
    return null;
  }
}

