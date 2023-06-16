'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const session = useSession();

  console.log(session);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session.status === 'authenticated' ? (
        <>
          <div className="flex flex-col gap-5 mb-10">
            <Link href="/editor" className="underline">
              &gt; Editor Page
            </Link>
            <Link href="/blog" className="underline">
              &gt; Blog Page
            </Link>
          </div>
          <button
            className="self-start border px-7 py-2 rounded-lg cursor-pointer"
            onClick={() => signOut()}
          >
            {' '}
            Sign out
          </button>
        </>
      ) : (
        <button
          className="self-start border px-7 py-2 rounded-lg cursor-pointer"
          onClick={() => signIn()}
        >
          {' '}
          Sign in
        </button>
      )}
    </main>
  );
}
