import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { AuthProvider } from './auth/AuthProvider';
import { Callback } from './pages/Callback';
import { Home } from './pages/Home';
import { Protected } from './Protected';
import { remoteApp } from './RemoteApp';
import { TopBar } from './TopBar';

const OnboardingApp = remoteApp('onboarding', 'Your application');
const AccountsApp = remoteApp('accounts', 'Accounts');
const PixApp = remoteApp('transfers', 'PIX');
const CardsApp = remoteApp('cards', 'Cards');
const BackofficeApp = remoteApp('backoffice', 'Back office');
const OperationsApp = remoteApp('operations', 'Projections');

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <a className="skip" href="#main">
          Skip to content
        </a>
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
    </BrowserRouter>
  );
}
