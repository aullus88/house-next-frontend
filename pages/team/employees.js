import Layout from "@/components/Layout";
import TeamsNavbar from "@/components/TeamsNavbar";
import EmployeesTable from "@/components/EmployeesTable";
import Table from "@/components/common/Table";
import { employeesData } from "@/components/mocks/employees";

export default function EmployeesPage() {
  return (
    <Layout title="Colaboradores">
      <div >
        <h3 class="text-3xl font-bold dark:text-white">Equipe</h3>
      </div>

      <TeamsNavbar />
      <Table data={employeesData} title={"employee"} root={"team"}/>
      {/* <EmployeesTable /> */}
    </Layout>
  );
}
