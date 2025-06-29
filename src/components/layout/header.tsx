"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const navLinks = [
	{ href: '#producto', label: 'Producto' },
	{ href: '#soluciones', label: 'Soluciones' },
	{ href: '#casos-exito', label: 'Casos de Éxito' },
	{ href: '#nosotros', label: 'Nosotros' },
	{ href: '#recursos', label: 'Recursos' },
	{ href: '#contacto', label: 'Contacto' },
];

export function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener('scroll', handleScroll);
		// Call handleScroll once on mount to set initial state
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const closeMobileMenu = () => setIsMobileMenuOpen(false);
	return (		<header
			className={cn(
				'fixed top-0 z-50 w-full pointer-events-none' // Cambiado a fixed y pointer-events-none
			)}
		>
			<div // Este div ahora es la barra visual flotante
				className={cn(
					'max-w-[1480px] mx-auto mt-4 rounded-[10px] pointer-events-auto', // Reducido margen y habilitado pointer-events
					'bg-[hsla(0,0%,67%,0.1)] backdrop-blur-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.1)] opacity-90', // Estilos visuales
					'px-4 sm:px-6 lg:px-8', // Padding
					'transition-all duration-300', // Transición
					isScrolled ? 'border-b border-border/20' : '' // Estilo condicional
				)}
			>
				<div className="flex h-[70px] items-center justify-between">					<Link
						href="/"
						className="flex items-center gap-2 text-2xl font-bold text-white"
					>
						<Image
							src="/icon.png"
							alt="Horizont"
							width={48}
							height={48}
							className="h-12 w-12"
						/>
						<span>Horizont</span>
					</Link>

					{/* Botones a la derecha */}
					<div className="flex items-center space-x-2 sm:space-x-4">
						{/* Botón de búsqueda */}
						<Button
							variant="ghost"
							size="icon"
							className="bg-[#1e2124] text-white border border-white hover:bg-[#2c2f33] hover:text-white"
						>
							<Search className="h-5 w-5" />
							<span className="sr-only">Buscar</span>
						</Button>

						{/* Botón Get Started */}
						<Button
							variant="outline"
							className="hidden sm:flex bg-[#1e2124] text-white border border-white hover:bg-[#2c2f33] hover:text-white"
						>
							Get Started
						</Button>

						{/* Menú desplegable con todas las opciones */}
						<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
							<SheetTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="bg-[#1e2124] text-white border border-white hover:bg-[#2c2f33] hover:text-white"
								>
									<Menu className="h-6 w-6" />
									<span className="sr-only">Abrir menú</span>
								</Button>
							</SheetTrigger>
							<SheetContent side="right" className="w-[300px] bg-card p-6">
								<nav className="flex flex-col space-y-6">
									<Link
										href="/"
										className="flex items-center gap-2 text-2xl font-bold text-primary mb-4"
										onClick={closeMobileMenu}
									>
										<Image
											src="/icon.png"
											alt="Horizont"
											width={32}
											height={32}
											className="h-8 w-8"
										/>
										<span>Horizont</span>
									</Link>
									{navLinks.map((link) => (
										<Link
											key={link.label}
											href={link.href}
											className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
											onClick={closeMobileMenu}
										>
											{link.label}
										</Link>
									))}
								</nav>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</header>
	);
}
