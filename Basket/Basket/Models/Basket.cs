
namespace Basket.Models
{
    public class Basket
    {
        public int Id { get; set; }
        public string? name { get; set; }   
        public int? quantity { get; set; } 
        public int? total { get; set; }
        public Basket(string name, int quantity, int total)
        {
            this.name = name;
            this.quantity = quantity;
            this.total = total;
        }
    }
}
