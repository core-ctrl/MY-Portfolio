export const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max)

export const lerp = (current: number, target: number, factor: number) =>
    current + (target - current) * factor

export const chooseDirection = (delta: number) =>
    delta < 0 ? 'left' : 'right'
