import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';



interface CartItem {
  userId: string;
  productId: string;
  quantity: number;
}
interface Cart {
  userId: string;
  items: CartItem[];
}
interface Product {
  id: string;
  title: string;
  price: number;  
  image: any; // Change the type if necessary
}

const Panier = ({ route }: any) => {
  const { product } = route.params; // Produit passé depuis la navigation
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  // Fonction pour sauvegarder le produit dans le panier (Redis)
  const saveToRedis = async () => {
    try {
      const response = await fetch('http://192.168.11.122:5005/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Ajout du champ `item` comme attendu par l'API
            UserId: 'user127', // Remplacez par un ID utilisateur valide
            ProductId: product.title, // Conversion explicite en chaîne
            Quantity:2,
          
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Produit ajouté au panier avec succès.');
      } else {
        console.error('Erreur lors de l’ajout au panier:', data);
        alert(`Erreur : ${data?.[Object.keys(data)[0]]?.[0] || 'Erreur inconnue'}`);
      }
    } catch (error) {
      console.error('Erreur réseau lors de l’ajout au panier:', error);
      alert('Une erreur réseau est survenue.');
    }
  };
  
  return (
    <View style={styles.container}>
      <Image source={product.image} style={styles.productImage} />
      <Text style={styles.productTitle}>{product.title}</Text>
      <Text style={styles.productPrice}>${(product.price * quantity).toFixed(2)}</Text>

      {/* Compteur de quantité */}
      <View style={styles.counterContainer}>
        <TouchableOpacity onPress={decrement} style={styles.counterButton}>
          <Text style={styles.counterText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.counterValue}>{quantity}</Text>
        <TouchableOpacity onPress={increment} style={styles.counterButton}>
          <Text style={styles.counterText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Bouton pour sauvegarder le produit dans le panier */}
      <TouchableOpacity onPress={saveToRedis} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Ajouter au panier</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  productImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 20,
    color: '#888',
    marginBottom: 20,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  counterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  counterText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  counterValue: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Panier;
