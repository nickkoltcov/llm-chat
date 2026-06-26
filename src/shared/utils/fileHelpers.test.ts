import { describe, it, expect, vi } from 'vitest'
import { buildFileBlocks } from './fileHelpers'

vi.mock('@/shared/utils/formatBytes', () => ({
    formatBytes: vi.fn(() => '10 KB')
}))


describe('buildFileBlocks', () => {

    it('Должен возвращать блок image_url для картинок', () => {
        const mockFiles = [
            {
                name: 'avatar.png',
                size: 1024,
                type: 'image/png',
                base64: 'data:image/png;base64,qwerty',
            }
        ] as any;

        const result = buildFileBlocks(mockFiles)

        expect(result).toEqual([
            {
                type: 'image_url',
                image_url: {
                    url: 'data:image/png;base64,qwerty',
                    name: 'avatar.png',
                    size: '10 KB'
                },
            },
        ]);
    })

    it('Обработка аудиофайлов, отрезая префикс base64 и извлекая формат', () => {
        const mockAudioFiles = [
            {
                name: 'song.mp3',
                size: 5000,
                type: 'audio/mp3',
                base64: 'data:audio/mp3;base64,ABCDEF',
            }    
        ] as any;

        const result = buildFileBlocks(mockAudioFiles)

        expect(result).toEqual([
            {
                type: 'input_audio',
                name: 'song.mp3',
                size: '10 KB',
                input_audio: {
                    data: 'ABCDEF',
                    format:'mp3'
                },
            },
        ]);

    })


})