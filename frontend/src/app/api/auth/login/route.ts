import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Verificar credenciais - Aceitar admin/admin
    if (username === "admin" && password === "admin") {
      return NextResponse.json({
        success: true,
        user: { id: 1, username: "admin", name: "Administrador FURIA" },
        token: "exemplo-token-jwt-admin",
      });
    }

    // Credenciais inválidas
    return NextResponse.json(
      { success: false, message: "Credenciais inválidas" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Erro durante login:", error);
    return NextResponse.json(
      { success: false, message: "Erro no servidor" },
      { status: 500 }
    );
  }
}
