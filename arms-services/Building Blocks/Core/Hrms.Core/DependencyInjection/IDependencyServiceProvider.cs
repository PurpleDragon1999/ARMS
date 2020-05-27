using System;

namespace Hrms.Core.DependencyInjection
{
    public interface IDependencyServiceProvider
    {
        IServiceProvider GetServiceProvider(IContainerBuilder container);
    }
}