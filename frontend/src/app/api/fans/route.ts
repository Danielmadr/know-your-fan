import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Verificar o Content-Type para determinar como processar a requisição
    const contentType = request.headers.get("Content-Type") || "";
    
    if (contentType.includes("multipart/form-data")) {
      // Processar como FormData (para upload de arquivos)
      const formData = await request.formData();
      
      // Enviar para o backend usando formData
      const response = await fetch("http://localhost:4000/fans", {
        method: "POST",
        // Não definir Content-Type - o fetch vai gerar um boundary apropriado
        body: formData,
      });

      const result = await response.json();

      return NextResponse.json({
        success: true,
        message: "Dados e arquivos enviados com sucesso para o backend!",
        data: result,
      });
    } else {
      // Processar como JSON (sem arquivos)
      const data = await request.json();
      
      console.log("Dados recebidos (JSON):", data);

      const response = await fetch("http://localhost:4000/fans", {
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
    }
  } catch (error) {
    console.error("Erro ao enviar para o backend:", error);
    console.error("Detalhes do erro:", error instanceof Error ? error.message : String(error));
    
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao enviar os dados para o backend: " + 
          (error instanceof Error ? error.message : "Erro desconhecido"),
      },
      { status: 500 }
    );
  }
}