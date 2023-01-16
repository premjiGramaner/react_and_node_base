/**
 * Utils.ts
 * Make sure only the dynamic reusable functions only present here!!!
 */

const random = (): number => {
    const crypto = window.crypto;
    const array = new Uint32Array(1);
    if (crypto?.getRandomValues) crypto?.getRandomValues(array); // Compliant for security-sensitive use cases
    return (!!array.length) ? Number('0.' + array[0]) : 0.1;
};

export const guid = (withHyphen: string = '-'): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[-]/g, withHyphen).replace(/[xy]/g, (c) => {
        const r = random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const getKey = (): string => {
    return random().toString(36).slice(3, 13);
};