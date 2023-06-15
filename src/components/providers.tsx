'use client';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

type Props = {
  session: Session;
  children: React.ReactNode;
};

function Providers({ session, children }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default Providers;
