"use client";

import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";
import { ZisChart } from "@/components/ZisChart";
import { getZisStats } from "@/actions/chartData";

export default function Home() {
  const [showChart, setShowChart] = useState<string | null>(null);
  const [chartData, setChartData] = useState<{ p: any[], d: any[] }>({ p: [], d: [] });

  useEffect(() => {
    // Fetch initial data
    getZisStats().then(res => {
      setChartData({ p: res.pemasukan, d: res.pendistribusian });
    });
  }, []);

  const handleMenuClick = (menuName: string) => {
    if (menuName.includes('Grafik')) {
      setShowChart(menuName);
    } else {
      alert(`Menu ${menuName} dipilih (Fitur dalam pengembangan)`);
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-5 bg-white font-roboto">
      {/* Modal / Overlay Grafik */}
      {showChart && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-4xl relative">
            <button
              onClick={() => setShowChart(null)}
              className="absolute top-4 right-4 text-black font-bold text-xl hover:text-red-500"
            >
              X
            </button>
            <h3 className="text-center font-bold text-xl mb-4 font-orbitron uppercase">{showChart}</h3>
            <div className="h-[400px] w-full flex items-center justify-center">
              {/* Tampilkan Grafik Sesuai Pilihan */}
              <ZisChart
                type={showChart.includes('Pendistribusian') ? 'line' : 'bar'}
                data={{
                  pemasukan: showChart.includes('Perolehan') ? chartData.p : [],
                  pendistribusian: showChart.includes('Pendistribusian') ? chartData.d : []
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* --- Header Section --- */}
      <header className="flex flex-col items-center mt-5 mb-2.5 text-center">
        {/* Menggunakan Logo Garuda Pancasila placeholder jika file lokal belum ada */}
        <div className="relative w-48 h-32 mb-4 drop-shadow-sm">
          <img
            src="/logo-baznas.png"
            alt="Garuda Pancasila"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="text-[#1a4d33] leading-tight">
          <h1 className="text-3xl font-black tracking-wide mb-0.5">BAZNAS</h1>
          <h3 className="text-sm font-medium text-black mb-0.5">Badan Amil Zakat Nasional</h3>
          <h2 className="text-lg font-extrabold text-[#1a4d33] uppercase">KABUPATEN BANJARNEGARA</h2>
        </div>
      </header>

      {/* --- Judul Aplikasi (SIMBARA) --- */}
      <div className="my-8 text-center sm:my-12">
        <h1 className="font-orbitron text-5xl sm:text-6xl text-[#1e5238] tracking-[0.2em] font-extrabold drop-shadow-md">
          SIMBARA
        </h1>
      </div>

      {/* --- Container Kartu (Menu Utama) --- */}
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl mb-16">

        <MenuCard
          title="GRAFIK INFORMASI PEROLEHAN ZIS"
          onClick={() => handleMenuClick("Grafik Perolehan")}
        />

        <MenuCard
          title="GRAFIK INFORMASI PENDISTRIBUSIAN ZIS"
          onClick={() => handleMenuClick("Grafik Pendistribusian")}
        />

        <MenuCard
          title="INFORMASI TENTANG BAZNAS KAB BANJARNEGARA"
          onClick={() => handleMenuClick("Informasi Baznas")}
        />

      </div>

      {/* --- Bagian Bawah (Tombol Cek) --- */}
      <div className="relative flex justify-center items-center mb-10">
        <Link href="/login">
          <button
            className="bg-[#1e4d3b] text-white font-orbitron text-2xl sm:text-3xl py-4 px-12 rounded-full border-none cursor-pointer tracking-wider font-bold shadow-lg transition-all duration-300 hover:bg-[#163a2c] hover:scale-105 active:scale-95 z-10"
          >
            CEK PROPOSAL
          </button>
        </Link>


      </div>
    </main>
  );
}

function MenuCard({ title, onClick }: { title: string, onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-[#1e4d3b] w-72 h-44 rounded-2xl flex items-center justify-center p-6 shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden group hover:-translate-y-2 hover:bg-[#265e49] hover:shadow-2xl"
    >
      {/* Shine Effect */}
      <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-500 group-hover:left-full"></div>

      <h3 className="text-white text-center text-base font-bold uppercase font-roboto leading-snug z-10">
        {title}
      </h3>
    </div>
  );
}
