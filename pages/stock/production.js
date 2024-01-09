import Layout from "@/components/Layout";
import StockNavbar from "@/components/stock/StockNavbar";

export default function ProductionPage() {
  return (
    <Layout title="Produção">
      <div >
        <h3 class="text-3xl font-bold dark:text-white">Produção</h3>
      </div>

      <StockNavbar />
    </Layout>
  );
}
