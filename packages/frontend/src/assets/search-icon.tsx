import type { SVGProps } from "react";

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M12.292 12.2917L15.6253 15.625"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.9583 7.29167C13.9583 3.60977 10.9736 0.625 7.29167 0.625C3.60977 0.625 0.625 3.60977 0.625 7.29167C0.625 10.9736 3.60977 13.9583 7.29167 13.9583C10.9736 13.9583 13.9583 10.9736 13.9583 7.29167Z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
