import type { SVGProps } from "react";

export function CancelCircleIcon(props: SVGProps<SVGSVGElement>) {
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
                d="M18.3337 9.99992C18.3337 5.39755 14.6027 1.66659 10.0003 1.66659C5.39795 1.66659 1.66699 5.39755 1.66699 9.99992C1.66699 14.6023 5.39795 18.3333 10.0003 18.3333C14.6027 18.3333 18.3337 14.6023 18.3337 9.99992Z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.4995 12.5L7.5 7.5M7.50053 12.5L12.5 7.5"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
