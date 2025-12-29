
import { Employee, Employer, Client, AttendanceRecord } from './types';

export const EMPLOYEE_DATA: Employee = {
  id: '000023',
  name: 'CICERO MENDES DE CARVALHO',
  role: 'MOTORISTA DE VAN',
  ctps: '00003289329/09504',
  unit: '022 DRE 04 - VAN 13'
};

export const EMPLOYER_DATA: Employer = {
  name: 'AFJ SERVIÇOS E LOCAÇÕES LTDA',
  address: 'ROD BR-101 LOT. CHACARAS JOAO PAULO II, SN BOX 02',
  cnpj: '34.265.449/0001-01'
};

export const CLIENT_DATA: Client = {
  name: 'SEC DE ESTADO DA EDUCACAO E DA CULTURA',
  cnpj: '34.841.195/0001-14'
};

export const PERIOD = {
  start: '2025-12-21',
  end: '2026-01-20'
};

// Gerar dados fictícios para o período
export const generateMockAttendance = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const start = new Date(PERIOD.start);
  const end = new Date(PERIOD.end);
  
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay();
    const dateStr = d.toISOString().split('T')[0];
    
    if (dayOfWeek === 0) { // Domingo
      records.push({ date: dateStr, entry1: '', exit1: '', entry2: '', exit2: '', extraHours: 0, status: 'folga' });
    } else if (dayOfWeek === 6) { // Sábado (meio período ou folga)
       records.push({ date: dateStr, entry1: '08:00', exit1: '12:00', entry2: '', exit2: '', extraHours: 0, status: 'presente' });
    } else {
      // Dias normais
      records.push({
        date: dateStr,
        entry1: '07:30',
        exit1: '12:00',
        entry2: '13:30',
        exit2: '17:30',
        extraHours: Math.random() > 0.8 ? Math.floor(Math.random() * 2) + 1 : 0,
        status: 'presente'
      });
    }
  }
  return records;
};
