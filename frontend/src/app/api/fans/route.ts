import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const response = await fetch("http://localhost:4000/fan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    return NextResponse.json({
      success: true,
      message: "Dados enviados com sucesso para o backend!",
      data: result,
    });
  } catch (error) {
    console.error("Erro ao enviar para o backend:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao enviar os dados para o backend",
      },
      { status: 500 }
    );
  }
}
