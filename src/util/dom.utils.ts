export function preloadImageSource(source: string) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = source;
        image.onload = resolve;
        image.onerror = reject;
    });
}

export function calculateRem() {
    return parseFloat(getComputedStyle(document.documentElement).fontSize);
}
