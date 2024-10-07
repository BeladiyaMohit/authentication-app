import AuthForm from "@/components/auth-form";

export default function Home({ searchParams }: { searchParams?: { mode: "login" | "signUp" } }) {
  const FormMode = searchParams?.mode || "login";
  return <AuthForm mode={FormMode} />;
}
