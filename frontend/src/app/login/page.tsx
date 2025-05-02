import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="flex-1 flex flex-col justify-center items-center">
        <LoginForm />
      </div>
      <div className="hidden lg:flex lg:w-1/2 bg-black">
        <div className="w-full h-full bg-[url('/furia-login-bg.jpg')] bg-cover bg-center opacity-70"></div>
      </div>
    </div>
  );
}