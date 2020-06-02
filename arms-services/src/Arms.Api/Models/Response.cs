using System;

namespace Arms.Api.Models
{
    public class Payload<T>
    {
        private T Data { get; set; }
        private string Message { get; set; }

        public Payload(T data, string message)
        {
            this.Data = data;
            this.Message = message;
        }
    }
    
    public class Response<T>
    {
        private bool Success;
        private Payload<T> Payload;
        
        public Response(bool success, T data, string message)
        {
            this.Success = success;
            this.Payload = new Payload<T>(data, message);
        }
    }
}