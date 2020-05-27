using Autofac;

namespace Hrms.Core.Autofac
{
    public interface IAutofacContainerBuilder
    {
        ContainerBuilder ContainerBuilder { get; }
    }
}