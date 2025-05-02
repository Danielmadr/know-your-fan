import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Aqui você implementaria a verificação real de credenciais
    // Este é apenas um exemplo simplificado
    if (username === "admin" && password === "password123") {
      return NextResponse.json({
        success: true,
        user: { id: 1, username, name: "Administrador FURIA" },
        token: "exemplo-token-jwt",
      });
    }

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
