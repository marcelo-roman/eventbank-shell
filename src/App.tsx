import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router';
import { remoteApp } from './RemoteApp';

const AccountsApp = remoteApp('accounts', 'Accounts');
const TransfersApp = remoteApp('transfers', 'Transfers');
const OperationsApp = remoteApp('operations', 'Projections');

export function App() {
  return (
    <BrowserRouter>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="topbar">
        <NavLink to="/" className="wordmark">
          EventBank
        </NavLink>
        <nav aria-label="Main">
          <NavLink to="/accounts">Accounts</NavLink>
          <NavLink to="/transfers">Transfers</NavLink>
          <NavLink to="/projections">Projections</NavLink>
        </nav>
        <a className="source" href="https://github.com/marcelo-roman/eventbank-platform">
          Source
        </a>
      </header>
      <main id="main">
        <Routes>
          <Route path="/" element={<Navigate to="/accounts" replace />} />
          <Route path="/accounts/*" element={<AccountsApp />} />
          <Route path="/transfers/*" element={<TransfersApp />} />
          <Route path="/projections/*" element={<OperationsApp />} />
          <Route path="*" element={<Navigate to="/accounts" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
