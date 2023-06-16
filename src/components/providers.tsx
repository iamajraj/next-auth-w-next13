'use client';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import React from 'react';

type Props = {
  session: Session;
  children: React.ReactNode;
};

const client = new QueryClient();

function Providers({ session, children }: Props) {
  return (
    <QueryClientProvider client={client}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </QueryClientProvider>
  );
}

export default Providers;
