import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Jap Tourisme</h3>
            <p className="text-gray-300">
              Votre partenaire de confiance pour découvrir le Japon authentique.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin size={20} />
                <span>123 Rue du Japon, Paris</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={20} />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={20} />
                <span>contact@japtourisme.fr</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Inscrivez-vous pour recevoir nos dernières offres
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-2 rounded-l-lg text-black"
              />
              <button className="bg-primary px-4 py-2 rounded-r-lg hover:bg-primary/90 transition-colors">
                S'inscrire
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-300">
          <p>&copy; 2024 Jap Tourisme. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;