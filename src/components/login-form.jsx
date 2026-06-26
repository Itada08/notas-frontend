"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import React, { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import logo from "../components/img/logoOfc.jpg";

export function LoginForm({
  className,
  ...props
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Email ou senha inválidos.");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 to-blue-200 flex flex-col">

      <header className="w-full flex justify-center mt-6">
        <div className="w-[90%] flex items-center justify-between px-8 py-4 bg-white/70 backdrop-blur rounded-2xl">
          <Image
              src={logo}
              alt="Logo"
              width={40}          
              height={40} 
              style={{ borderRadius: "30%" }}
          />

          <nav className="flex gap-8">
            <Link href="/">Início</Link>
            <Link href="#sobre">Sobre</Link>
            <Link href="#servicos">Serviços</Link>
            <Link href="#contato">Contato</Link>
          </nav>

          <Link
            href="/cadastro"
            className="bg-pink-500 text-white px-4 py-2 rounded-full"
          >
            Sign Up
          </Link>
        </div>
      </header>

      <div className={cn("flex flex-1 items-center justify-center mt-10 p-6", className)} {...props}>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Entrar com sua conta</CardTitle>
            <CardDescription>
              Insira seu e-mail abaixo para acessar sua conta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Senha</FieldLabel>
                    <Link
                      href="/recuperar-senha"
                      className="ml-auto text-sm hover:underline"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Field>

                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                <Field>
                  <Button type="submit" className="w-full mb-2" disabled={loading}>
                    {loading ? "Entrando..." : "Login"}
                  </Button>
                  <Button variant="outline" type="button" className="w-full mb-2">
                    Login com Google
                  </Button>
                  <FieldDescription className="text-center">
                    Não tenho conta? <Link href="/cadastro">Cadastrar-me</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>

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
  )
}