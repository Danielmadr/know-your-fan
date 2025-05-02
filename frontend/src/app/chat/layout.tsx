import AuthLayout from "@/components/layout/auth-layout";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}