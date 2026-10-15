import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

export type CustomerStatus = 'loading' | 'none' | 'PendingReview' | 'Approved' | 'Rejected';

const pollInterval = 3000;

export function useCustomerStatus(): CustomerStatus {
  const { user, getAccessToken } = useAuth();
  const [status, setStatus] = useState<CustomerStatus>('loading');
  const isCustomer = user?.roles.includes('customer') ?? false;

  useEffect(() => {
    if (!isCustomer) {
      return;
    }
    let timer: number | undefined;
    let stopped = false;

    const check = async () => {
      const response = await fetch('/api/customers/me', {
        headers: { authorization: `Bearer ${await getAccessToken()}` },
      });
      const next: CustomerStatus =
        response.status === 404 ? 'none' : ((await response.json()) as { status: CustomerStatus }).status;
      if (stopped) {
        return;
      }
      setStatus(next);
      if (next !== 'Approved') {
        timer = window.setTimeout(() => void check(), pollInterval);
      }
    };

    void check();
    return () => {
      stopped = true;
      window.clearTimeout(timer);
    };
  }, [getAccessToken, isCustomer]);

  return status;
}
