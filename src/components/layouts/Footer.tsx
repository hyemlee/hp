import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import mycoDxLogo from '../../assets/logo/mycodx-wordmark.png';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <Link to="/" className="footer-logo" aria-label="MycoDx home">
              <img src={mycoDxLogo} alt="MycoDx" />
            </Link>
            <p className="footer-slogan">
              <strong>{t('slogan.main')}</strong>
              <span>{t('slogan.sub')}</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              {t('menu.ABOUT')}
            </h3>            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/research/introduction" className="text-sm text-gray-500 hover:text-blue-900 transition-colors">
                  Company
                </Link>
              </li>
              <li>
                <Link to="/members" className="text-sm text-gray-500 hover:text-blue-900 transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-sm text-gray-500 hover:text-blue-900 transition-colors">
                  News
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-500">
              <li>{t('footer.address')}</li>
              <li>{t('footer.email')}</li>
              <li>{t('footer.phone')}</li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Copyright */}
        <div className="mt-12 md:mt-16 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-400 text-center">
            {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
