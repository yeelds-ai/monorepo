import type { SVGProps } from "react";

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path stroke="currentColor" d="M6 6l12 12" />
            <path stroke="currentColor" d="M18 6L6 18" />
        </svg>
    );
}
