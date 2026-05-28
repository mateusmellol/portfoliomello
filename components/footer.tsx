'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';

interface FooterLink {
	title: string;
	href?: string;
	onClick?: () => void;
}

interface FooterLinkGroup {
	label: string;
	links: FooterLink[];
}

type StickyFooterProps = React.ComponentProps<'footer'>;

const FOOTER_HEIGHT = 360;
const EMAIL_ADDRESS = 'mateusmellolucas@gmail.com';

export function StickyFooter({ className, ...props }: StickyFooterProps) {
	const [copied, setCopied] = React.useState(false);

	const handleCopyEmail = React.useCallback(async () => {
		try {
			await navigator.clipboard.writeText(EMAIL_ADDRESS);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1800);
		} catch {
			window.prompt('Copie o email:', EMAIL_ADDRESS);
		}
	}, []);

	const footerLinkGroups: FooterLinkGroup[] = [
		{
			label: 'Navegação',
			links: [
				{ title: 'Case Studies', href: '#projetos' },
				{ title: 'Sobre mim', href: '#sobre' },
			],
		},
		{
			label: 'Contato',
			links: [
				{ title: copied ? 'Email copiado' : 'Copiar email', onClick: handleCopyEmail },
				{
					title: 'LinkedIn',
					href: 'https://www.linkedin.com/in/omateusmello/',
				},
			],
		},
	];

	return (
		<footer
			className={cn('relative w-full', className)}
			style={{
				height: FOOTER_HEIGHT,
				clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)',
			}}
			{...props}
		>
			<div className="fixed bottom-0 w-full" style={{ height: FOOTER_HEIGHT }}>
				<div
					className="sticky h-full overflow-y-auto"
					style={{ top: `calc(100vh - ${FOOTER_HEIGHT}px)` }}
				>
					<div className="site-shell relative flex size-full flex-col justify-between gap-8 border-t border-white/[0.19] py-6">
						<div
							aria-hidden
							className="absolute inset-0 isolate z-0 contain-strict"
						>
							<div className="absolute top-0 left-0 h-[80rem] w-[35rem] -translate-y-[87.5%] -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(255,255,255,0.06)_0,rgba(140,140,140,0.02)_50%,rgba(255,255,255,0.01)_80%)]" />
							<div className="absolute top-0 left-0 h-[80rem] w-[15rem] [translate:5%_-50%] -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.04)_0,rgba(255,255,255,0.01)_80%,transparent_100%)]" />
							<div className="absolute top-0 left-0 h-[80rem] w-[15rem] -translate-y-[87.5%] -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.04)_0,rgba(255,255,255,0.01)_80%,transparent_100%)]" />
						</div>
						<div className="relative z-10 grid gap-10 pt-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:pt-2">
							<AnimatedContainer className="space-y-5">
								<div className="space-y-2">
									<FooterWordmark />
									<p className="text-sm text-white/35">
										&copy; 2026 Mateus Mello. Todos os direitos reservados.
									</p>
								</div>
							</AnimatedContainer>
							<div className="grid gap-8 text-left sm:grid-cols-2 md:justify-self-end md:gap-14">
								{footerLinkGroups.map((group, index) => (
									<AnimatedContainer
										key={group.label}
										delay={0.1 + index * 0.1}
										className="w-full"
									>
										<div>
											<h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">
												{group.label}
											</h3>
											<ul className="mt-4 space-y-2 text-sm text-white/60">
												{group.links.map((link) => (
													<li key={link.title}>
														{link.href ? (
															<a
																href={link.href}
																target={link.href.startsWith('http') ? '_blank' : undefined}
																rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
																className="inline-flex items-center transition-all duration-300 hover:text-white"
															>
																{link.title}
															</a>
														) : (
															<button
																type="button"
																onClick={link.onClick}
																className="inline-flex cursor-pointer items-center text-left transition-all duration-300 hover:text-white"
															>
																{link.title}
															</button>
														)}
													</li>
												))}
											</ul>
										</div>
									</AnimatedContainer>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
	children?: React.ReactNode;
	delay?: number;
};

function FooterWordmark() {
	return (
		<div className="flex items-center gap-2 text-[#dbdbdb]">
			<svg
				aria-hidden="true"
				viewBox="0 0 32 32.9717"
				className="h-8 w-[31px] shrink-0"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M32 8.16797H25.3496L25.3457 19.4004L19.8594 24.7422H8.45312L25.3486 8.16797H8.4541V24.7285L0 32.9717V8.24316L1.46387 6.81543L8.10938 0H24.0361L32 8.16797Z"
					fill="currentColor"
				/>
			</svg>
			<span className="font-wordmark text-[20px] font-normal leading-none tracking-[-0.02em] text-inherit">
				Mateus Mello
			</span>
		</div>
	);
}

function AnimatedContainer({
	delay = 0.1,
	children,
	...props
}: AnimatedContainerProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <>{children}</>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			{...props}
		>
			{children}
		</motion.div>
	);
}
