import { HttpPostClient } from '../../protocols/http/http-post-client'
import { RemoteAuthentication } from './remote-authentication'

interface HttpGetClient {
    get(url: string): Promise<void>
}

describe('RemoteAuthentication', () => {
    test('Should call HTTPPostClient with correct URL', async () => {
        class HttpClientSpy implements HttpPostClient {
            url?: string

            async post(url: string): Promise<void> {
                this.url = url
                return Promise.resolve()
            }
        }

        const url = 'any_url'
        const httpClientPostSpy = new HttpClientSpy()
        const sut = new RemoteAuthentication(url, httpClientPostSpy)
        await sut.auth()
        expect(httpClientPostSpy.url).toBe(url)
    })
})
