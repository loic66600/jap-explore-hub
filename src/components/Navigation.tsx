
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = element.offsetTop - 100; // Ajustement pour la navbar fixe
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { name: 'Villes', href: '/cities' },
    { name: 'Vol', href: '/booking' },
    { name: 'Hébergement', href: '/accommodation' },
    { name: 'Contact', href: '#contact' },
  ];

  const renderNavLink = (item: { name: string; href: string }) => {
    if (item.href.startsWith('#')) {
      return (
        <a
          key={item.name}
          href={item.href}
          onClick={(e) => handleAnchorClick(e, item.href)}
          className="text-secondary hover:text-primary transition-colors"
        >
          {item.name}
        </a>
      );
    }
    return (
      <Link
        key={item.name}
        to={item.href}
        className="text-secondary hover:text-primary transition-colors"
      >
        {item.name}
      </Link>
    );
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            Jap Tourisme
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => renderNavLink(item))}
          </div>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg animate-fade-in">
            <div className="px-4 py-2 space-y-2">
              {navItems.map((item) => (
                <div key={item.name} className="block py-2">
                  {renderNavLink(item)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
