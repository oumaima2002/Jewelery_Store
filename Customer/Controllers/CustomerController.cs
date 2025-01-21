using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Added to fix missing references
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Customer.Models; // Your DbContext namespace
using Microsoft.AspNetCore.Http;


namespace Customer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerDbContext _dbContext;

        public CustomerController(CustomerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/Customer
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.Customer>>> GetCustomers()
        {
            return Ok(await _dbContext.Customers.ToListAsync());
        }

        // GET: api/Customer/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Models.Customer>> GetCustomer(int id)
        {
            var customer = await _dbContext.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        // POST: api/Customer
        [HttpPost]
        public async Task<ActionResult<Models.Customer>> CreateCustomer([FromBody] Models.Customer customer)
        {
            _dbContext.Customers.Add(customer);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCustomer), new { id = customer.Id }, customer);
        }

        // PUT: api/Customer/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCustomer(int id, [FromBody] Models.Customer customer)
        {
            if (id != customer.Id)
            {
                return BadRequest();
            }

            _dbContext.Entry(customer).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Customer/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _dbContext.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            _dbContext.Customers.Remove(customer);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }
        [HttpPost("signup")]
        public async Task<ActionResult<Models.Customer>> Signup([FromBody] Models.Customer customer)
        {
            var existingCustomer = await _dbContext.Customers
                .FirstOrDefaultAsync(c => c.Email == customer.Email);//voir si email existe deja ou pas

            if (existingCustomer != null)
            {
                return BadRequest("Email already exists.");
            }

            _dbContext.Customers.Add(customer);//SignUp
            await _dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCustomer), new { id = customer.Id }, customer);
        }

        [HttpPost("signin")]
        public async Task<ActionResult<Models.Customer>> Signin([FromBody] Models.Customer customer)
        {
            var existingCustomer = await _dbContext.Customers
                .FirstOrDefaultAsync(c => c.Email == customer.Email && c.Password == customer.Password);

            if (existingCustomer == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            return Ok(existingCustomer); 
        }


        private bool CustomerExists(int id)
        {
            return _dbContext.Customers.Any(e => e.Id == id);
        }
    }
}
