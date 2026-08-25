import type { SVGProps } from "react";

export function ChevronDoubleRightIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M6 17l5-5-5-5" />
            <path d="M13 17l5-5-5-5" />
        </svg>
    );
}
