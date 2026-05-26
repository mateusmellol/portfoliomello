import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-20 border-b border-white/10 bg-[#0c0a09]/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-6 md:px-12 lg:px-[120px]">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <Image
            src="/mateusheader.png"
            alt="Mateus Mello"
            width={40}
            height={40}
            className="rounded-[20px]"
          />
          <div className="flex flex-col gap-1">
            <span className="font-display text-sm font-medium leading-normal tracking-[-0.02em] text-white">
              Mateus Mello
            </span>
            <div className="flex items-center gap-1">
              <span className="block h-[5px] w-[5px] rounded-full bg-green-500" />
              <span className="font-display text-[14px] leading-normal tracking-[-0.02em] text-white/70">
                Procurando oportunidades
              </span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="hidden items-center gap-4 font-display text-base tracking-[-0.02em] text-white md:flex">
          <a href="#home" className="transition-opacity hover:opacity-70">
            Home
          </a>
          <a href="#projetos" className="transition-opacity hover:opacity-70">
            Projetos
          </a>
          <a href="#sobre" className="transition-opacity hover:opacity-70">
            Sobre
          </a>
        </nav>

        {/* CTAs */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href="#"
            className="rounded-lg border border-white px-4 py-2 font-display text-base font-medium tracking-[-0.02em] text-white transition-opacity hover:opacity-80"
          >
            Currículo
          </a>
          <a
            href="#contato"
            className="rounded-lg bg-white px-4 py-2 font-display text-base font-medium tracking-[-0.02em] text-[#191919] transition-opacity hover:opacity-90"
          >
            Contato
          </a>
        </div>
      </div>
    </header>
  );
}
