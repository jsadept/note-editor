
export const getTrimmedString = (s: string, n: number = 10): string | Error => {
    if(typeof s !== 'string') throw new Error('Bad type of argument')
    if(s.length === 0) return '';
    return s.slice(0, n)+'...';
}