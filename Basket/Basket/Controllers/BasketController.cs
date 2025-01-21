using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;
using System.Collections.Generic;
using System.Threading.Tasks;
using Basket.Models;

namespace Basket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly IConnectionMultiplexer _redis;
        private readonly IDatabase _db;

        public CartController(IConnectionMultiplexer redis)
        {
            _redis = redis;
            _db = _redis.GetDatabase();
        }

        // Ajouter un produit au panier
        [HttpPost]
        public async Task<IActionResult> AddToCart([FromBody] CartItem item)
        {
            var cartKey = $"cart:{item.UserId}";
            var productKey = $"product:{item.ProductId}";

            var currentQuantity = await _db.HashGetAsync(cartKey, productKey);

            if (currentQuantity.IsNull)
            {
                await _db.HashSetAsync(cartKey, productKey, item.Quantity);
            }
            else
            {
                var newQuantity = (int)currentQuantity + item.Quantity;
                await _db.HashSetAsync(cartKey, productKey, newQuantity);
            }

            return Ok(new { message = "Produit ajouté au panier" });
        }

        // Récupérer les produits du panier
        [HttpGet("cart/{userId}")]
        public async Task<IActionResult> GetCart(string userId)
        {
            var cartKey = $"cart:{userId}";
            var cart = await _db.HashGetAllAsync(cartKey);

            if (cart.Length == 0)
            {
                return NotFound(new { message = "Panier vide" });
            }

            var result = new List<CartItem>();
            foreach (var item in cart)
            {
                result.Add(new CartItem
                {
                    ProductId = item.Name,
                    Quantity = (int)item.Value
                });
            }

            return Ok(result);
        }

        [HttpGet("all-carts")]
        public async Task<IActionResult> GetAllCarts()
        {
            var server = _redis.GetServer("localhost", 6379); // Change if Redis is running on a different host or port
            var keys = server.Keys(pattern: "cart:*"); // Get all keys with the "cart:" prefix
            var allCarts = new List<object>();

            foreach (var key in keys)
            {
                var cart = await _db.HashGetAllAsync(key);
                var userId = key.ToString().Replace("cart:", string.Empty); // Extract userId from the key
                var cartItems = new List<CartItem>();

                foreach (var item in cart)
                {
                    cartItems.Add(new CartItem
                    {
                        ProductId = item.Name,
                        Quantity = (int)item.Value
                    });
                }

                allCarts.Add(new { UserId = userId, Items = cartItems });
            }

            return Ok(allCarts);
        }

        // Mettre à jour la quantité d'un produit
        [HttpPut("update-cart")]
        public async Task<IActionResult> UpdateCart([FromBody] CartItem item)
        {
            var cartKey = $"cart:{item.UserId}";
            var productKey = $"product:{item.ProductId}";

            var currentQuantity = await _db.HashGetAsync(cartKey, productKey);

            if (currentQuantity.IsNull)
            {
                return NotFound(new { message = "Produit non trouvé dans le panier" });
            }

            await _db.HashSetAsync(cartKey, productKey, item.Quantity);

            return Ok(new { message = "Quantité mise à jour" });
        }

        // Supprimer un produit du panier
        [HttpDelete("remove-from-cart")]
        public async Task<IActionResult> RemoveFromCart([FromBody] CartItem item)
        {
            var cartKey = $"cart:{item.UserId}";
            var productKey = $"product:{item.ProductId}";

            var currentQuantity = await _db.HashGetAsync(cartKey, productKey);

            if (currentQuantity.IsNull)
            {
                return NotFound(new { message = "Produit non trouvé dans le panier" });
            }

            await _db.HashDeleteAsync(cartKey, productKey);

            return Ok(new { message = "Produit supprimé du panier" });
        }
        [HttpDelete("clear-all-carts")]
        public async Task<IActionResult> ClearAllCarts()
        {
            var server = _redis.GetServer("localhost", 6379); // Remplacez l'hôte et le port si nécessaire
            var keys = server.Keys(pattern: "cart:*"); // Obtenez toutes les clés correspondant aux paniers

            if (!keys.Any())
            {
                return NotFound(new { message = "Aucun panier trouvé" });
            }

            foreach (var key in keys)
            {
                await _db.KeyDeleteAsync(key);
            }

            return Ok(new { message = "Tous les paniers ont été supprimés avec succès" });
        }

    }

    public class CartItem
    {
        public string UserId { get; set; }
        public string ProductId { get; set; }
        public int Quantity { get; set; }
        public CartItem()
        {
            // If these properties are expected to be non-null, you could initialize them here.
            UserId = string.Empty;
            ProductId = string.Empty;
            Quantity = 0;
        }
    }

}
