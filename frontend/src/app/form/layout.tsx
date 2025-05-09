import AuthLayout from "@/components/layout/auth-layout";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}