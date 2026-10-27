import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { AuthProvider } from './auth/AuthProvider';
import { LocaleProvider } from './i18n/LocaleProvider';
import { useLocale } from './i18n/LocaleContext';
import { Callback } from './pages/Callback';
import { Home } from './pages/Home';
import { Protected } from './Protected';
import { remoteApp } from './RemoteApp';
import { TopBar } from './TopBar';

const OnboardingApp = remoteApp('onboarding');
const AccountsApp = remoteApp('accounts');
const PixApp = remoteApp('transfers');
const CardsApp = remoteApp('cards');
const BackofficeApp = remoteApp('backoffice');
const OperationsApp = remoteApp('operations');

function SkipLink() {
  const { t } = useLocale();
  return (
    <a className="skip" href="#main">
      {t.skipToContent}
    </a>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <LocaleProvider>
        <AuthProvider>
          <SkipLink />
          <TopBar />
          <main id="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/callback" element={<Callback />} />
              <Route path="/onboarding/*" element={<Protected roles={['customer']} app={OnboardingApp} />} />
              <Route path="/accounts/*" element={<Protected roles={['customer', 'operator']} app={AccountsApp} />} />
              <Route path="/pix/*" element={<Protected roles={['customer']} app={PixApp} />} />
              <Route path="/cards/*" element={<Protected roles={['customer']} app={CardsApp} />} />
              <Route path="/backoffice/*" element={<Protected roles={['operator']} app={BackofficeApp} />} />
              <Route path="/projections/*" element={<Protected roles={['operator']} app={OperationsApp} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </AuthProvider>
      </LocaleProvider>
    </BrowserRouter>
  );
}
