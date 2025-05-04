from models.fan_data import FanData
from utils.openai_request import send_gpt_request  # ajuste conforme o caminho real do seu projeto
from services.document_validator import validate_rg_document
from services.face_validator import verify_faces
import json

def analyze_fan_data(fan: FanData, selfie_path: str, document_path: str , ) -> FanData:
    prompt = f"""
        Você é um especialista em marketing e comportamento de fãs de e-sports.

        Com base nos dados abaixo, analise o perfil do fã e gere um JSON com os seguintes campos:

        - fanType: tipo de fã (ex: "super fã", "casual", "novato", etc.), com base no engajamento.
        - engagementScore: número entre 0 e 100 que representa o nível de envolvimento com a marca.
        - contentPreference: tipo de conteúdo preferido do fã (ex: bastidores, gameplay, entrevistas).
        - potentialRevenue: estimativa de valor como cliente (ex: "baixo", "médio", "alto").
        - recommendationSummary: resumo personalizado explicando o perfil do fã com base nas informações.

        ### Instruções:
        - Use apenas as informações fornecidas. 
        - Seja coerente e objetivo.
        - Responda **exclusivamente** com um **JSON válido** contendo **apenas** essas chaves e seus respectivos valores.
        - Não adicione explicações, comentários ou texto fora do JSON.

        ### Dados do fã:
        - Nome: {fan.fullName}
        - Redes sociais que segue: {', '.join(fan.socials) if fan.socials else 'nenhuma'}
        - Conteúdo preferido: {', '.join(fan.content) if fan.content else 'nenhum'}
        - Compras no e-commerce: {', '.join(fan.ecommerce) if fan.ecommerce else 'nenhuma'}
        - Influenciadores: {fan.influencers or 'nenhum'}
        - Eventos: {fan.events or 'nenhum'}
        - Jogo favorito: {fan.favoriteGame or 'não informado'}
        - Localização: {fan.location}
        - Deseja receber conteúdo exclusivo: {fan.exclusiveContent or 'não informado'}
        - Mensagem: {fan.message or 'nenhuma'}
        """

    chatbot_prompt = f"""
            Você é um engenheiro de prompts. Com base nos dados do fã abaixo, crie um prompt de sistema que será enviado a uma IA para que ela atue como o chatbot oficial da FURIA Esports. A função do chatbot é gerar mensagens personalizadas e empolgantes para este fã, levando em conta seu nível de engajamento com a marca. Entregue a resposta em JSON, com a chave "personalChatbot" e o valor sendo o prompt de sistema gerado.

            Dados do fã:
            O prompt de sistema gerado deve instruir a IA a:
            - Cumprimentar o fã pelo nome ({fan.fullName}) e chamar pelo apelido ({fan.nickname}) em interações casuais.
            - Adaptar o conteúdo e tom das mensagens com base no nível de envolvimento do fã,({fan.fanType}), considerando:
                - Se já comprou produtos ({', '.join(fan.ecommerce)}), recomendar itens exclusivos e lançamentos limitados.
                - Se participa de eventos ({', '.join(fan.events)}), estimular interações e oferecer curiosidades dos bastidores.
            - Mencionar os tipos de conteúdo que o fã gosta ({', '.join(fan.content)}), trazendo insights relevantes.
            - Dar prioridade ao jogo favorito do fã ({fan.favoriteGame}), mas também mencionar outros jogos populares da FURIA.
            - Comentar sobre influenciadores que o fã acompanha ({', '.join(fan.influencers)}), com informações recentes sobre eles.
            - Personalizar sugestões com base na localização ({fan.location}) para destacar conteúdos e eventos próximos.
            - Falar sobre o desejo do fã por conteúdo exclusivo ({fan.exclusiveContent}) e propor benefícios especiais.
            - falar sobre interagir nas redes sociais do fã ({', '.join(fan.socials)}) e sugerir maneiras de se conectar com a FURIA.
            - Sugerir interações interessantes, como:
                - Receber novidades em primeira mão
                - Acessar bastidores de torneios e treinos
                - Descobrir curiosidades sobre seu jogador favorito
                - Participar de desafios e enquetes
            - Criar mensagens com tom empolgado, informal e envolvente, usando vocabulário voltado para fãs de e-sports.
            - Evitar respostas genéricas, garantindo que a IA traga detalhes relevantes sobre a FURIA Esports e seu ecossistema.
        """

    messages = [
        {"role": "user", "content": prompt},
    ]

    gpt_response = send_gpt_request(messages)
    
    # Tenta converter a resposta JSON em dicionário
    try:
        result = json.loads(gpt_response)
    except json.JSONDecodeError:
        raise ValueError(f"Resposta do GPT não está em JSON válido:\n{gpt_response}")

    # Atualiza os campos no FanData
    fan.fanType = result.get("fanType")
    fan.engagementScore = result.get("engagementScore")
    fan.contentPreference = result.get("contentPreference")
    fan.potentialRevenue = result.get("potentialRevenue")
    fan.recommendationSummary = result.get("recommendationSummary")
    
    # Cria o prompt para o chatbot
    messages = [
        {"role": "user", "content": chatbot_prompt},
    ]
    gpt_response = send_gpt_request(messages)
    
        # Tenta converter a resposta JSON em dicionário
    try:
        result = json.loads(gpt_response)
    except json.JSONDecodeError:
        raise ValueError(f"Resposta do GPT não está em JSON válido:\n{gpt_response}")
    fan.personalChatbot = result.get("personalChatbot")
    
    # Valida o documento
    documentResponse = validate_rg_document(document_path)
    fan.documentStatus = documentResponse.get("documentStatus")
    fan.documentReport = documentResponse.get("documentReport")
    
    # Verifica a selfie
    selfieResponse = verify_faces(selfie_path, document_path)
    fan.selfieStatus = selfieResponse.get("selfieStatus")
    fan.selfieMatchScore = selfieResponse.get("selfieMatchScore")

    if fan.selfieStatus in ["rejected", None] and fan.documentStatus in ["rejected", None]:
        fan.fanStatus = "verified fail"
    elif fan.selfieStatus in ["rejected", None] or fan.documentStatus in ["rejected", None]:
        fan.fanStatus = "verified partial"
    elif fan.selfieStatus == "verified" and fan.documentStatus == "verified":
        fan.fanStatus = "verified success"


    return fan
