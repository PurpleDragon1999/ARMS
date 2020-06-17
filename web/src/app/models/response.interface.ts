export interface IResponse {
    success: boolean;
    payload: {
        data?: any;
        message: string;
    }
}