function hslToHex(hue: number, saturation: number, lightness: number): string {
    const s = saturation / 100;
    const l = lightness / 100;
    const k = (n: number) => (n + hue / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const toHex = (n: number) =>
        Math.round(255 * f(n))
            .toString(16)
            .padStart(2, "0");

    return `#${toHex(0)}${toHex(8)}${toHex(4)}`;
}

export function stringToColor(value: string): string {
    let hash = 0;
    for (let i = 0; i < value.length; i++)
        hash = value.charCodeAt(i) + ((hash << 5) - hash);

    return hslToHex(Math.abs(hash) % 360, 55, 35);
}
