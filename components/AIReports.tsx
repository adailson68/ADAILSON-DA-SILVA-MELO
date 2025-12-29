
import React, { useState } from 'react';
import { AttendanceRecord, Employee } from '../types';
import { getAIInsights } from '../services/geminiService';

interface AIReportsProps {
  records: AttendanceRecord[];
  employee: Employee;
}

const AIReports: React.FC<AIReportsProps> = ({ records, employee }) => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<{ resumo: string; alerta: string; recomendacao: string } | null>(null);

  const generateInsights = async () => {
    setLoading(true);
    const result = await getAIInsights(records, employee);
    setInsights(result);
    setLoading(false);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Análise Inteligente Gemini</h3>
          <p className="text-sm text-slate-500">Utilizamos inteligência artificial para otimizar sua jornada e identificar padrões.</p>
        </div>
        <button
          onClick={generateInsights}
          disabled={loading}
          className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all shadow-md ${
            loading 
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 active:scale-95'
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processando Relatório...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Gerar Relatório IA
            </>
          )}
        </button>
      </div>

      {!insights && !loading && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
           <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
           </svg>
           <p className="font-medium">Clique no botão acima para iniciar a análise dos dados do mês.</p>
        </div>
      )}

      {insights && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h4 className="flex items-center text-blue-800 font-bold mb-3 uppercase tracking-wider text-xs">
              <span className="p-1 bg-blue-100 rounded mr-2">📊</span> Resumo de Performance
            </h4>
            <p className="text-slate-700 leading-relaxed text-sm">{insights.resumo}</p>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
            <h4 className="flex items-center text-amber-800 font-bold mb-3 uppercase tracking-wider text-xs">
              <span className="p-1 bg-amber-100 rounded mr-2">⚠️</span> Alertas e Ponto Crítico
            </h4>
            <p className="text-slate-700 leading-relaxed text-sm">{insights.alerta}</p>
          </div>

          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
            <h4 className="flex items-center text-emerald-800 font-bold mb-3 uppercase tracking-wider text-xs">
              <span className="p-1 bg-emerald-100 rounded mr-2">💡</span> Sugestão Estratégica
            </h4>
            <p className="text-slate-700 leading-relaxed text-sm">{insights.recomendacao}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIReports;
