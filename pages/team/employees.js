import Layout from "@/components/Layout";
import TeamsNavbar from "@/components/TeamsNavbar";
import NewEmployee from "@/components/NewEmployee";
import Table from "@/components/common/Table";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { parseCookies } from "@/helpers/index";
import { getAllEmployees } from "@/dbRoutes/employees";


export default function EmployeesPage({ employees, token }) {
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
        employees={employees}
      />

      <div>
        {employees && employees.length === 0 ? (
          <></>
        ) : (
          <Table
            data={employees.map((employee) => ({
              _id: employee.id,
              nome: employee.name,
              cpf: employee.cpf,
              pis: employee.pis,
              Nascimento: employee.birth_date,
            }))}
            title={"employee"}
            root={"team"}
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
    return {
      props: {
        employees,
        token,
      },
    };
  } catch (error) {
    console.log("Erro ao buscar funcionários", error);
    return {
      props: {
        employees: [],
        token,
      },
    };
  }
}
