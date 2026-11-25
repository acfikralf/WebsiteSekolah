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
import Polling from '@/Components/Home/Polling';
import Kontak from '@/Components/Home/Kontak';
import { Head } from '@inertiajs/react';
import Mading from '@/Components/Home/Mading';

export default function Home({kepalaSekolah, profil, madings}) {
    return (
        <MainLayout>
            <Head title="Home" />
            <Hero />
            <Stats />
            <Sambutan kepalaSekolah={kepalaSekolah} />
            <VisiMisi profil={profil} />
            <Program />
            <Berita />
            <Agenda />
            <Prestasi />
            <Guru />
            <Mading madings={madings} />
            <Polling />
            <Kontak />
        </MainLayout>
    );
}