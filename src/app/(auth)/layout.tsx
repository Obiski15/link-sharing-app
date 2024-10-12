import Header from "./components/Header";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen min-w-[100%] bg-background">
      <div className="flex items-center justify-between gap-[51px] md:min-w-[476px] flex-col">
        <Header />
        {children}
      </div>
    </section>
  );
}

export default RootLayout;
