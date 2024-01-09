import Layout from "@/components/Layout";
import TeamsNavbar from "@/components/TeamsNavbar";

export default function PayrollPage() {
  return (
    <Layout title="Equipe">
      <div >
        <h3 class="text-3xl font-bold dark:text-white">Equipe</h3>
      </div>

      <TeamsNavbar />
    </Layout>
  );
}
