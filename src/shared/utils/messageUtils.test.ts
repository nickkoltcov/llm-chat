import { describe, it, expect, vi, beforeEach } from 'vitest'
import {copyText} from './messageUtils'

describe('copyText', () => {

    beforeEach(() => {
       vi.resetAllMocks() 

       Object.defineProperty(navigator, 'clipboard', {
            value: {
                writeText: vi.fn().mockResolvedValue(undefined)
            },
            configurable: true
        });
    })

    it('Копирование', async () => {

        await copyText('Привет')
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Привет')
    })
})