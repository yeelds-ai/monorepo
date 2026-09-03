export function PendleLogo(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="13.191 8.989 33.618 33.618"
            width={33.618}
            height={33.618}
            fill="none"
            {...props}
        >
            <mask
                id="a"
                width={34}
                height={35}
                x={13}
                y={8}
                maskUnits="userSpaceOnUse"
                style={{
                    maskType: "alpha",
                }}
            >
                <circle cx={30} cy={25.798} r={16.809} fill="#fff" />
            </mask>
            <g mask="url(#a)">
                <circle cx={22.438} cy={41.764} r={9.248} fill="#fff" />
                <mask
                    id="b"
                    width={3}
                    height={26}
                    x={21}
                    y={9}
                    maskUnits="userSpaceOnUse"
                    style={{
                        maskType: "alpha",
                    }}
                >
                    <path
                        fill="#fff"
                        fillRule="evenodd"
                        d="M21.42 34.725V9.942h2.062v24.783h-2.061Z"
                        clipRule="evenodd"
                    />
                </mask>
                <g mask="url(#b)">
                    <path
                        fill="#fff"
                        d="M46.81 25.798c0 9.284-7.526 16.81-16.81 16.81-9.284 0-16.81-7.526-16.81-16.81 0-9.283 7.527-16.81 16.81-16.81 9.284 0 16.81 7.527 16.81 16.81Z"
                    />
                </g>
            </g>
            <circle
                cx={30}
                cy={25.798}
                r={16.809}
                fill="#fff"
                fillOpacity={0.5}
            />
        </svg>
    );
}
