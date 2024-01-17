import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function TeamsNavbar() {
  const pathname = usePathname();

  console.log(pathname);

  const partPath = `/${pathname.split("/")[2]}`;

  const menuItems = [
    {
      title: "Pages",
      list: [
        {
          title: "Visão Geral",
          path: "/team",
        },
        {
          title: "Colaboradores",
          path: "/team/employees",
        },
        {
          title: "Contratos",
          path: "/team/contracts",
        },
        {
          title: "Gorjetas",
          path: "/team/tips",
        },
        {
          title: "Férias",
          path: "/team/vacations",
        },
        {
          title: "Descontos",
          path: "/team/discounts",
        },
        {
          title: "Fechamento de Folha",
          path: "/team/payroll",
        },
      ],
    },
  ];

  return (
    <>
      <nav className=" ">
        <div className="max-w-screen-xl px-1 py-4 ">
          <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              {menuItems.map((page) => (
                <div className="flex flex-wrap -mb-px" key={page.title}>
                  {page.list.map((item) => (
                    <li key={item.title} className="me-2">
                    <Link href={`${item.path}`} className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${pathname === item.path && "text-blue-600 border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500"}`}>{item.title}</Link>
                    </li>
                  ))}
                </div>
              ))}
            </ul>

            {/* <ul>
                          <li>
                              <Link href="/team" className={`text-gray-900 dark:text-whiterounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname === "href" && "dark:bg-gray-700"}`}>Visão Geral</Link>
                          </li>
                          <li>
                              <Link href="/team/employees" className={`text-gray-900 dark:text-whiterounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${partPath === "/employees" && "dark:bg-gray-700"}`}>Colaboradores</Link>
                          </li>
                          <li>
                              <Link href="/team/contracts" className="text-gray-900 dark:text-whiterounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contratos</Link>
                          </li>
                          <li>
                              <Link href="/team/tips" className="text-gray-900dark:text-whiterounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700e">Gorjeta</Link>
                          </li>
                          <li>
                              <Link href="/team/schedule" className="text-gray-900 dark:text-whiterounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Escalas</Link>
                          </li>
                          <li>
                              <Link href="/team/vacations" className="text-gray-900 dark:text-whiterounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Férias</Link>
                          </li>
                          <li>
                              <Link href="/team/discounts" className="text-gray-900 dark:text-whiterounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Descontos</Link>
                          </li>
                          <li>
                              <Link href="/team/payroll" className="text-gray-900 dark:text-whiterounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Fechamento de Folha</Link>
                          </li>
                      </ul> */}
          </div>
        </div>
      </nav>
    </>
  );
}
