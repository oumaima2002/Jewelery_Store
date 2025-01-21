namespace Customer.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string Email { get; set; }   // Remarquez que j'ai corrigé le nom pour respecter la convention PascalCase
        public string Password { get; set; } // Idem ici, pour respecter la convention

        // Constructeur de la classe Customer
        public Customer(string email, string password)
        {
            Email = email;
            Password = password;
        }
    }
}
