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

    // Caso não seja admin/admin, fazer requisição para a API externa
    const externalResponse = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const externalData = await externalResponse.json();
    console.log("Dados da API externa:", externalData);

    // Retornar a resposta da API externa
    // @ts-expect-error: 'personalChatbot' is not defined in the global type but is dynamically added
    global.personalPrompt = externalData.personalChatbot;

    if (!externalResponse.ok) {
      return NextResponse.json(
        { success: false, message: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: { id: 1, username: externalData.nickname, name: externalData.name },
      token: "exemplo-token-jwt-user",
    });
  } catch (error) {
    console.error("Erro durante login:", error);
    return NextResponse.json(
      { success: false, message: "Erro no servidor" },
      { status: 500 }
    );
  }
}
