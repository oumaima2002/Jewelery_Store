using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

namespace Product
{
    public class ProductDbContext : DbContext
    {
        public DbSet<Product.Models.Product> Products { get; set; } = default!;
        public ProductDbContext(DbContextOptions<ProductDbContext> options)
            : base(options) { }
    }
}

