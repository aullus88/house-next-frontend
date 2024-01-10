import React from 'react'
import Link from 'next/link'

export default function TeamsNavbar() {
  return (
    

      <><nav class=" ">
              <div class="max-w-screen-xl px-4 py-3 mx-auto">
                  <div class="flex items-center">
                      <ul class="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                          <li>
                              <Link href="/team" class="text-gray-900 dark:text-whiterounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Visão Geal</Link>
                          </li>
                          <li>
                              <Link href="/team/employees" class="text-gray-900 dark:text-whiterounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Colaboradores</Link>
                          </li>
                          <li>
                              <Link href="/team/contracts" class="text-gray-900 dark:text-whiterounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contratos</Link>
                          </li>
                          <li>
                              <Link href="/team/tips" class="text-gray-900dark:text-whiterounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700e">Gorjeta</Link>
                          </li>
                          <li>
                              <Link href="/team/schedule" class="text-gray-900 dark:text-whiterounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Escalas</Link>
                          </li>
                          <li>
                              <Link href="/team/vacations" class="text-gray-900 dark:text-whiterounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Férias</Link>
                          </li>
                          <li>
                              <Link href="/team/discounts" class="text-gray-900 dark:text-whiterounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Descontos</Link>
                          </li>
                          <li>
                              <Link href="/team/payroll" class="text-gray-900 dark:text-whiterounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Fechamento de Folha</Link>
                          </li>
                      </ul>
                  </div>
              </div>
          </nav></>

  )
}
