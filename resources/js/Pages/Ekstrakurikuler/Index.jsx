import MainLayout from '@/Layouts/MainLayout';
import { Tent } from '@phosphor-icons/react';

export default function EkstrakurikulerIndex({ ekstrakurikulers = [] }) {
    return (
        <MainLayout>
            <div className="bg-primary-700 dark:bg-primary-900 text-white py-16 relative overflow-hidden islamic-pattern">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">Ekstrakurikuler</h1>
                    <p className="text-lg text-primary-100 max-w-2xl">Wadah pengembangan bakat, minat, dan karakter siswa.</p>
                </div>
            </div>

            <div className="py-16 md:py-20 bg-white dark:bg-slate-900 min-h-[50vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ekstrakurikulers.map((item) => (
                            <div key={item.id} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-primary-100 dark:bg-slate-700 text-primary-600 dark:text-accent-400 rounded-xl flex items-center justify-center mb-4">
                                    <i className={`ph ${item.icon || 'ph-tent'} text-2xl`}></i>
                                </div>
                                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-2">{item.nama}</h3>
                                <p className="text-sm font-medium text-primary-600 dark:text-accent-400 mb-3">Pembina: {item.pembina || '-'}</p>
                                <p className="text-slate-600 dark:text-slate-300 text-sm">{item.deskripsi}</p>
                            </div>
                        ))}
                        {ekstrakurikulers.length === 0 && <p className="col-span-full text-center text-slate-500">Belum ada data ekstrakurikuler.</p>}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}