import Layout from "@/components/Layout";
import TeamsNavbar from "@/components/TeamsNavbar";
import NewEmployee from "@/components/NewEmployee";
import Table from "@/components/common/Table";
import React, { useState } from "react";
import { data } from "autoprefixer";
import { parseCookies } from '@/helpers/index'
import { supabaseUrl } from "@/config";




export default function EmployeesPage({employeesData, token}) {
  const [showNewEmployee, setShowNewEmployee] = useState(false);

  const OpenNewEmployee = () => {
    setShowNewEmployee(!showNewEmployee);
  };

  return (
    <Layout title="Equipe">
      

      <TeamsNavbar />
      <div className=" rounded-md shadow-sm" role="group">
      <button
        type="button"
        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={() => OpenNewEmployee()}
      >
        Novo
      </button>
      </div>
      <NewEmployee
        showNewEmployee={showNewEmployee}
        OpenNewEmployee={OpenNewEmployee}
        token={token}
        employees={employeesData}
      />

      {/* <EmployeesTable data={employees} title={"employee"} root={"team"} /> */}
      <div >
        { employeesData ? (
          <p>Loading</p>
        ) : (
          <Table data={employeesData} title={"employee"} root={"team"} />
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }){
  const { token } = parseCookies(req)

  const res = await fetch(`${supabaseUrl}/rest/v1/employees?select=*`, {
    method: 'GET',
    headers: {
      apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0bGVpZWJka3d2aGd0anhkcnh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM3MDEyMzYsImV4cCI6MjAxOTI3NzIzNn0.kH5S0Qi37UmVk3loOPK-frGir4_3ntzno9wY_q1vgHc",
      Authorization: `Bearer ${token}`,

    },
  })

  const employees = await res.json()

  const employeesData = await employees.map((employee) => ({
    // id: employee.id,
    nome: employee.name,
    cpf: employee.cpf,
    pis: employee.pis,
    Nascimento: employee.birth_date
    }));
    console.log(employees)

  

  return {
    props: {
      employeesData,
      token,
    }
  }
}
