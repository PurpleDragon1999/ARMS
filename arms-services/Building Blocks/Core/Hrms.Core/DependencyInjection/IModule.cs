namespace Hrms.Core.DependencyInjection
{
    public interface IModule
    {
        void RegisterServices(IContainerBuilder containerBuilder);
    }
}