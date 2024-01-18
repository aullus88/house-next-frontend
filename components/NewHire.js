import { parseCookies } from "@/helpers/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabaseUrl, supabaseKey } from "@/config";
import { ToggleSwitch, Label, Select, Spinner } from "flowbite-react";
import NewEmployeeForm from "./NewEmployeeForm";
import { createEmployee } from "@/dbRoutes/employees";
import { createNewContract } from "@/dbRoutes/contracts";
import { getJobTitles } from "@/pontomais";

export default function NewHire({
  showNewHire,
  OpenNewHire,
  token,
  employees,
  jobs,
}) {
  if (!showNewHire) {
    return null;
  }

  console.log(jobs)

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
    email: "",
    phone: "",
  });

  const [newContract, setNewContract] = useState({
    start_date: "",
    experience_time: "",
    type: "",
    employee_id: "",
    active: true,
    job_title:"",
    job_id:"",
  });

  const [newFile, setNewFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContract({ ...newContract, [name]: value });
  };

  const handleJobInputChange = (e) => {
    const { name, value } = e.target;
    setNewContract({ ...newContract, [name]: value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (newFile) {
        // Step 1: Create a new employee
        const newEmp = await createEmployee({ values, token });

        if (newEmp) {
          toast[newEmp.type](newEmp.message);

          // Step 2: Retrieve the newly created employee data
          const newEmployee = newEmp.data;

          if (newEmployee) {
            // Step 3: Update state or perform any other action with the new employee data
            setNewContract({ ...newContract, employee_id: newEmployee.id });
          }
        }
      } else {
        const newCont = await createNewContract({ newContract, token });

        if (newCont) {
          toast[newCont.type](newCont.message);
          router.push("/team/contracts");
          OpenNewHire();
        }
      }

      // your logic for the case when newFile is false
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      toast.error("Algo deu errado");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (newFile == false) {
      return;
    }

    const handleCreateNewContract = async () => {
      try {
        const newCont = await createNewContract({ newContract, token });

        if (newCont) {
          toast[newCont.type](newCont.message);
          router.push("/team/contracts");
          OpenNewHire();
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        toast.error("Algo deu errado");
      }
    };

    // Check if newContract has been updated
    if (newContract.employee_id !== "") {
      handleCreateNewContract();
    }
  }, [newContract, newFile]); // Watch for changes in newContract

  return (
    <>
      <div
        id="editUserModal"
        tabIndex="-1"
        aria-hidden="true"
        className={
          "fixed z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-0rem)] max-h-full bg-slate-900/80"
        }
      >
        {loading ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="relative w-full max-w-3xl max-h-full">
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
                <ToggleSwitch
                  checked={newFile}
                  label="Novo Cadastro"
                  onChange={setNewFile}
                />
              </div>

              {newFile ? (
                <NewEmployeeForm
                  employees={employees}
                  values={values}
                  setValues={setValues}
                />
              ) : (
                <>
                  <div className="col-span-6 sm:col-span-3 p-4">
                    <label
                      htmlFor="employee"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Selecione o cadastro
                    </label>
                    <select
                      id="employee_id"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      name="employee_id"
                      required=""
                      value={newContract.employee_id}
                      onChange={handleInputChange}
                    >
                      {employees
                        .filter((employee) => employee.active !== true)
                        .map((employee) => (
                          <option key={employee.id} value={employee.id}>
                            {employee.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </>
              )}

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-9 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="birth_date"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Data de Início
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      id="start_date"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      // placeholder="Data de Nascimento"
                      required=""
                      value={newContract.start_date}
                      onChange={handleInputChange}
                    ></input>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="experience_time"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Período de Experiência
                    </label>
                    <select
                      id="experience_time"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      name="experience_time"
                      required=""
                      value={newContract.experience_time}
                      onChange={handleInputChange}
                    >
                      <option value="">Período de Experiência</option>
                      <option value="30">30 Dias</option>
                      <option value="45">45 Dias</option>
                      <option value="60">60 Dias</option>
                      <option value="90">90 Dias</option>
                    </select>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="type"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Tipo de Contrato
                    </label>
                    <select
                      id="type"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600' ${!this.value} ? bg-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      name="type"
                      required=""
                      value={newContract.type}
                      onChange={handleInputChange}
                    >
                      <option value="">Tipo de Contrato</option>
                      <option value="Mensal">Mensal</option>
                      <option value="Intermitente">Intermitente</option>
                    </select>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="experience_time"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Função
                    </label>
                    <select
                      id="job_id"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      name="job_id"
                      required=""
                      value={newContract.job_id}
                      onChange={handleInputChange}
                    >
                      {jobs.map((job) => (
                        <option key={job.id} value={job.id}>
                          {job.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Contratar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

