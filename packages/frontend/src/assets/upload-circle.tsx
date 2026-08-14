import type { SVGProps } from "react";

export function UploadCircle(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M9.16634 5.00001C9.16634 7.30118 7.30084 9.16668 4.99967 9.16668C2.69849 9.16668 0.833008 7.30118 0.833008 5.00001C0.833008 2.69882 2.69849 0.833344 4.99967 0.833344C7.30084 0.833344 9.16634 2.69882 9.16634 5.00001Z"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.66634 4.79167C6.66634 4.79167 5.43884 3.125 4.99967 3.125C4.56047 3.125 3.33301 4.79167 3.33301 4.79167M4.99967 3.33333V6.875"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
