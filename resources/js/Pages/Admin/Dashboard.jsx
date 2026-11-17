import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react"; // Wajib import usePage
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
import SectionProfil from "@/Components/Admin/SectionProfil";

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
    settings, ekstrakurikulers, beritas, agendas, prestasis, gurus, galeris, polling, stats, recentAgenda, recentBerita, recentPrestasi, invitations, users,
}) {
    const { url } = usePage();
    
    // Ambil parameter section dari URL (contoh: /dashboard?section=berita)
    const searchParams = new URLSearchParams(url.split('?')[1]);
    const sectionParam = searchParams.get('section');

    // Set state awal menggunakan parameter URL, atau 'dashboard' jika kosong
    const [activeSection, setActiveSection] = useState(sectionParam || "dashboard");

    // Memastikan tab berubah jika URL berubah tanpa reload (opsional)
    useEffect(() => {
        if (sectionParam && sectionParam !== activeSection) {
            setActiveSection(sectionParam);
        }
    }, [sectionParam]);

    return (
        <AdminLayout
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            title={sectionTitles[activeSection]}
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
            {activeSection === "pengaturan" && <SectionPengaturan settings={settings} />}
            {activeSection === "statistik" && <SectionStatistik settings={settings} />}
            {activeSection === "ekstrakurikuler" && <SectionEkstrakurikuler ekstrakurikulers={ekstrakurikulers} />}
            {activeSection === "berita" && <SectionBerita beritas={beritas} />}
            {activeSection === "agenda" && <SectionAgenda agendas={agendas} />}
            {activeSection === "prestasi" && <SectionPrestasi prestasis={prestasis} />}
            {activeSection === "guru" && <SectionGuru gurus={gurus} />}
            {activeSection === "galeri" && <SectionGaleri galeris={galeris} />}
            {activeSection === "polling" && <SectionPolling polling={polling} />}
            {activeSection === 'akun' && <SectionAkun invitations={invitations} users={users} />}
            {activeSection === 'profil' && <SectionProfil profil={settings} />}
        </AdminLayout>
    );
}