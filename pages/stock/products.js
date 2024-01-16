import EmployeesTable from "@/components/EmployeesTable";
import Layout from "@/components/Layout";
import StockNavbar from "@/components/stock/StockNavbar";
import { productsData } from "@/components/mocks/products";
import Table from "@/components/common/Table";

export default function ProductsPage() {
  return (
    <Layout title="Estoque">

      <StockNavbar />
      <Table data={productsData} title={"products"} root={"stock"}/>
      {/* <EmployeesTable /> */}
    </Layout>
  );
}
