
import { GoogleGenAI } from "@google/genai";
import { AttendanceRecord, Employee } from "../types";

export const getAIInsights = async (records: AttendanceRecord[], employee: Employee) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const summary = records.map(r => 
    `${r.date}: ${r.status}${r.extraHours > 0 ? ` (+${r.extraHours}h extras)` : ''}`
  ).join('\n');

  const prompt = `
    Analise o controle de frequência do funcionário abaixo e forneça um relatório inteligente:
    Funcionário: ${employee.name}
    Cargo: ${employee.role}
    Unidade: ${employee.unit}
    
    Dados de Frequência:
    ${summary}
    
    Por favor, retorne um objeto JSON com:
    1. "resumo": Um parágrafo resumindo a pontualidade e dedicação.
    2. "alerta": Quaisquer inconsistências ou excesso de horas extras detectadas.
    3. "recomendacao": Sugestão para otimização de rotas ou jornada baseada no cargo de Motorista.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Erro ao consultar Gemini:", error);
    return {
      resumo: "Não foi possível gerar a análise inteligente no momento.",
      alerta: "Serviço indisponível.",
      recomendacao: "Tente novamente mais tarde."
    };
  }
};
