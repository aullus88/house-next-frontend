import Layout from "@/components/Layout";
import StockNavbar from "@/components/stock/StockNavbar";

export default function SettingsPage() {
  return (
    <Layout title="Ajustes">
      <div >
        <h3 class="text-3xl font-bold dark:text-white">Ajustes</h3>
      </div>

      <StockNavbar />
    </Layout>
  );
}
