import Layout from "@/components/Layout";
import TeamsNavbar from "@/components/TeamsNavbar";
import Table from "@/components/common/Table";
import { parseCookies } from "@/helpers/index";
import { supabaseUrl } from "@/config";
import React, { useState } from "react";
import NewHire from "@/components/NewHire";
import { getAllContracts } from "@/dbRoutes/contracts";
import { getAllEmployees } from "@/dbRoutes/employees";
import { getJobTitles } from "@/pontomais";

export default function ContractsPage({ employees, contracts, token, jobs }) {
  const [showNewHire, setShowNewHire] = useState(false);
  const [filterActiveContracts, setFilterActiveContracts] = useState(false);

  const OpenNewHire = () => {
    setShowNewHire(!showNewHire);
  };

  return (
    <Layout title="Equipe">
      <TeamsNavbar />
      <div className=" rounded-md shadow-sm" role="group">
        <button
          type="button"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={() => OpenNewHire()}
        >
          Nova Contratação
        </button>
      </div>
      <NewHire
        showNewHire={showNewHire}
        OpenNewHire={OpenNewHire}
        token={token}
        employees={employees}
        jobs={jobs}
      />

      <div>
        {contracts && contracts.length === 0 ? (
          <></>
        ) : (
          <Table
            data={contracts.map((contract) => ({              
              nome: contract.employees.name,
              Inicio: contract.start_date,
              Tipo: contract.type,
              Ativo: contract.active? "SIM" : "NÃO" 
            }))}
            title={"contract"}
            root={"team"}
            filters={filterActiveContracts}
            edit={false}
          />
        )}
      </div>

      
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  try {
    const employees = await getAllEmployees({ token });
    const contracts = await getAllContracts({ token });
    const jobs = await getJobTitles()
    

    return {
      props: {
        employees,
        contracts,
        token,
        jobs,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        employees: [],
        contracts: [],
        token,
        jobs,
      },
    };
  }

  
}
