using System;

namespace Arms.Api.Models
{
    public class Payload<T>
    {
        public T Data { get; set; }
        public string Message { get; set; }

        public Payload(T data, string message)
        {
            this.Data = data;
            this.Message = message;
        }
    }
    
    public class Response<T>
    {
        public bool Success;
        public Payload<T> Payload;
        
        public Response(bool success, T data, string message)
        {
            this.Success = success;
            this.Payload = new Payload<T>(data, message);
        }
    }
}