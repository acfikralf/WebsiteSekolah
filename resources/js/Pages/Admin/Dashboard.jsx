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
import SectionGuru from "@/Components/Admin/SectionGuru";
import SectionGaleri from "@/Components/Admin/SectionGaleri";
import SectionPolling from "@/Components/Admin/SectionPolling";
import SectionDashboard from "@/Components/Admin/SectionDashboard";

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

export default function Dashboard({
    settings,
    ekstrakurikulers,
    beritas,
    agendas,
    prestasis,
    gurus,
    galeris,
    polling,
    stats,
    recentAgenda,
    recentBerita,
    recentPrestasi,
}) {
    const [activeSection, setActiveSection] = useState("dashboard");
    console.log(polling);
    return (
        <AdminLayout
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            title={sectionTitles[activeSection]}
        >
            {/* Section akan ditambahkan di step berikutnya */}
            {activeSection === "dashboard" && (
                <SectionDashboard
                    stats={stats}
                    recentBerita={recentBerita}
                    recentAgenda={recentAgenda}
                    recentPrestasi={recentPrestasi}
                    polling={polling}
                />
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
            {activeSection === "agenda" && <SectionAgenda agendas={agendas} />}
            {activeSection === "prestasi" && (
                <SectionPrestasi prestasis={prestasis} />
            )}
            {activeSection === "guru" && <SectionGuru gurus={gurus} />}
            {activeSection === "galeri" && <SectionGaleri galeris={galeris} />}
            {activeSection === "polling" && (
                <SectionPolling polling={polling} />
            )}
        </AdminLayout>
    );
}
