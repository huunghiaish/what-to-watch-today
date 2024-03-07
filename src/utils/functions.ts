export function getRandomNumber(min: any, max: any) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));