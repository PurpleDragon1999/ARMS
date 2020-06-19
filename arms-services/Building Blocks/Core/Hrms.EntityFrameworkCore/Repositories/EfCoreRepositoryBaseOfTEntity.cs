using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Hrms.EntityFrameworkCore.Repositories
{
    public class EfCoreRepositoryBaseOfTEntity<TDbContext, TEntity> : IRepository<TEntity> 
        where TEntity : class
        where TDbContext : DbContext
    {
        private readonly IDbContextProvider<TDbContext> _contextProvider;

        public EfCoreRepositoryBaseOfTEntity(IDbContextProvider<TDbContext> contextProvider)
        {
            _contextProvider = contextProvider;
        }

        /// <summary>
        /// Gets EF DbContext object.
        /// </summary>
        public virtual DbContext Context => _contextProvider.GetDbContext();

        /// <summary>
        /// Gets DbSet for given entity.
        /// </summary>
        public virtual DbSet<TEntity> Table => Context.Set<TEntity>();

        /// <summary>
        /// Gets a table with "no tracking" enabled (EF feature) Use it only when you load record(s) only for read-only operations
        /// </summary>
        public virtual IQueryable<TEntity> TableNoTracking => Table.AsNoTracking();

        public virtual DbConnection Connection
        {
            get
            {
                var connection = Context.Database.GetDbConnection();

                if (connection.State != ConnectionState.Open)
                {
                    connection.Open();
                }

                return connection;
            }
        }

        public virtual TEntity GetById(object id)
        {
            return Table.Find(id);
        }

        public virtual IQueryable<TEntity> GetAll()
        {
            return GetAllIncluding();
        }

        private IQueryable<TEntity> GetAllIncluding(params Expression<Func<TEntity, object>>[] propertySelectors)
        {
            var query = Table.AsQueryable();

            if (propertySelectors != null && propertySelectors.Length > 0)
            {
                foreach (var propertySelector in propertySelectors)
                {
                    query = query.Include(propertySelector);
                }
            }

            return query;
        }
        
        public async Task<List<TEntity>> GetAllListAsync()
        {
            return await GetAll().ToListAsync();
        }
        
        public async Task<List<TEntity>> GetAllListAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await GetAll().Where(predicate).ToListAsync();
        }

        public TEntity Single(Expression<Func<TEntity, bool>> predicate)
        {
            return GetAll().Single(predicate);
        }
        
        public async Task<TEntity> SingleAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await GetAll().SingleAsync(predicate);
        }

        public TEntity FirstOrDefault(Expression<Func<TEntity, bool>> predicate)
        {
            return GetAll().FirstOrDefault(predicate);
        }

        public  async Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await GetAll().FirstOrDefaultAsync(predicate);
        }

        public IQueryable<TEntity> Where(Expression<Func<TEntity, bool>> predicate)
        {
            return GetAll().Where(predicate);
        }

        public int Count(Expression<Func<TEntity, bool>> predicate)
        {
            return GetAll().Where(predicate).Count();
        }

        public long LongCount(Expression<Func<TEntity, bool>> predicate)
        {
            return GetAll().Where(predicate).Count();
        }

        public TEntity Insert(TEntity entity)
        {
            Table.Add(entity);
            Context.SaveChanges();

            return entity;
        }
        
        public Task<TEntity> InsertAsync(TEntity entity)
        {
            return Task.FromResult(Insert(entity));
        }

        public void Insert(List<TEntity> entityList)
        {
            if (entityList == null)
                return;

            foreach (TEntity entity in entityList)
            {
                Context.Entry(entity).State = EntityState.Added;
            }

            Context.SaveChanges();
        }

        public TEntity Update(TEntity entity)
        {
            AttachIfNot(entity);
            Context.Entry(entity).State = EntityState.Modified;
            Context.SaveChanges();
            return entity;
        }
        
        public Task<TEntity> UpdateAsync(TEntity entity)
        {
            entity = Update(entity);
            return Task.FromResult(entity);
        }

        public void Update(List<TEntity> entityList)
        {
            if (entityList == null)
                return;

            foreach (TEntity entity in entityList)
            {
                Context.Entry(entity).State = EntityState.Modified;
            }

            Context.SaveChanges();
        }

        public void Delete(TEntity entity)
        {
            AttachIfNot(entity);
            Table.Remove(entity);
            Context.SaveChanges();
        }

        public void Delete(IEnumerable<TEntity> entityList)
        {
            if (entityList == null)
                return;

            foreach (TEntity entity in entityList)
            {
                Context.Entry(entity).State = EntityState.Deleted;
            }

            Context.SaveChanges();
        }

        protected virtual void AttachIfNot(TEntity entity)
        {
            var entry = Context.ChangeTracker.Entries().FirstOrDefault(ent => ent.Entity == entity);
            if (entry != null)
            {
                return;
            }

            Table.Attach(entity);
        }
    }
}
