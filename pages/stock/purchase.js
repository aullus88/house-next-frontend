import Layout from "@/components/Layout";
import StockNavbar from "@/components/stock/StockNavbar";

export default function PurchasePage() {
  return (
    <Layout title="Compras">
      <div >
        <h3 class="text-3xl font-bold dark:text-white">Compras</h3>
      </div>

      <StockNavbar />
    </Layout>
  );
}
