import Link from "next/link";
import logo_dark from "@/public/house_logo_dark.svg";
import logo from "@/public/house_logo.png";
import Image from "next/image";
import AuthContext from "@/context/AuthContext";
import { useState, useEffect, useContext } from "react";
import MenuItem from "./mocks/MenuItem";

export default function Navbar({ children, title }) {

  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

if (prefersDarkMode) {
  // User prefers dark mode
  console.log('User prefers dark mode');
} else {
  // User prefers light mode
  console.log('User prefers light mode');
}
  const menuItems = [
    {
      title: "Pages",
      list: [
        {
          title: "Dashboard",
          path: "/dashboard",
        },
        {
          title: "Equipe",
          path: "/team",
        },
        {
          title: "Financeiro",
          path: "/finance",
        },
        {
          title: "Estoque",
          path: "/stock",
        },
        {
          title: "Clientes",
          path: "/customers",
        },
      ],
    },
  ];

  const { logout, user } = useContext(AuthContext);
  // console.log(user)

  return (
    <>
      <div className="h-screen flex flex-col">
        {/* <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <div className="px-3 py-2 lg:px-5 lg:pl-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center rtl:justify-end">
                <button
                  data-drawer-target="logo-sidebar"
                  data-drawer-toggle="logo-sidebar"
                  aria-controls="logo-sidebar"
                  type="button"
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                  </svg>
                </button>
                <Link href="/">
                  <div className="flex mx-auto">
                    <Image src={logo} alt="Picture of the author" />
                  </div>
                </Link>
              </div>
              <div className="flex items-center">
                <div className="flex items-center ms-3">
                  <div>
                    <button
                      type="button"
                      className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                      aria-expanded="false"
                      data-dropdown-toggle="dropdown-user"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        alt="user photo"
                      ></img>
                    </button>
                  </div>
                  <div
                    className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="dropdown-user"
                  >
                    <div className="px-4 py-3" role="none">
                      <p
                        className="text-sm text-gray-900 dark:text-white"
                        role="none"
                      >
                        Neil Sims
                      </p>
                      <p
                        className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                        role="none"
                      >
                        neil.sims@flowbite.com
                      </p>
                    </div>
                    <ul className="py-1" role="none">
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Earnings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav> */}
        <aside
          id="logo-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen pt-3 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-slate-900/50 dark:border-gray-700"
          aria-label="Sidebar"
        >
          <div className="flex flex-col h-full justify-between ">
          
            <div className="px-3 pb-4 overflow-y-auto bg-white dark:bg-slate-500/0">
            <Link href="/">
                  <div className="flex justify-center items-center mx-auto p-6">
                    <Image src={prefersDarkMode ? logo_dark : logo} width={180} alt="Picture of the author" />
                    
                  </div>
                </Link>
              <ul className="space-y-2 font-medium">
                {menuItems.map((page) => (
                  <li key={page.title}>
                    {page.list.map((item) => (
                      <MenuItem item={item} key={item.title} />
                    ))}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col h-fit p-2 gap-2 ">
              <p>{user ? user.email : ""}</p>
              <button
                onClick={logout}
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sair
              </button>
            </div>
          </div>
        </aside>
        <main className="flex-col h-screen p-4  sm:ml-64 bg-stone-100 dark:bg-stone-950  max-w-full">   
        <div >
        <h3 className="text-3xl font-bold dark:text-white">{title}</h3>
      </div>     
          {children}
        </main>
      </div>
    </>
  );
}
