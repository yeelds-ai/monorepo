import type { SVGProps } from "react";

export function ExternalLinkIcon(props: SVGProps<SVGSVGElement>) {
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
                d="M7.5 1.5H9C9.7071 1.5 10.0606 1.5 10.2803 1.71967C10.5 1.93934 10.5 2.2929 10.5 3V4.5M10 2L5.5 6.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10 6.5004C10 8.386 10 9.32885 9.4142 9.9146C8.82845 10.5004 7.8856 10.5004 6 10.5004H5.5C3.61438 10.5004 2.67157 10.5004 2.08578 9.9146C1.5 9.32885 1.5 8.386 1.5 6.5004V6.0004C1.5 4.11478 1.5 3.17197 2.08578 2.58618C2.67157 2.0004 3.61438 2.0004 5.5 2.0004"
                stroke="currentColor"
                strokeLinecap="round"
            />
        </svg>
    );
}
