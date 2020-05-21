namespace Hrms.Web.ExceptionHandling
{
    public class NullAppExceptionLogger : IAppExceptionLogger
    {
        public long Insert(AppExceptionInsertDto dto)
        {
            return 0;
        }
    }
}