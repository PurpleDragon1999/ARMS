using System;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Hrms.Core.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;

namespace Hrms.Core.Autofac
{
    public class HrmsAutofacContainerBuilder : IContainerBuilder, IAutofacContainerBuilder
    {
        public HrmsAutofacContainerBuilder()
        {
            ContainerBuilder = new ContainerBuilder();
        }

        public ContainerBuilder ContainerBuilder { get; }

        public IContainerBuilder AddTransient<TInterface, TConcrete>()
        {
            ContainerBuilder.RegisterType<TConcrete>().As<TInterface>().InstancePerDependency();
            return this;
        }

        public IContainerBuilder AddTransientGeneric(Type concrete, Type service)
        {
            ContainerBuilder.RegisterGeneric(concrete).As(service).InstancePerDependency();
            return this;
        }

        public IContainerBuilder AddScoped<TInterface, TConcrete>()
        {
            ContainerBuilder.RegisterType<TConcrete>().As<TInterface>().InstancePerLifetimeScope();
            return this;
        }

        public IContainerBuilder AddSingleton<TInterface, TConcrete>()
        {
            ContainerBuilder.RegisterType<TConcrete>().As<TInterface>().SingleInstance();
            return this;
        }

        public IContainerBuilder Populate(IServiceCollection services)
        {
            ContainerBuilder.Populate(services);
            return this;
        }

        public object Build()
        {
            return ContainerBuilder.Build();
        }

        public IContainerBuilder Populate(IModule module)
        {
            module.RegisterServices(this);
            return this;
        }
    }
}