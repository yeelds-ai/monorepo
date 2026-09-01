import type { SVGProps } from "react";

export function XLogo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M1.75 12.25L6.15323 7.84677M12.25 1.75L7.84677 6.15323M6.15323 7.84677L9.33333 12.25H12.25L7.84677 6.15323L4.66667 1.75H1.75L6.15323 7.84677Z"
                stroke="currentColor"
                strokeWidth="0.875"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
