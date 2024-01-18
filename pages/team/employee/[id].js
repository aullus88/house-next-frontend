import { getEmployee, getAllEmployees } from "@/dbRoutes/employees";
import { useRouter } from "next/router";
import { parseCookies } from "@/helpers";
import Layout from "@/components/Layout";
import TeamsNavbar from "@/components/TeamsNavbar";
import Link from "next/link";

export default function EmployeePage({
  employee,
  previousEmployee,
  nextEmployee,
}) {
  const router = useRouter();
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  const handleNextPage = () => {
    // Redirect to the next employee page using the nextEmployee ID
    // You can use the Link component or router.push here
  };

  const handlePreviousPage = () => {
    // Redirect to the previous employee page using the previousEmployee ID
    // You can use the Link component or router.push here
  };

  return (
    <Layout title="Equipe">
      <TeamsNavbar />
      {/* //CREATE BUTONS ON LEFT AND RIGHT OF THE PAGE DO GO TO THE PREVIOUS AND NEXT EMPLOYEE */}

      <div className="flex mx-auto my-4 justify-between px-4 w-full ">
        {/* Button or link for next page */}

        {/* Button or link for previous page */}
        {previousEmployee && (
          <Link
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            href={`/team/employee/${previousEmployee}`}
          >
            Anterior
          </Link>
        )}
        {nextEmployee && (
          <Link
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            href={`/team/employee/${nextEmployee}`}
          >
            Próximo
          </Link>
        )}
      </div>
      <div className="flex flex-col w-full mx-auto my-4 p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold dark:text-white">
            {employee.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Employee ID: {employee.id}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2 dark:text-white">
              Personal Information
            </h2>
            <p className="mb-2 dark:text-gray-300">
              <strong>Birth Date:</strong> {formatDate(employee.birth_date)}
            </p>
            <p className="mb-2 dark:text-gray-300">
              <strong>CPF:</strong> {employee.cpf}
            </p>
            <p className="mb-2 dark:text-gray-300">
              <strong>Phone:</strong> {employee.phone}
            </p>
            <p className="dark:text-gray-300">
              <strong>Email:</strong> {employee.email || "N/A"}
            </p>
            {/* Add other personal information fields as needed */}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 dark:text-white">
              Employment Information
            </h2>
            <p className="mb-2 dark:text-gray-300">
              <strong>Active Status:</strong>{" "}
              {employee.active ? "Active" : "Inactive"}
            </p>
            <p className="mb-2 dark:text-gray-300">
              <strong>PIS:</strong> {employee.pis}
            </p>
            {/* Add other employment information fields as needed */}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { id }, req }) {
  const { token } = parseCookies(req);

  try {
    const employees = await getAllEmployees({ token });
    const sortedEmployees = employees.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    const employeeIndex = sortedEmployees.findIndex(
      (employee) => employee.id === parseInt(id)
    );

    const nextEmployee = sortedEmployees[employeeIndex + 1]?.id || null;
    const previousEmployee = sortedEmployees[employeeIndex - 1]?.id || null;

    const employee = await getEmployee({ id, token });

    return {
      props: {
        employee,
        token,
        nextEmployee,
        previousEmployee,
      },
    };
  } catch (error) {
    console.error("Error fetching employee data:", error);

    return {
      props: {
        employee: null,
        token,
        nextEmployee: null,
        previousEmployee: null,
      },
    };
  }
}
