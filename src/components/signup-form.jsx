"use client";
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

export function SignupForm({
  ...props
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Erro ao criar conta. Verifique os dados e tente novamente.");
      return;
    }
try {
  const { data, error } = await authClient.signUp.email({
    name,
    email,
    password,
  });

  console.log("DATA:", data);
  console.log("ERROR:", error);
} catch (err) {
  console.error("ERRO COMPLETO:", err);
}
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 to-blue-200">

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
            <Link href="#">Sobre</Link>
            <Link href="#">Serviços</Link>
            <Link href="#">Contato</Link>
          </nav>

          <Link
            href="/login"
            className="px-4 py-2 border rounded-full"
          >
            Login
          </Link>
        </div>
      </header>

      <div className="flex items-center justify-center mt-10 p-6">
        <Card className="w-full max-w-md" {...props}>
          <CardHeader>
            <CardTitle>Criar conta</CardTitle>
            <CardDescription>
              Insira suas informações abaixo para criar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Nome Completo</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Francisco de Assis"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Field>
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
                  <FieldDescription>
                    Usaremos este endereço para entrar em contato com você.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirmar Senha
                  </FieldLabel>
                  <Input
                    id="confirm-password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Field>

                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                <Field>
                  <Button type="submit" className="w-full mb-2" disabled={loading}>
                    {loading ? "Criando conta..." : "Criar conta"}
                  </Button>
                  <Button variant="outline" type="button" className="w-full mb-2">
                    Login com Google
                  </Button>
                  <FieldDescription className="text-center">
                    Já tem uma conta? <Link href="/login">Entrar</Link>
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
  );
}