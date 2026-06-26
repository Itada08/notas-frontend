import Link from "next/link";
import Image from "next/image";
import React from "react";
import logoOfc from "../../components/img/logoOfc.jpg";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 to-blue-200 flex flex-col">
      

      <header className="w-full flex justify-center mt-6">
        <div className="w-[90%] flex justify-between items-center p-6 bg-white/70 backdrop-blur rounded-2xl margin-left-10">
          
          <Image
            src={logoOfc}
            alt="Logo"
            width={40}
            height={40}
            style={{ borderRadius: "30%" }}
          />


          <nav className="flex gap-6">
            <Link href="#">Inicio</Link>
            <Link href="#">Sobre</Link>
            <Link href="#">Serviços</Link>
            <Link href="#">Contato</Link>
          </nav>

          <div className="flex gap-3">
            <Link
              href="/login"
              className="px-4 py-2 border rounded-full"
            >
              Login
            </Link>

            <Link
              href="/cadastro"
              className="bg-pink-500 text-white px-4 py-2 rounded-full"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>


      <main className="flex flex-1 items-center justify-between px-10 mt-10 ml-10">

  <div className="max-w-md">
    <h2 className="text-4xl font-bold mb-4">Notas Rápidas</h2>
    <p className="text-gray-700 mb-6">
      Organize suas ideias de forma simples, rápida e prática.
    </p>

    <Link
      href="/cadastro"
      className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full"
    >
      Começar
    </Link>
  </div>


  <div className="max-w-md bg-white/70 backdrop-blur p-6 rounded-2xl shadow-md mr-10">
    <h3 className="text-2xl font-semibold mb-4">Notas Faceis</h3>
    <p className="text-gray-700 leading-relaxed">
      A ideia foi criar um protótipo de bloco de notas online, onde você pode
      escrever suas ideias e guardar tudo em um só lugar. O objetivo é ter um
      espaço que não só armazene suas anotações, mas também ajude a lembrar
      delas depois. É como ter um caderno digital sempre à mão, fácil de
      acessar e organizado.
    </p>
  </div>
</main>



      <footer className="w-full flex justify-center mt-10 mb-4">
        <div className="w-[90%] bg-white/70 backdrop-blur rounded-2xl px-8 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
          
          <p>© 2026 Notas Fáceis. Todos os direitos reservados.</p>

          <div className="flex gap-6 mt-2 md:mt-0">
            <Link href="#">Privacidade</Link>
            <Link href="#">Termos</Link>
            <Link href="#">Contato</Link>
          </div>

        </div>
      </footer>

    </div>
  );
}