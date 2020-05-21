using Hrms.EntityFrameworkCore;
using Hrms.EntityFrameworkCore.Repositories;

namespace Arms.Infrastructure
{
    public class ArmsEfCoreRepository<TEntity> : EfCoreRepositoryBaseOfTEntity<ArmsDbContext, TEntity>
        where TEntity : class
    {
        public ArmsEfCoreRepository(IDbContextProvider<ArmsDbContext> contextProvider) 
            : base(contextProvider)
        {
        }
    }
}