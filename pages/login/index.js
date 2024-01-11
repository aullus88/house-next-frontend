import Image from "next/image";
import mainLogoDark from "@/public/main_logo_dark.png";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {login, user} = useContext(AuthContext)

  // useEffect(() => error && toast.error(error))


  const handleSubmit = (e) => {
    e.preventDefault();
    login({email, password})
  };

  return (
    <>
      <div className="flex bg-stone-900">
      
        <div className="flex items-center w-1/2 h-screen">
          <div className=" mx-auto">
            <Image src={mainLogoDark} width={300} alt="Picture of the author" />
          </div>
        </div>
        <div className="flex w-1/2 h-screen">
          <div className="relative mx-auto my-4 py-3 max-w-md align-middle container  my-auto bg-white rounded-lg shadow dark:bg-white shadow-lg shadow-slate-800">
            <h1 className="text-2xl text-black text-center font-semi-bold">
              Login
            </h1>
            <form
              className="max-w-sm object-center mx-auto my-4 py-3 "
              onSubmit={handleSubmit}
            >
              <div className="mb-5">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:gray-900"
                >
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
