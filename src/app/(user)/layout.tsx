export const revalidate = 0;

import ProfilePreviewWrapper from "./components/ProfilePreviewWrapper";
import Header from "./components/Header";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-background">
      <header className="p-6">
        <Header />
      </header>

      <main className="grid justify-between items-start grid-cols-3 gap-2 px-6 pt-0 pb-6">
        <div className="bg-primary col-span-1 rounded-xl p-6 hidden md:flex justify-center items-start sticky top-4">
          <div className="phone flex justify-start items-start">
            <div className="w-full mt-[50px] mx-5 mb-5 flex justify-center items-start">
              <ProfilePreviewWrapper />
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}

export default RootLayout;
