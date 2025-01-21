using Microsoft.EntityFrameworkCore;
using Customer.Models; 
namespace Customer 
{
    public class CustomerDbContext : DbContext
    {
       
        public DbSet<Models.Customer> Customers { get; set; }

        public CustomerDbContext(DbContextOptions<CustomerDbContext> options)
            : base(options) { }
    }
}
