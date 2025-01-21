namespace Product.Models
{
    public class Product
    {
        public int Id { get; set; }  // Identifiant unique du produit

        public string? Name { get; set; }  // Nom du produit

        public string? Description { get; set; }  // Description du produit

        public decimal? Price { get; set; }  // Prix du produit

        public int? StockQuantity { get; set; }  // Quantité en stock du produit

        public string ImagePath { get; set; } // Stocker le chemin de l'image
    }
}
