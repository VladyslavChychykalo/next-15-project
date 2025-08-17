import Navbar from "@/components/navigation/navbar";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col bg-light-100 dark:bg-dark-900">
      <Navbar />
      {children}
    </main>
  );
};

export default RootLayout;
