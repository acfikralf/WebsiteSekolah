import { useState, useRef, useEffect } from 'react';
import useReveal from '@/hooks/useReveal';
import { usePage } from '@inertiajs/react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

export default function Guru() {
    const titleRef = useReveal();
    const { gurus = [] } = usePage().props;
    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setItemsPerPage(4); // Desktop
            } else if (window.innerWidth >= 640) {
                setItemsPerPage(2); // Tablet
            } else {
                setItemsPerPage(3); // HP
            }
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalPages = gurus.length > 0 
        ? Math.ceil(gurus.length / itemsPerPage) 
        : 0;

    // Fungsi untuk geser kiri/kanan (dipakai oleh tombol panah)
    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const cardWidth = current.firstChild.offsetWidth + 16;
            const scrollAmount = cardWidth * itemsPerPage;

            if (direction === 'right') {
                const nextScrollLeft = current.scrollLeft + scrollAmount;
                // Jika melebihi batas maksimal scroll, paksa mentok ke ujung kanan
                if (nextScrollLeft >= current.scrollWidth - current.clientWidth - 5) {
                    current.scrollTo({
                        left: current.scrollWidth,
                        behavior: 'smooth',
                    });
                    return;
                }
            } else {
                // Jika tombol kiri ditekan, hitung mundur dari halaman aktif saat ini
                // agar posisinya selalu presisi di awal halaman
                const targetScroll = (activeIndex - 1) * itemsPerPage * cardWidth;
                
                // Pastikan tidak mundur melewati batas kiri
                current.scrollTo({
                    left: Math.max(0, targetScroll),
                    behavior: 'smooth',
                });
                return;
            }

            // Geser normal untuk tombol kanan
            current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    // Update indikator saat di-scroll manual
    const handleScroll = () => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const cardWidth = current.firstChild.offsetWidth + 16;
            const index = Math.round(current.scrollLeft / cardWidth);
            
            // Jika sudah mentok kanan, paksa aktif ke halaman terakhir
            if (current.scrollLeft + current.clientWidth >= current.scrollWidth - 10) {
                setActiveIndex(totalPages - 1);
            } else {
                const currentPage = Math.floor(index / itemsPerPage);
                if (currentPage < totalPages) {
                    setActiveIndex(currentPage);
                }
            }
        }
    };

    // Fungsi saat titik indikator diklik
    const scrollToPage = (pageIndex) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            
            if (pageIndex === totalPages - 1) {
                current.scrollTo({
                    left: current.scrollWidth,
                    behavior: 'smooth',
                });
            } else {
                const cardWidth = current.firstChild.offsetWidth + 16;
                const targetScroll = pageIndex * itemsPerPage * cardWidth;
                current.scrollTo({
                    left: targetScroll,
                    behavior: 'smooth',
                });
            }
        }
    };

    return (
        <section
            id="guru"
            className="py-12 sm:py-16 md:py-20 bg-slate-50 dark:bg-slate-950 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center mb-8 sm:mb-12" ref={titleRef}>
                    <h2 className="text-xl sm:text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
                        Guru Kami
                    </h2>
                    <div className="w-12 sm:w-24 h-1 bg-accent-500 mx-auto mt-2 sm:mt-4 rounded-full"></div>
                    <p className="mt-2 sm:mt-4 text-[10px] sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Pendidik profesional dan berdedikasi
                    </p>
                </div>

                {/* Carousel Wrapper */}
                <div className="relative">
                    
                    {/* Tombol Kiri Desktop */}
                    <button 
                        onClick={() => scroll('left')}
                        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-primary-600 hover:bg-primary-700 dark:bg-accent-500 dark:hover:bg-accent-600 text-white rounded-xl items-center justify-center shadow-lg transition-transform hover:scale-105"
                    >
                        <CaretLeft size={24} weight="bold" />
                    </button>

                    {/* Container Scroll */}
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {gurus.length === 0 && (
                            <p className="w-full text-center text-xs sm:text-base text-slate-500 py-10">
                                Belum ada data guru.
                            </p>
                        )}

                        {gurus.map((t) => (
                            <GuruCard key={t.id} t={t} />
                        ))}
                    </div>

                    {/* Tombol Kanan Desktop */}
                    <button 
                        onClick={() => scroll('right')}
                        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-primary-600 hover:bg-primary-700 dark:bg-accent-500 dark:hover:bg-accent-600 text-white rounded-xl items-center justify-center shadow-lg transition-transform hover:scale-105"
                    >
                        <CaretRight size={24} weight="bold" />
                    </button>
                </div>

                {/* Kontrol Navigasi */}
                <div className="flex items-center justify-center gap-4 mt-4 sm:mt-8">
                    
                    {/* Tombol Kiri (Hanya HP) */}
                    <button 
                        onClick={() => scroll('left')}
                        className="flex sm:hidden w-8 h-8 bg-primary-600 text-white rounded-full items-center justify-center shadow-md active:scale-95 transition-transform"
                    >
                        <CaretLeft size={16} weight="bold" />
                    </button>

                    {/* Indikator Titik */}
                    <div className="flex justify-center items-center gap-2">
                        {gurus.length > 0 && Array.from({ length: totalPages }).map((_, i) => (
                            <button 
                                key={i} 
                                onClick={() => scrollToPage(i)}
                                className={`rounded-full transition-all duration-300 focus:outline-none ${
                                    activeIndex === i 
                                        ? 'w-6 h-2 bg-primary-600 dark:bg-accent-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]'
                                        : 'w-2 h-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-500'
                                }`}
                                aria-label={`Ke halaman ${i + 1}`}
                            />
                        ))}
                    </div>

                    {/* Tombol Kanan (Hanya HP) */}
                    <button 
                        onClick={() => scroll('right')}
                        className="flex sm:hidden w-8 h-8 bg-primary-600 text-white rounded-full items-center justify-center shadow-md active:scale-95 transition-transform"
                    >
                        <CaretRight size={16} weight="bold" />
                    </button>
                </div>

            </div>
        </section>
    );
}

function GuruCard({ t }) {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="w-[calc(33.333%-11px)] sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] shrink-0 snap-start group bg-primary-600 dark:bg-slate-900 rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col relative pb-2">
            
            <div className="aspect-[4/5] overflow-hidden relative bg-primary-500 dark:bg-slate-800 rounded-t-2xl">
                {t.foto_url && !imageError ? (
                    <img
                        src={t.foto_url}
                        alt={t.nama}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/50">
                        <i className="ph ph-user text-3xl sm:text-6xl"></i>
                    </div>
                )}
            </div>

            <div className="bg-white dark:bg-slate-800 p-1.5 sm:p-3 rounded-lg sm:rounded-xl mx-1.5 sm:mx-2 -mt-6 sm:-mt-8 relative z-10 shadow-sm border border-slate-100 dark:border-slate-700 text-left">
                <h3 className="font-display font-bold text-[9px] sm:text-xs text-slate-900 dark:text-white leading-tight line-clamp-2">
                    {t.nama}
                </h3>

                {t.jabatan && (
                    <p className="text-[7px] sm:text-[10px] uppercase font-semibold text-primary-600 dark:text-accent-400 mt-1 line-clamp-1">
                        {t.jabatan}
                    </p>
                )}
            </div>

        </div>
    );
}