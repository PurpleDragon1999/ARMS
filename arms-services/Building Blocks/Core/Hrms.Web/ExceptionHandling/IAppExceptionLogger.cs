namespace Hrms.Web.ExceptionHandling
{
    public interface IAppExceptionLogger
    {
        long Insert(AppExceptionInsertDto dto);
    }
}