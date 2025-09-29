import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="max-w-5xl mx-auto p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Bookstore</h1>
          <nav className="flex gap-3">
            <Link href="/authors">Autores</Link>
            <Link href="/books">Libros</Link>
            <Link href="/crear" className="px-3 py-1 rounded bg-black text-white">Crear Autor</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
