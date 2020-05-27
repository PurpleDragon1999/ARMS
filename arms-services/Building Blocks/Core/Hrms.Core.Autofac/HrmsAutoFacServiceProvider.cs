using System;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Hrms.Core.DependencyInjection;

namespace Hrms.Core.Autofac
{
    public class HrmsAutoFacServiceProvider : IDependencyServiceProvider
    {
        public IServiceProvider GetServiceProvider(IContainerBuilder container)
        {
            return new AutofacServiceProvider((ILifetimeScope)container.Build());
        }
    }
}