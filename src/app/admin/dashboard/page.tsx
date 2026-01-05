export default function AdminDashboardPage() {
    return (
        <div className="text-center">
            <div className="relative w-60 h-60 mx-auto mb-5">
                <img
                    src="/logo-baznas.png"
                    alt="Garuda Pancasila"
                    className="w-full h-full object-contain drop-shadow-sm"
                />
            </div>

            <h1 className="text-[#1b5e20] font-serif text-5xl font-black m-0 leading-none">
                BAZNAS
            </h1>
            <p className="font-serif text-xl text-[#222] my-1.5 font-medium">
                Badan Amil Zakat Nasional
            </p>
            <h2 className="font-roboto text-[#1b5e20] text-2xl font-extrabold uppercase tracking-wide">
                KABUPATEN BANJARNEGARA
            </h2>
        </div>
    );
}
