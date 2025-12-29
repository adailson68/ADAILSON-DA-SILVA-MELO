
export interface Employee {
  id: string;
  name: string;
  role: string;
  ctps: string;
  unit: string;
}

export interface Employer {
  name: string;
  address: string;
  cnpj: string;
}

export interface Client {
  name: string;
  cnpj: string;
}

export interface AttendanceRecord {
  date: string;
  entry1: string;
  exit1: string;
  entry2: string;
  exit2: string;
  extraHours: number;
  status: 'presente' | 'falta' | 'feriado' | 'folga';
  observation?: string;
}

export interface MonthlyStats {
  totalHours: number;
  totalExtra: number;
  absences: number;
  workingDays: number;
}
