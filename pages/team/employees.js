import Layout from "@/components/Layout";
import TeamsNavbar from "@/components/TeamsNavbar";
import EmployeesTable from "@/components/EmployeesTable";

export default function EmployeesPage() {
  return (
    <Layout title="Colaboradores">
      <div >
        <h3 class="text-3xl font-bold dark:text-white">Equipe</h3>
      </div>

      <TeamsNavbar />
      <EmployeesTable />
    </Layout>
  );
}
