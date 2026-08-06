import type { SVGProps } from "react";

export function InfoIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle
                cx="6"
                cy="6"
                r="4.5"
                stroke="currentColor"
                strokeWidth="0.75"
            />
            <path
                d="M6 5.5V8.5"
                stroke="currentColor"
                strokeWidth="0.75"
                strokeLinecap="round"
            />
            <circle cx="6" cy="3.75" r="0.625" fill="currentColor" />
        </svg>
    );
}
