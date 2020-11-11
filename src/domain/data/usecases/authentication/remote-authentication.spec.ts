import { HttpPostClient } from '../../protocols/http/http-post-client'
import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'

interface HttpGetClient {
    get(url: string): Promise<void>
}

type SutTypes = {
    sut: RemoteAuthentication
    httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = 'any_url'): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)

    return {
        sut,
        httpPostClientSpy,
    }
}

describe('RemoteAuthentication', () => {
    test('Should call HTTPPostClient with correct URL', async () => {
        const url = 'any_url'
        const { sut, httpPostClientSpy } = makeSut(url)
        await sut.auth()
        expect(httpPostClientSpy.url).toBe(url)
    })
})