import Layout from "@/components/Layout";
import TeamsNavbar from "@/components/TeamsNavbar";
import EmployeesTable from "@/components/EmployeesTable";
import Table from "@/components/common/Table";
import { employeesData } from "@/components/mocks/employees";
import { useRouter } from "next/router";

export default function EmployeesPage() {
  const router = useRouter();
  const id = router.query.id;
  return (
    <Layout title="Colaboradores">
      <div >
        <h3 className="text-2xl font-regular dark:text-white">Funcionario {id}</h3>
      </div>

      <TeamsNavbar />
      {/* <Table data={employeesData}/> */}
      {/* <EmployeesTable /> */}
    </Layout>
  );
}
