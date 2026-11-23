import { NavLink } from 'react-router';

export function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <NavLink to="/" className="brand" onClick={onNavigate}>
      <span className="brand-mark" aria-hidden>
        E
      </span>
      <span className="nav-label">EventBank</span>
    </NavLink>
  );
}
