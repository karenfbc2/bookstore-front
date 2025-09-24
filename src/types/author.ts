export interface Author {
  id?: number;
  name: string;
  description: string;
  image: string;
  birthDate: string; // Formato "YYYY-MM-DD"
  prizes?: string; // Lista de premios separados por comas
}
