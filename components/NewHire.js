import { parseCookies } from "@/helpers/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { supabaseUrl } from "@/config";
import { cpfMask, pisMask, phoneMask } from "@/helpers/mask";
import { Datepicker } from "flowbite-react";
import { ToggleSwitch, Label, Select } from 'flowbite-react';
import NewEmployeeForm from "./NewEmployeeForm";

export default function NewHire({
  showNewHire,
  OpenNewHire,
  token,
  employees,
  
  
}) {
  if (!showNewHire) {
    return null;
  }

  const [values, setValues] = useState({
    first_name: "Aulus",
    last_name: "",
    name: "",
    birth_date: "",
    cpf: "",
    pis: "",
    address: "",
    marital_status: "",
    education: "",
    id_document: "",
    // id_issuing_date: "",
    // id_issuer: "",
    // email: "",
    // phone: "",
  });


  const [newFile,setNewFile] = useState(false)

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      toast.error("Preencher todos os campos");
      return;
    }

    // console.log(e);
    router.push("/team/employees");
    OpenNewHire();

    // Validation

    const res = await fetch(`${supabaseUrl}/rest/v1/employees`, {
      method: "POST",
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0bGVpZWJka3d2aGd0anhkcnh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM3MDEyMzYsImV4cCI6MjAxOTI3NzIzNn0.kH5S0Qi37UmVk3loOPK-frGir4_3ntzno9wY_q1vgHc",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (res) {
      if (res.status === 400 || res.status === 401) {
        console.log(JSON.stringify(values));
        return;
      }
      toast.error("Something Went Wrong");
    } else {
      console.log("res ok");
    }
  };

  

  return (
    <>
      <ToastContainer />
      <div
        id="editUserModal"
        tabIndex="-1"
        aria-hidden="true"
        className={
          "fixed z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-0rem)] max-h-full bg-slate-900/80"
        }
      >
        <div className="relative w-full max-w-3xl max-h-full">
          {/* <!-- Modal content --> */}
          <form
            className="relative bg-white rounded-lg shadow dark:bg-gray-700"
            onSubmit={handleSubmit}
            
          >
            {/* <!-- Modal header --> */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Nova Contratação
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="editUserModal"
                onClick={() => OpenNewHire()}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <ToggleSwitch checked={newFile} label='Colaborador já cadastrado' onChange={setNewFile}/>

            </div>
            <NewEmployeeForm  employees={employees} values={values} setValues={setValues}/>
            
            <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save all
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
