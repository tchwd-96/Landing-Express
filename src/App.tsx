export default function App() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Techno World Solution
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Landing Express
        </h1>

        <p className="mt-5 text-base leading-relaxed text-slate-700">
          Repositorio privado de trabajo para las demos y el material comercial
          de Landing Express de Techno World Solution.
        </p>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700">
          <p>
            La revisión se realiza mediante ramas y pull requests. Las demos
            usan datos ficticios. Cualquier publicación o integración requiere la
            aprobación de Dirección.
          </p>
        </div>

        <p className="mt-6 border-t border-slate-100 pt-5 text-xs leading-relaxed text-slate-500">
          La rama importada de{' '}
          <span className="font-mono text-slate-700">
            tchwd-96/Landing-Express
          </span>{' '}
          solo contenía <span className="font-mono text-slate-700">README.md</span>{' '}
          sin código de aplicación ni archivos de demo. Este entorno web mínimo
          se ha configurado para ejecutar el proyecto en el puerto 3000.
        </p>
      </div>
    </main>
  );
}
