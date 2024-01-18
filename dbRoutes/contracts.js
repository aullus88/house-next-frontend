import { supabaseKey } from "@/config";
import { parseCookies } from "@/helpers";
import { fetchSupabase } from "./main";
import { updateEmployeeStatus } from "./employees";

export async function getAllContracts({ token }) {
  const options = {
    method: "GET",
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${token}`,
    },
  };

  const contracts = await fetchSupabase(
    "contracts?select=id,start_date,type,active,employees(id,name)",
    options
  );
  

  
//   const contracts = await unsortedContracts.sort((a, b) =>
//     a.employee.name.localeCompare(b.employee.name)
//   );

  return contracts;
}

export async function createNewContract({ newContract, token }) {
  const contracts = await getAllContracts({ token });
  

  const activeContracts = contracts.filter((contract) => contract.isActive);
  

  const isContractDuplicated = Object.values(activeContracts).some(
    (contract) => contract.employee_id === newContract.employee_id
  );
  

  if (isContractDuplicated) {
    return {
      type: "error",
      message: "Colaborador já contratado",
    };
  }

  const options = {
    method: "POST",
    headers: {
      apikey: supabaseKey,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newContract),
  };

  const response = await fetchSupabase("contracts", options);

  if (response.status == 201) {
    // Update the employee status to active
    await updateEmployeeStatus({
      employeeId: newContract.employee_id,      
      token,
    });

    // Return success message
    return {
      type: "success",
      message: "Colaborador Contratado com Sucesso",
    };
  }

  if (response) {
    return {
      type: "error",
      message: "Erro ao criar contrato",
    };
  }
  
}
