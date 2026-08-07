import type { SVGProps } from "react";

export function ArrowDown(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M6.0001 2L6 9.77911M8.5 7.50002L6 10L3.5 7.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
            />
        </svg>
    );
}
