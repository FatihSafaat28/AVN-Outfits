'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartDrawer from "../cart/CartDrawer";

const ConditionalLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="grow pt-16">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default ConditionalLayout;
