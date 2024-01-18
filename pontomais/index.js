import { pontomais_token } from "@/config";

export async function fetchPontoMais(endpoint, options) {
  try {
    const response = await fetch(
      `https://api.pontomais.com.br/external_api/v1/${endpoint}`,
      options
    );

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

export async function getJobTitles() {
  const options = {
    method: "GET",
    headers: {
      "access-token": pontomais_token,
    },
  };

  const job_titles = await fetchPontoMais(
    "job_titles?attributes=id,code,name,female_name",
    options
  );
  const jobs = await job_titles.job_titles;

  return jobs;
}

export async function hirePontoMais(hireDataPontomais) {
  const options = {
    method: "GET",
    headers: {
      "access-token": pontomais_token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(hireDataPontomais),
  };

  const res = await fetchPontoMais("employees", options);

  if (res.status == 201) {
    return {
      type: "success",
      message: "Colaborador Cadastrado na Pontomais",
    };
  }
}
