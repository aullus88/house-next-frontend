import { supabaseKey } from "@/config";
import { parseCookies } from "@/helpers";
import { fetchSupabase } from "./main";

export async function getAllEmployees({ token }) {
  const options = {
    method: "GET",
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${token}`,
    },
  };

  const unsortedEmployees = await fetchSupabase("employees?select=*", options);
  const employees = await unsortedEmployees.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return employees;
}

export async function createEmployee({ values, token }) {
  const employees = await getAllEmployees({ token });

  const hasEmptyFields = Object.values(values).some(
    (element) => element === ""
  );

  if (hasEmptyFields) {
    return {
      type: "error",
      message: "Preencher todos os Campos",
    };
  }

  if (!employees) {
    return {
      type: "error",
      message: "Erro ao obter lista de colaboradores",
    };
  }

  const isEmployeeDuplicated = Object.values(employees).some(
    (employee) => employee.cpf === values.cpf
  );

  if (isEmployeeDuplicated) {
    return {
      type: "error",
      message: "Colaborador já cadastrado",
    };
  }

  const options = {
    method: "POST",
    headers: {
      apikey: supabaseKey,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify(values),
  };

  const response = await fetchSupabase("employees", options);

  if (!response) {
    return {
      type: "error",
      message: "Erro ao criar colaborador",
    };
  }

  return {
    data: response[0],
    type: "success",
    message: "Colaborador cadastrado com sucesso",
  };
}

export async function getLastEmployee({ token }) {
  return await fetchSupabase("employees?select=*", {
    method: "GET",
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateEmployeeStatus({ employeeId, token }) {
  try {
    // Update the status
    const employeeData = { active: true };

    // Options for the fetch request
    const options = {
      method: "PATCH",
      headers: {
        apikey: supabaseKey,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(employeeData),
    };

    // Update the employee status
    await fetchSupabase(`employees?id=eq.${employeeId}`, options);

    // Return success message
    return {
      type: "success",
      message: "Status do colaborador atualizado com sucesso",
    };

    // If the employee is not found
    return {
      type: "error",
      message: "Colaborador não encontrado",
    };
  } catch (error) {
    // Handle any unexpected errors
    console.error("An unexpected error occurred:", error);
    return {
      type: "error",
      message: "Algo deu errado ao atualizar o status do colaborador",
    };
  }
}

//WRITE A GETEMPLOYEE FUNCTION TO GET DATA FROM ONE EMPLOYEE BY ID

export async function getEmployee({ id, token }) {
  try {
    // Options for the fetch request
    const options = {
      method: "GET",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${token}`,
      },
    };

    // Get the employee
    const employee = await fetchSupabase(
      `employees?id=eq.${id}`,
      options
    );

    // Return the employee
    return employee[0];
    console.log(employee);

    // If the employee is not found
    return {
      type: "error",
      message: "Colaborador não encontrado",
    };
  } catch (error) {
    // Handle any unexpected errors
    console.error("An unexpected error occurred:", error);
    return {
      type: "error",
      message: "Algo deu errado ao obter o colaborador",
    };
  }
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  return {
    props: {
      token,
    },
  };
}
