import type { SVGProps } from "react";

export function ShieldIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M12.4725 2.32972C11.211 1.70204 9.66727 1.33282 8 1.33282C6.33273 1.33282 4.789 1.70204 3.52744 2.32972C2.90879 2.63753 2.59946 2.79144 2.29973 3.27534C2 3.75926 2 4.22781 2 5.16492V7.49089C2 11.2798 5.02824 13.3864 6.782 14.2887C7.27113 14.5404 7.51567 14.6662 8 14.6662C8.48433 14.6662 8.72887 14.5404 9.21793 14.2887C10.9717 13.3864 14 11.2798 14 7.49089V5.16492C14 4.22782 14 3.75926 13.7003 3.27534C13.4005 2.79143 13.0912 2.63753 12.4725 2.32972Z"
                stroke="currentColor"
                strokeWidth="1.16"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
