import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Aqui você processaria os dados, salvando em banco de dados, etc.
    console.log("Data Collected:", data);
    
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return NextResponse.json({ 
      success: true, 
      message: "Dados salvos com sucesso!" 
    });
  } catch (error) {
    console.error("Erro ao processar requisição:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Erro ao processar dados" 
    }, { status: 500 });
  }
}