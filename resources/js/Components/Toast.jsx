import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { CheckCircle, XCircle, Info } from '@phosphor-icons/react';

export default function Toast() {
    const { flash } = usePage().props;
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        if (flash?.success) {
            addToast(flash.success, 'success');
        } else if (flash?.error) {
            addToast(flash.error, 'error');
        } else if (flash?.info) {
            addToast(flash.info, 'info');
        }
    }, [flash]); // Akan terpicu setiap kali flash message berubah

    const addToast = (message, type) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);

        // Hapus otomatis setelah 3 detik
        setTimeout(() => {
            removeToast(id);
        }, 3000);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    // Styling berdasarkan tipe
    const toastConfig = {
        success: {
            bg: 'bg-primary-600',
            icon: <CheckCircle size={24} weight="fill" />,
        },
        error: {
            bg: 'bg-red-600',
            icon: <XCircle size={24} weight="fill" />,
        },
        info: {
            bg: 'bg-slate-800 dark:bg-slate-700',
            icon: <Info size={24} weight="fill" />,
        },
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
            {toasts.map((toast) => {
                const config = toastConfig[toast.type] || toastConfig.info;
                return (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-xl text-white shadow-xl animate-slide-in-right ${config.bg}`}
                    >
                        {config.icon}
                        <span className="text-sm font-medium pr-2">{toast.message}</span>
                    </div>
                );
            })}
        </div>
    );
}