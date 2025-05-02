# Know Your Fan

## Como rodar o projeto

1. Clone o repositório
2. Execute `docker-compose up --build`
3. Acesse o frontend em `http://localhost:3000`

Esse projeto usa Next.js, NestJS e Flask com Python para criar um perfil de fã de eSports.


// Estrutura inicial combinando Next.js (frontend), NestJS (API) e Python (serviços de IA)

// --- Estrutura de pastas sugerida:

/know-your-fan
├── frontend/              # Next.js app
├── backend/               # NestJS API
├── ai-services/           # Python IA para validações e análises
├── docker-compose.yml     # Orquestração dos containers
├── README.md

// --- docker-compose.yml (resumo da orquestração)

version: '3.9'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "4000:4000"
    depends_on:
      - ai
    environment:
      - MONGO_URL=mongodb://mongo:27017/fans

  ai:
    build: ./ai-services
    ports:
      - "5000:5000"

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:

// --- frontend (Next.js com TypeScript) - comandos iniciais
// npx create-next-app@latest frontend --typescript
// cd frontend && npm install axios

// Criar arquivo frontend/pages/index.tsx com o seguinte conteúdo:

import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface FormData {
  name: string;
  cpf: string;
  email: string;
  document: File | null;
}

export default function Home() {
  const [form, setForm] = useState<FormData>({
    name: '',
    cpf: '',
    email: '',
    document: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    } as FormData);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    if (form.document) formData.append('document', form.document);

    try {
      const response = await axios.post('http://localhost:5000/validate-id', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const extractedText = response.data.extracted_text;

      await axios.post('http://localhost:4000/fans', {
        name: form.name,
        cpf: form.cpf,
        email: form.email,
        documentText: extractedText,
      });

      alert(`Cadastro enviado com sucesso! Texto extraído: ${extractedText}`);
      setForm({ name: '', cpf: '', email: '', document: null });
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar dados. Verifique os serviços e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Link href="/dashboard">Ir para o Dashboard</Link>
      <h1>Cadastro de Fã de eSports</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nome" value={form.name} onChange={handleChange} required /><br />
        <input name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} required /><br />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required /><br />
        <input name="document" type="file" accept="image/*,application/pdf" onChange={handleChange} required /><br />
        <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Enviar'}</button>
      </form>
    </div>
  );
}

// Criar arquivo frontend/pages/dashboard.tsx com o seguinte conteúdo:

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Fan {
  name: string;
  cpf: string;
  email: string;
  documentText: string;
}

export default function Dashboard() {
  const [fans, setFans] = useState<Fan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4000/fans')
      .then(response => setFans(response.data))
      .catch(err => console.error('Erro ao carregar fãs:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <Link href="/">Voltar</Link>
      <h1>Dashboard de Fãs</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : fans.length === 0 ? (
        <p>Nenhum fã cadastrado.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Email</th>
              <th>Texto do Documento</th>
            </tr>
          </thead>
          <tbody>
            {fans.map((fan, index) => (
              <tr key={index}>
                <td>{fan.name}</td>
                <td>{fan.cpf}</td>
                <td>{fan.email}</td>
                <td style={{ maxWidth: '300px' }}>{fan.documentText}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// --- backend (NestJS) - comandos iniciais
// nest new backend
// cd backend && npm install @nestjs/axios mongoose @nestjs/mongoose

// Criar módulo e schema para Fan

// backend/src/fans/schemas/fan.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Fan extends Document {
  @Prop() name: string;
  @Prop() cpf: string;
  @Prop() email: string;
  @Prop() documentText: string;
}

export const FanSchema = SchemaFactory.createForClass(Fan);

// backend/src/fans/fans.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fan } from './schemas/fan.schema';

@Injectable()
export class FansService {
  constructor(@InjectModel(Fan.name) private fanModel: Model<Fan>) {}

  async create(data: Partial<Fan>): Promise<Fan> {
    return this.fanModel.create(data);
  }

  async findAll(): Promise<Fan[]> {
    return this.fanModel.find().exec();
  }
}

// backend/src/fans/fans.controller.ts
import { Controller, Post, Get, Body } from '@nestjs/common';
import { FansService } from './fans.service';

@Controller('fans')
export class FansController {
  constructor(private readonly fansService: FansService) {}

  @Post()
  create(@Body() fanData: any) {
    return this.fansService.create(fanData);
  }

  @Get()
  findAll() {
    return this.fansService.findAll();
  }
}

// backend/src/app.module.ts - adicionar importações
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Fan, FanSchema } from './fans/schemas/fan.schema';
import { FansController } from './fans/fans.controller';
import { FansService } from './fans/fans.service';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([{ name: Fan.name, schema: FanSchema }]),
  ],
  controllers: [FansController],
  providers: [FansService],
})
export class AppModule {}

// --- ai-services (Python) - comandos iniciais
// mkdir ai-services && cd ai-services
// python -m venv venv && source venv/bin/activate
// pip install flask transformers pytesseract face-recognition

// Criar app.py no ai-services com endpoints de validação

from flask import Flask, request, jsonify
import pytesseract
from PIL import Image
import io

app = Flask(__name__)

@app.route('/validate-id', methods=['POST'])
def validate_id():
    file = request.files['document']
    img_bytes = file.read()
    img = Image.open(io.BytesIO(img_bytes))
    text = pytesseract.image_to_string(img)
    return jsonify({"extracted_text": text})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

// README.md conterá instruções para:
// - Clonar o projeto
// - Executar docker-compose up
// - Acessar frontend em http://localhost:3000
// - Enviar documento via frontend
// - Ver lista de fãs cadastrados via GET http://localhost:4000/fans
// - Acessar painel de fãs em http://localhost:3000/dashboard

// O fluxo agora inclui persistência no MongoDB, listagem de fãs e dashboard. Próxima etapa pode incluir OAuth ou analytics.
