import Layout from "@/components/Layout";
import TeamsNavbar from "@/components/TeamsNavbar";
import Table from "@/components/common/Table";
import { parseCookies } from "@/helpers/index";
import { supabaseUrl } from "@/config";
import React, { useState } from "react";
import NewHire from "@/components/NewHire";

export default function ContractsPage({ employees, contractsData, token,  }) {
  const [showNewHire, setShowNewHire] = useState(false);

  const OpenNewHire = () => {
    setShowNewHire(!showNewHire);
  };

  return (
    <Layout title="Equipe">
      <TeamsNavbar />
      <div className =" rounded-md shadow-sm" role="group">
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
        
      />

      <div>
        <Table data={contractsData} title={"contracts"} root={"team"} noEdit/>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({req}) {
  const { token } = parseCookies(req);

  const [contractRes, employeesRes] = await Promise.all([
    fetch(
      `${supabaseUrl}/rest/v1/contracts?select=id,start_date,type,employees(id,name)`,
      {
        method: "GET",
        headers: {
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0bGVpZWJka3d2aGd0anhkcnh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM3MDEyMzYsImV4cCI6MjAxOTI3NzIzNn0.kH5S0Qi37UmVk3loOPK-frGir4_3ntzno9wY_q1vgHc",
          Authorization: `Bearer ${token}`,
        },
      }
    ),
    fetch(`${supabaseUrl}/rest/v1/employees?select=*`, {
      method: "GET",
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0bGVpZWJka3d2aGd0anhkcnh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM3MDEyMzYsImV4cCI6MjAxOTI3NzIzNn0.kH5S0Qi37UmVk3loOPK-frGir4_3ntzno9wY_q1vgHc",
        Authorization: `Bearer ${token}`,
      },
    }),
  ]);

  const [contracts, employees] = await Promise.all([
    contractRes.json(), employeesRes.json()


  ])

  const contractsData = await contracts.map((contract) => ({
    // id: employee.id,
    nome: contract.employees.name,
    Inicio: contract.start_date,
    Tipo: contract.type  
    
    
    }));


  console.log(contracts)

    return {
    props: {
      contractsData,
      employees,
      token,
    },
  };
}
