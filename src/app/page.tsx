import Link from "next/link";

import QRGenerator from "~/components/QRGenerator";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <QRGenerator />
      </main>
      <footer className="row-start-3 whitespace-nowrap text-sm/6 text-center sm:text-left">
        qrthing by <Link href="https://vvel0x.net">vvel0x</Link>
      </footer>
    </div>
  );
}
