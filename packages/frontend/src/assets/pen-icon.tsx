import type { SVGProps } from "react";

export function PenIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M2.33325 12.6568V13.6666H3.34307C4.16057 13.6666 4.56932 13.6666 4.93686 13.5144C5.30441 13.3622 5.59343 13.0731 6.17149 12.495L12.7475 5.9191C13.3359 5.33073 13.63 5.03653 13.6625 4.67548C13.6679 4.61579 13.6679 4.55574 13.6625 4.49605C13.63 4.135 13.3359 3.84081 12.7475 3.25243C12.1591 2.66406 11.8649 2.36987 11.5039 2.33735C11.4441 2.33197 11.3841 2.33197 11.3244 2.33735C10.9633 2.36987 10.6692 2.66406 10.0808 3.25243L3.50483 9.82838C2.92677 10.4064 2.63774 10.6955 2.48549 11.063C2.33325 11.4306 2.33325 11.8393 2.33325 12.6568Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9 4.33331L11.6667 6.99998"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
