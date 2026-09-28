import { useState } from "react";
import { usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import SectionPengaturan from "@/Components/Admin/SectionPengaturan";
import SectionAkun from "@/Components/Admin/SectionAkun";
import SectionStatistik from "@/Components/Admin/SectionStatistik";
import SectionEkstrakurikuler from "@/Components/Admin/SectionEkstrakurikuler";
import SectionBerita from "@/Components/Admin/SectionBerita";
import SectionAgenda from "@/Components/Admin/SectionAgenda";
import SectionPrestasi from "@/Components/Admin/SectionPrestasi";

const sectionTitles = {
    dashboard: "Dashboard",
    berita: "Data Berita",
    agenda: "Data Agenda",
    prestasi: "Data Prestasi",
    ekstrakurikuler: "Ekstrakurikuler",
    galeri: "Galeri",
    polling: "Polling",
    guru: "Data Guru",
    statistik: "Statistik Sekolah",
    profil: "Profil Sekolah",
    pengaturan: "Pengaturan Website",
    akun: "Akun Admin",
};

export default function Dashboard({ settings, ekstrakurikulers, beritas, agendas, prestasis }) {
    const [activeSection, setActiveSection] = useState("dashboard");
    console.log(usePage());
    console.log(agendas)
    return (
        <AdminLayout
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            title={sectionTitles[activeSection]}
        >
            {/* Section akan ditambahkan di step berikutnya */}
            {activeSection === "dashboard" && (
                <div className="text-sm text-slate-500 dark:text-slate-400">
                    Section Dashboard akan ditambahkan di step berikutnya.
                </div>
            )}

            {activeSection === "pengaturan" && (
                <SectionPengaturan settings={settings} />
            )}
            {activeSection === "akun" && <SectionAkun />}
            {activeSection === "statistik" && (
                <SectionStatistik settings={settings} />
            )}
            {activeSection === "ekstrakurikuler" && (
                <SectionEkstrakurikuler ekstrakurikulers={ekstrakurikulers} />
            )}
            {activeSection === "berita" && <SectionBerita beritas={beritas} />}
            {activeSection === "agenda" && <SectionAgenda agendas={agendas}/>}
            {activeSection === "prestasi" && <SectionPrestasi prestasis={prestasis}/>}
        </AdminLayout>
    );
}
