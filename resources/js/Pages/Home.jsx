import MainLayout from '@/Layouts/MainLayout';
import Hero from '@/Components/Home/Hero';
import Stats from '@/Components/Home/Stats';
import Sambutan from '@/Components/Home/Sambutan';
import VisiMisi from '@/Components/Home/VisiMisi';
import Program from '@/Components/Home/Program';
import Berita from '@/Components/Home/Berita';
import Agenda from '@/Components/Home/Agenda';
import Prestasi from '@/Components/Home/Prestasi';
import Guru from '@/Components/Home/Guru';
import Galeri from '@/Components/Home/Galeri';
import Polling from '@/Components/Home/Polling';
import PpdbCta from '@/Components/Home/PpdbCta';
import Kontak from '@/Components/Home/Kontak';
import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <MainLayout>
            <Head title="Home" />
            <Hero />
            <Stats />
            <Sambutan />
            <VisiMisi />
            <Program />
            <Berita />
            <Agenda />
            <Prestasi />
            <Guru />
            <Galeri />
            <Polling />
            <Kontak />
        </MainLayout>
    );
}