
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, BriefcaseBusiness } from 'lucide-react'; // Using BriefcaseBusiness as a placeholder logo icon
import { cn } from '@/lib/utils';

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

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-card shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <BriefcaseBusiness className="h-8 w-8" />
            <span>FinAI Advisor</span>
          </Link>

          <nav className="hidden space-x-4 md:flex lg:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-card p-6">
                <nav className="flex flex-col space-y-6">
                  <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary mb-4" onClick={closeMobileMenu}>
                     <BriefcaseBusiness className="h-8 w-8" />
                     <span>FinAI Advisor</span>
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
