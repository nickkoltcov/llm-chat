import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {useBreakpoint} from './usebreakpoint';


describe('useBreakpoint', () => {

    let triggerChange: (ev: any) => void;
    let removeEventListenerSpy: any;

    beforeEach(() => {
        vi.resetAllMocks();

        window.matchMedia = vi.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addEventListener: vi.fn((_type, listener) => {
                triggerChange = listener;
            }),
            removeEventListener: removeEventListenerSpy = vi.fn(),
            dispatchEvent: vi.fn(),
        }));
    });

    it('проверка поведения хука на большом экеране', () => {
        const {result} = renderHook(() => useBreakpoint())

        expect(result.current.isMobile).toBe(false)
    })

    it('проверяем на изменение разрешения', () => {
        const {result,unmount} = renderHook(() => useBreakpoint())

        act(() => {
            triggerChange({matches:true})
        })

        expect(result.current.isMobile).toBe(true)

        unmount()

        expect(removeEventListenerSpy).toHaveBeenCalled()
    })

})