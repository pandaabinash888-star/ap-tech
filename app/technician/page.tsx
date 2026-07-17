'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TechnicianIndex() {
  const router = useRouter();

  useEffect(() => {
    const technicianUser = localStorage.getItem('technicianUser');
    if (technicianUser) {
      router.push('/technician/dashboard');
    } else {
      router.push('/technician/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting...</p>
    </div>
  );
}
