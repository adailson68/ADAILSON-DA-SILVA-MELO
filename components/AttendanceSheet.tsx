
import React from 'react';
import { AttendanceRecord, Employer, Employee, Client } from '../types';

interface AttendanceSheetProps {
  records: AttendanceRecord[];
  employer: Employer;
  employee: Employee;
  client: Client;
}

const AttendanceSheet: React.FC<AttendanceSheetProps> = ({ records, employer, employee, client }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 overflow-x-auto print:border-0 print:shadow-none print:p-0">
      {/* Cabeçalho Oficial */}
      <div className="border-2 border-slate-800 p-4 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold">CONTROLE DE FREQUÊNCIA</h2>
            <p className="text-sm uppercase"><span className="font-bold">Empregador:</span> {employer.name}</p>
            <p className="text-sm uppercase"><span className="font-bold">Endereço:</span> {employer.address}</p>
            <p className="text-sm uppercase"><span className="font-bold">CNPJ/CEI:</span> {employer.cnpj}</p>
          </div>
          <div className="text-right">
             <p className="text-sm font-bold">Período: 21/12/2025 a 20/01/2026</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-4">
          <div>
            <p className="text-xs uppercase"><span className="font-bold">Empregado:</span> {employee.id} {employee.name}</p>
            <p className="text-xs uppercase"><span className="font-bold">Cargo:</span> {employee.role}</p>
            <p className="text-xs uppercase"><span className="font-bold">Lotação:</span> {employee.unit}</p>
          </div>
          <div>
            <p className="text-xs uppercase"><span className="font-bold">CTPS:</span> {employee.ctps}</p>
            <p className="text-xs uppercase"><span className="font-bold">Tomador:</span> {client.name}</p>
            <p className="text-xs uppercase font-bold text-slate-500">CNPJ: {client.cnpj}</p>
          </div>
        </div>
      </div>

      <table className="w-full border-collapse border border-slate-800 text-xs">
        <thead className="bg-slate-100 uppercase font-bold">
          <tr>
            <th className="border border-slate-800 p-1" rowSpan={2}>Data</th>
            <th className="border border-slate-800 p-1" colSpan={2}>Manhã</th>
            <th className="border border-slate-800 p-1" colSpan={2}>Tarde</th>
            <th className="border border-slate-800 p-1" rowSpan={2}>Extras</th>
            <th className="border border-slate-800 p-1" rowSpan={2}>Assinatura do Empregado</th>
          </tr>
          <tr>
            <th className="border border-slate-800 p-1">Ent.</th>
            <th className="border border-slate-800 p-1">Saí.</th>
            <th className="border border-slate-800 p-1">Ent.</th>
            <th className="border border-slate-800 p-1">Saí.</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, i) => (
            <tr key={i} className={record.status === 'folga' ? 'bg-slate-50' : ''}>
              <td className="border border-slate-800 p-1 text-center font-medium">
                {new Date(record.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
              </td>
              <td className="border border-slate-800 p-1 text-center">{record.entry1 || (record.status === 'folga' ? 'FOLGA' : '-')}</td>
              <td className="border border-slate-800 p-1 text-center">{record.exit1 || (record.status === 'folga' ? 'FOLGA' : '-')}</td>
              <td className="border border-slate-800 p-1 text-center">{record.entry2 || (record.status === 'folga' ? 'FOLGA' : '-')}</td>
              <td className="border border-slate-800 p-1 text-center">{record.exit2 || (record.status === 'folga' ? 'FOLGA' : '-')}</td>
              <td className="border border-slate-800 p-1 text-center font-bold text-blue-600">{record.extraHours > 0 ? `+${record.extraHours}` : '-'}</td>
              <td className="border border-slate-800 p-1"></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-12 grid grid-cols-2 gap-20 px-10 no-print">
        <div className="border-t border-slate-800 pt-2 text-center text-xs">
          Assinatura do Empregado
        </div>
        <div className="border-t border-slate-800 pt-2 text-center text-xs">
          Assinatura do Empregador
        </div>
      </div>
      
      <div className="mt-8 text-center no-print">
          <button 
            onClick={() => window.print()}
            className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition flex items-center mx-auto"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimir Folha de Ponto
          </button>
      </div>
    </div>
  );
};

export default AttendanceSheet;
