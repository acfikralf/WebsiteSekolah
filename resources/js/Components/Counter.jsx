import { useEffect, useRef, useState } from 'react';

export default function Counter({ target, duration = 2000 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                let start = 0;
                const stepTime = Math.max(Math.floor(duration / target), 1);
                const timer = setInterval(() => {
                    start += 1;
                    setCount(start);
                    if (start >= target) {
                        clearInterval(timer);
                    }
                }, stepTime);
                observer.unobserve(element);
            }
        }, { threshold: 0.5 });

        observer.observe(element);
        return () => observer.disconnect();
    }, [target, duration]);

    return <span ref={ref}>{count}</span>;
}