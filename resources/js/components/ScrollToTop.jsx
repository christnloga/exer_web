import { useEffect } from "react";
import { usePage } from "@inertiajs/react";

export default function ScrollToTop() {
    const { url } = usePage();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            // behavior: "smooth", // optional
        });
    }, [url]);

    return null;
}
