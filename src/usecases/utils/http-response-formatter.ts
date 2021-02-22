export function formatHttpResponse(status: number, data?: any) {
    return {
        status: status,
        data: data
    }
}
