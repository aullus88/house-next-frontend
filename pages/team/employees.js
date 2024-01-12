import Layout from "@/components/Layout";
import TeamsNavbar from "@/components/TeamsNavbar";
import NewEmployee from "@/components/NewEmployee";
import Table from "@/components/common/Table";
// import { employeesData } from "@/components/mocks/employees";
import React, { useState } from "react";
import { supabase } from "@/auth/server";
import { data } from "autoprefixer";
import EmployeesTable from "@/components/EmployeesTable";

export default function EmployeesPage({ employeesData }) {
  const [showNewEmployee, setShowNewEmployee] = useState(false);

  const OpenNewEmployee = () => {
    setShowNewEmployee(!showNewEmployee);
  };

  return (
    <Layout title="Colaboradores">
      <div>
        <h3 className="text-3xl font-bold dark:text-white">Equipe</h3>
      </div>

      <TeamsNavbar />
      <button
        type="button"
        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={() => OpenNewEmployee()}
      >
        Novo
      </button>
      <NewEmployee
        showNewEmployee={showNewEmployee}
        OpenNewEmployee={OpenNewEmployee}
      />

      {/* <EmployeesTable data={employees} title={"employee"} root={"team"} /> */}
      <Table data={employees} title={"employee"} root={"team"} />
    </Layout>
  );
}

let { data: employees, error } = await supabase.from("employees").select("*");

const employeesData = employees.map((employee) => ({
  id: employee.id,
  nome: employee.name,
  cpf: employee.cpf
  }));
// console.log(employeesData);
// console.log(employees);
