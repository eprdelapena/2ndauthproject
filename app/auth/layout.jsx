export default function RootLayout({ children }) {
  return (
    <>
      <main className="flex items-center justify-center bg-sky-700 h-[100%]">
        {children}
      </main>
    </>
  );
}
