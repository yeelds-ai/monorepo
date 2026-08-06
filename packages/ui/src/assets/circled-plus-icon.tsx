import type { SVGProps } from "react";

export function CircledPlusIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M18.3332 9.99992C18.3332 5.39755 14.6022 1.66659 9.99984 1.66659C5.39746 1.66659 1.6665 5.39755 1.6665 9.99992C1.6665 14.6023 5.39746 18.3333 9.99984 18.3333C14.6022 18.3333 18.3332 14.6023 18.3332 9.99992Z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.99984 6.66663V13.3333M13.3332 9.99996H6.6665"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
