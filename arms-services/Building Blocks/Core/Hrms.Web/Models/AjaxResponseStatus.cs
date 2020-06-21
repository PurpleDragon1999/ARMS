namespace Hrms.Web.Models
{
    public class AjaxResponseStatus
    {
        public bool Error { get; set; }
        public string Code { get; set; }
        public string Type { get; set; }
        public string Message { get; set; }
    }
}