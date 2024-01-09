import React from 'react'
import Link from 'next/link'

export default function StockNavbar() {
  return (
    <>
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
      </nav>
      
      <nav class="bg-gray-50 dark:bg-black ">
        <div class="max-w-screen-xl px-4 py-3 mx-auto">
          <div class="flex items-center">
            <ul class="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm w-full justify-around">
              <li>
                <Link href="/stock"
                class="text-gray-900 dark:text-whiterounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Visão Geral
                </Link>
              </li>
              <li>
                <a href="/stock/products"
                class="text-gray-900 dark:text-whiterounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Produtos
                </a>
              </li>
              <li>
                <a href="/stock/ingredients"
                class="text-gray-900 dark:text-whiterounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Ingredientes
                </a>
              </li>
              <li>
                <a href="/stock/purchase"
                class="text-gray-900 dark:text-whiterounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Compras
                </a>
              </li>
              <li>
                <a href="/stock/production"
                class="text-gray-900dark:text-whiterounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700e">
                  Produção
                </a>
              </li>
              <li>
                <a href="/stock/settings"
                class="text-gray-900 dark:text-whiterounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Ajustes
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
