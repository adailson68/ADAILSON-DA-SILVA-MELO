
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AttendanceSheet from './components/AttendanceSheet';
import AIReports from './components/AIReports';
import { EMPLOYEE_DATA, EMPLOYER_DATA, CLIENT_DATA, generateMockAttendance } from './constants';
import { AttendanceRecord } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    // Inicializar dados
    setAttendance(generateMockAttendance());
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard records={attendance} />;
      case 'folha':
        return (
          <AttendanceSheet 
            records={attendance} 
            employer={EMPLOYER_DATA} 
            employee={EMPLOYEE_DATA} 
            client={CLIENT_DATA} 
          />
        );
      case 'relatorios':
        return <AIReports records={attendance} employee={EMPLOYEE_DATA} />;
      default:
        return (
          <div className="bg-white p-20 text-center rounded-xl border border-slate-200">
             <h2 className="text-2xl font-bold text-slate-300">Funcionalidade em desenvolvimento</h2>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 p-8 transition-all duration-300">
        <header className="flex items-center justify-between mb-8 no-print">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {activeTab === 'dashboard' ? 'Bem-vindo, Cícero' : activeTab === 'folha' ? 'Folha de Ponto Digital' : 'Relatórios Inteligentes'}
            </h1>
            <p className="text-slate-500 font-medium">Período: 21 de Dezembro - 20 de Janeiro</p>
          </div>
          
          <div className="flex items-center space-x-4">
             <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
                <span className="text-xs font-bold text-slate-600 uppercase">Sistema Online</span>
             </div>
             <button className="bg-blue-100 text-blue-700 p-2 rounded-lg hover:bg-blue-200 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
             </button>
          </div>
        </header>

        <section className="animate-in fade-in duration-700">
          {renderContent()}
        </section>

        <footer className="mt-20 pt-8 border-t border-slate-200 text-center text-slate-400 text-xs no-print pb-10">
          <p>© 2024 AFJ SERVIÇOS E LOCAÇÕES LTDA. Todos os direitos reservados.</p>
          <p className="mt-1 font-medium">Desenvolvido com tecnologia Gemini AI para máxima eficiência operacional.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
