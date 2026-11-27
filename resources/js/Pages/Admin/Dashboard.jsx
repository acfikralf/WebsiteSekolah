
import { useState, useEffect } from "react";
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
import SectionPolling from "@/Components/Admin/SectionPolling";
import SectionDashboard from "@/Components/Admin/SectionDashboard";
import SectionProfil from "@/Components/Admin/SectionProfil";
import SectionMading from "@/Components/Admin/SectionMading";

const sectionTitles = {
    dashboard: "Dashboard",
    berita: "Data Berita",
    agenda: "Data Agenda",
    prestasi: "Data Prestasi",
    ekstrakurikuler: "Ekstrakurikuler",
    polling: "Polling",
    guru: "Data Guru",
    statistik: "Statistik Sekolah",
    profil: "Profil Sekolah",
    pengaturan: "Pengaturan Website",
    akun: "Akun Admin",
    mading: "Moderasi Mading",
};

export default function Dashboard({
    settings,
    ekstrakurikulers,
    beritas,
    agendas,
    prestasis,
    gurus,
    polling,
    stats,
    recentAgenda,
    recentBerita,
    recentPrestasi,
    invitations,
    users,
    profil,
    madings,
}) {
    const { url } = usePage();

    // Ambil parameter section dari URL
    const searchParams = new URLSearchParams(url.split("?")[1] || "");
    const sectionParam = searchParams.get("section");

    const [activeSection, setActiveSection] = useState(
        sectionParam || "dashboard"
    );

    // Sinkronisasi section dengan URL
    useEffect(() => {
        if (sectionParam) {
            setActiveSection(sectionParam);
        }
    }, [sectionParam]);

    // LISTENER AKSI CEPAT
    useEffect(() => {
        const handleNavigate = (event) => {
            const section = event.detail;

            // Pastikan section tersedia
            if (sectionTitles[section]) {
                setActiveSection(section);
            }
        };

        window.addEventListener("navigate-section", handleNavigate);

        return () => {
            window.removeEventListener("navigate-section", handleNavigate);
        };
    }, []);

    return (
        <AdminLayout
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            title={sectionTitles[activeSection] || "Dashboard"}
        >
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

            {activeSection === "statistik" && (
                <SectionStatistik settings={settings} />
            )}

            {activeSection === "ekstrakurikuler" && (
                <SectionEkstrakurikuler
                    ekstrakurikulers={ekstrakurikulers}
                />
            )}

            {activeSection === "berita" && (
                <SectionBerita beritas={beritas} />
            )}

            {activeSection === "agenda" && (
                <SectionAgenda agendas={agendas} />
            )}

            {activeSection === "prestasi" && (
                <SectionPrestasi prestasis={prestasis} />
            )}

            {activeSection === "guru" && (
                <SectionGuru gurus={gurus} />
            )}

            {activeSection === "mading" && (
                <SectionMading madings={madings} />
            )}

            {activeSection === "polling" && (
                <SectionPolling polling={polling} />
            )}

            {activeSection === "akun" && (
                <SectionAkun
                    invitations={invitations}
                    users={users}
                />
            )}

            {activeSection === "profil" && (
                <SectionProfil profil={profil} />
            )}
        </AdminLayout>
    );
}
