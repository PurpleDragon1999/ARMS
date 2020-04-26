export interface IResponse {
    success: Boolean;
    payload: {
        data?: any;
        message: string;
    }
}