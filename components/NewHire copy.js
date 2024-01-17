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
    first_name: "",
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

    console.log(values);
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    console.log(values);
  };
  const handleFirstNameChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value.trim() });
  };
  const handleLastNameChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
      name: `${values.first_name} ${value}`,
    });
  };

  const handleCPFInputChange = (e) => {
    const { name, value } = e.target;

    const cpfExists = employees.some((employee) => employee.cpf === value);

    if (cpfExists) {
      toast.error("Já existe um cadastro com este CPF.");
    } else {
      setValues({ ...values, [name]: cpfMask(value) });
    }
  };

  const handlePISInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: pisMask(value) });
  };

  const handlePhoneInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: phoneMask(value) });
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
            {/* <!-- Modal body --> */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-9 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first-name"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nome"
                    required=""
                    value={values.first_name}
                    onChange={handleFirstNameChange}
                  ></input>
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Sobrenome
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last-name"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Sobrenome"
                    required=""
                    value={values.last_name}
                    onChange={handleLastNameChange}
                  ></input>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Endereço
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Endereço"
                    required=""
                    value={values.address}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="marital_status"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Estado Civil
                  </label>
                  <select
                    id="marital_status"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="marital_status"
                    required=""
                    value={values.marital_status}
                    onChange={handleInputChange}
                  >
                    <option value=""></option>
                    <option value="Casado">Casado(a)</option>
                    <option value="Solteiro">Solteiro(a)</option>
                    <option value="Separado">Separado(a)</option>
                    <option value="Divorciado">Divorciado(a)</option>
                    <option value="Viúvo">Viúvo(a)</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="education"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Grau de Instrução
                  </label>
                  <select
                    id="education"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600' ${!this.value} ? bg-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="education"
                    required=""
                    value={values.education}
                    onChange={handleInputChange}
                  >
                    <option value="">Grau de Instrução</option>
                    <option value="Fundamental Incompleto">
                      Fundamental Incompleto
                    </option>
                    <option value="Fundamental Completo">
                      Fundamental Completo
                    </option>
                    <option value="Médio Incompleto">Médio Incompleto</option>
                    <option value="Médio Completo">Médio Completo</option>
                    <option value="Superior Incompleto">
                      Superior Incompleto
                    </option>
                    <option value="Superior Completo">Superior Completo</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="company"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    CPF
                  </label>
                  <input
                    type="text"
                    name="cpf"
                    id="cpf"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="CPF"
                    required=""
                    value={values.cpf}
                    onChange={handleCPFInputChange}
                  ></input>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="pis"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    PIS
                  </label>
                  <input
                    type="text"
                    name="pis"
                    id="pis"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="PIS"
                    required=""
                    value={values.pis}
                    onChange={handlePISInputChange}
                  ></input>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    RG
                  </label>
                  <input
                    type="text"
                    name="id_document"
                    id="id_document"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="RG"
                    required=""
                    value={values.id_document}
                    onChange={handlePISInputChange}
                  ></input>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="birth_date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    name="birth_date"
                    id="birth_date"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    // placeholder="Data de Nascimento"
                    required=""
                    value={values.birth_date}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Telefone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Telefone"
                    required=""
                    value={values.phone}
                    onChange={handlePhoneInputChange}
                  ></input>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Email"
                    required=""
                    value={values.email}
                    onChange={handleInputChange}
                  ></input>
                </div>
              </div>
            </div>
            {/* <!-- Modal footer --> */}
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
