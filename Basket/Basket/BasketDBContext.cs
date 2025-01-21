using Microsoft.EntityFrameworkCore;
using Basket.Models;  

namespace Basket  
{
    public class BasketDbContext : DbContext
    {
        public DbSet<Models.Basket>? Basket { get; set; }

        public BasketDbContext(DbContextOptions<BasketDbContext> options)
            : base(options) { }
    }
}
