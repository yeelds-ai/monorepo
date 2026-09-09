import type { SVGProps } from "react";

export function SparkLogo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            id="Spark-Logomark-RGB_00000061445967033202459310000005992675535628864924_"
            x={0}
            y={0}
            viewBox="0 0 497 497"
            {...props}
        >
            <style>
                {
                    ".st0{fill:url(#Spark-Logomark-RGB_00000101069719319400033940000001300561692565655969_)}"
                }
            </style>
            <linearGradient
                id="Spark-Logomark-RGB_00000176022130462684269260000000240716719928865701_"
                x1={400.576}
                x2={80.11}
                y1={661.966}
                y2={907.768}
                gradientTransform="translate(0 -530.11)"
                gradientUnits="userSpaceOnUse"
            >
                <stop
                    offset={0}
                    style={{
                        stopColor: "#fa43bd",
                    }}
                />
                <stop
                    offset={1}
                    style={{
                        stopColor: "#ffa930",
                    }}
                />
            </linearGradient>
            <path
                id="Spark-Logomark-RGB"
                d="M313.035 279.197h177.982c6.846 0 8.225-9.321 2-12.168L313.046 185.06V6.383c0-6.67-8.92-8.858-11.998-2.942l-73.988 142.46-81.987-37.656c-7.844-3.168-12.661 3.219-9.999 8.707l48.891 100.851H5.983c-6.846 0-8.225 9.321-2 12.168l179.971 81.97v178.677c0 6.669 8.92 8.857 11.998 2.94L269.94 351.1l81.987 37.656c7.844 3.168 12.661-3.218 9.999-8.708l-48.891-100.85z"
                style={{
                    fill: "url(#Spark-Logomark-RGB_00000176022130462684269260000000240716719928865701_)",
                }}
            />
        </svg>
    );
}
