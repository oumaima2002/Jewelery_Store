import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

interface CartItem {
  userId: string;
  productId: string;
  quantity: number;
}

let i = 0;

const List = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://192.168.11.122:5005/api/cart/all-carts');
      const data = await response.json();

      const allItems = data.flatMap((cart: any) => cart.items);
      setCartItems(allItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const clearHistory = async () => {
    try {
      const response = await fetch('http://192.168.11.122:5005/api/cart/clear-all-carts', {
        method: 'DELETE',
      });

      if (response.ok) {
        setCartItems([]);
        console.log('Historique effacé avec succès');
      } else {
        console.error('Erreur lors de la suppression de l\'historique');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'historique:', error);
    }
  };

  // Mettre à jour uniquement l'état local sans appeler l'API
  const updateCartItem = (item: CartItem, increment: boolean) => {
    const newQuantity = item.quantity + (increment ? 1 : -1);
    if (newQuantity < 1) return; // Prévenir une quantité inférieure à 1

    // Mettre à jour localement l'état de la quantité
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.productId === item.productId && cartItem.userId === item.userId
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    );
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Text style={styles.itemName}>{item.productId}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateCartItem(item, false)}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.itemQuantity}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateCartItem(item, true)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Effacer Saved Items" onPress={clearHistory} color="#d9534f" />
      <FlatList
        data={cartItems}
        keyExtractor={() => `${i++}`}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        style={styles.productList}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  cartItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemQuantity: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginHorizontal: 10,
  },
  list: {
    padding: 10,
  },
  productList: {
    marginTop: 20,
    flex: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor:  'rgba(94, 3, 53, 0.7)',
    padding: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
