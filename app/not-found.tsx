import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0c0a09] px-6 text-center text-white">
      <p className="font-display text-sm uppercase tracking-[0.24em] text-white/50">
        404
      </p>
      <h1 className="font-display text-3xl tracking-[-0.02em] text-white md:text-4xl">
        Página não encontrada
      </h1>
      <Link
        href="/"
        className="rounded-lg border border-white/20 px-4 py-2 font-display text-sm tracking-[-0.02em] text-white transition-colors hover:border-white/40"
      >
        Voltar para a home
      </Link>
    </main>
  );
}
