import Layout from "@/components/Layout";
import StockNavbar from "@/components/stock/StockNavbar";

export default function EstoquePage() {
  return (
    <Layout title="Estoque">
      <div >
        <h3 class="text-3xl font-bold dark:text-white">Estoque</h3>
      </div>

      <StockNavbar />
    </Layout>
  );
}
