import { describe, it, expect } from 'vitest'
import { mapApiMessageToClient, mapFilesToAttachments, convertFileToMeta } from './chatMappers'


describe('chatMappers', () => {

    it('Маппить сообщение от API в клиентский формат', () => {

        const mockApiMessage = {
            id: 'msg-123',
            role: 'user',
            status: 'ok',
            content: 'Привет от сервера',
            createdAt: '2026-03-20T15:30:00.000Z',
            attachments: [
                {
                    type: 'image',
                    mimeType: 'image/png',
                    data: 'base64dataString'
                }
            ]
        } as any;

        const result = mapApiMessageToClient(mockApiMessage);

        expect(result).toEqual({
            id: 'msg-123',
            role: 'user',
            status: 'ok',
            text: 'Привет от сервера',
            time: expect.any(String), 
            files: [
                {
                    name: 'Image',
                    size: 0,
                    type: 'image/png',
                    base64: 'data:image/png;base64,base64dataString',
                }
            ]
        })
    })


    it('Маппит клиентский файл в формат вложений для API', () => {

        const mockClientFiles = [
            {
                name: 'photo.jpg',
                size: 500,
                type: 'image/jpeg',
                base64: 'data:image/jpeg;base64,imageBytes321'
            },
            {
                name: 'document.pdf',
                size: 2000,
                type: 'application/pdf',
                base64: 'data:application/pdf;base64,pdfBytes789'
            }
        ] as any;

        const result = mapFilesToAttachments(mockClientFiles);

        expect(result).toEqual([
            {
                type: 'image',
                mimeType: 'image/jpeg',
                data: 'imageBytes321'
            },
            {
                type: 'file',
                mimeType: 'application/pdf',
                data: 'pdfBytes789'
            }
        ]);
    });


    it('Конвертирует объект браузерного File в формат IFileMeta', async () => {
        const fakeFile = new File(['hello'], 'test.txt', { type: 'text/plain' });

        const result = await convertFileToMeta(fakeFile);

        expect(result).toEqual({
            name: 'test.txt',
            size: 5,
            type: 'text/plain',
            base64: expect.stringContaining('data:text/plain;base64,')
        });
    });
})