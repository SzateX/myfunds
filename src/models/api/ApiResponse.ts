export default interface ApiResponse {
    data: object;
    status: number;
    statusText: string;
    headers: object;
    config: object;
    request: object;
}
