import { parseCookies } from "@/helpers/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { supabaseUrl } from "@/config";
import { cpfMask, pisMask, phoneMask } from "@/helpers/mask";
import { Datepicker } from "flowbite-react";


export default function NewEmployeeForm({employees, values, setValues}) {
  

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    // console.log(values);
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
    console.log(employees[1].cpf)
    console.log(value)

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
                <option value="Superior Incompleto">Superior Incompleto</option>
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
        
    </>
  );
}
