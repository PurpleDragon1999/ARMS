using System;
using Microsoft.Extensions.DependencyInjection;

/*
* Author: AV
* Date: June 2019
*/
namespace Hrms.Core.DependencyInjection
{
    public interface IContainerBuilder
    {
        IContainerBuilder AddTransient<TInterface, TConcrete>();
        IContainerBuilder AddTransientGeneric(Type concrete, Type service);
        IContainerBuilder AddScoped<TInterface, TConcrete>();
        IContainerBuilder AddSingleton<TInterface, TConcrete>();
        IContainerBuilder Populate(IServiceCollection services);
        IContainerBuilder Populate(IModule module);
        object Build();
    }
}