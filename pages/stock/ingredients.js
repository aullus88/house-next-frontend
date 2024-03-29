import Layout from "@/components/Layout";
import StockNavbar from "@/components/stock/StockNavbar";
import { productsData } from "@/components/mocks/products";
import Table from "@/components/common/Table";
import { ingredientsData } from "@/components/mocks/ingredients";

export default function ProductsPage() {
  return (
    <Layout title="Estoque">

      <StockNavbar />
      <Table data={ingredientsData} title={"ingredients"} root={"stock"}/>
    </Layout>
  );
}
