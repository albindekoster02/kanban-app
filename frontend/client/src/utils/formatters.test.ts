import {describe, it, expect} from 'vitest';
import { formatPriority } from './formatters';

describe('formatPriority', () => {
    it('bör returnera korrekt etikett och ikon för hög prioritet', () => {
        const result = formatPriority('high');
        expect(result).toBe('Hög');
    });

    it('bör returnera korrekt etikett och ikon för hög prioritet', () => {
        const result = formatPriority('low');
        expect(result).toBe('Låg');
    });
});