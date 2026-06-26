import { describe, it, expect } from 'vitest'
import { formatBytes } from './formatBytes'


describe('formatBytes', () => {
    it('Возвращает "0 Bytes" при 0', () => {
        expect(formatBytes(0)).toBe("0 Bytes")
    })

    it('Правельное форматирование значений меньше килобайта', () => {
        expect(formatBytes(500)).toBe("500 Bytes")
    })

    it('Возвращает KB для тысяч байт', () => {
        expect(formatBytes(1024)).toBe("1 KB")
    })

    it('Округляет до одного знака после запятой', () => {
        expect(formatBytes(1572864)).toBe("1.5 MB")
    })
})