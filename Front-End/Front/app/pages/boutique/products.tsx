

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

type Product = {
  id: number;
  name: string;
  price: Number;
  imagePath: string;
};
// Import local products to enhance database with some data
const tryes = [
  { id: 1, title: 'Bracelet', price: 90, image: require('../../../assets/images/bracelet.jpeg') },
  { id: 3, title: 'Bracelet', price: 10, image: require('../../../assets/images/bracelet2.jpeg') },
  { id: 4, title: 'Bracelet', price: 10, image: require('../../../assets/images/bracelet3.jpeg') },
  { id: 5, title: 'Collier', price: 10, image: require('../../../assets/images/collier_2.jpeg') },
  { id: 6, title: 'Collier', price: 10, image: require('../../../assets/images/collier_or.jpeg') },
  { id: 7, title: 'Collier', price: 10, image: require('../../../assets/images/collier.jpeg') },
  { id: 8, title: 'Collier', price: 10, image: require('../../../assets/images/collier3.jpeg') },
  { id: 9, title: 'Collier', price: 10, image: require('../../../assets/images/collier4.jpeg') },
  { id: 10, title: 'Collier', price: 10, image: require('../../../assets/images/collier5.jpeg') },
];

const products = ({ navigation }: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

   const handleImageAction = (product: any) => {
    navigation.navigate('panier', { product });
  };

  const list = () => {
    navigation.navigate('list');
  };

  const card = ({ item }: any) => (
    <View style={styles.productCard}>
      <TouchableOpacity onPress={() => handleImageAction(item)} style={styles.productRow}>
        <Image
      source={item.image}
          style={styles.productImage}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productPrice}>{item.price}$</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title} onPress={() => navigation.navigate("map")}>
        Show Shops On Map
      </Text>
      <TouchableOpacity onPress={list}>
        <Text style={styles.cart}>Show My Cart</Text>
      </TouchableOpacity>
        <FlatList
          data={tryes} // Use products state to populate the list
          keyExtractor={(item) => item.id.toString()} // Use id as key
          renderItem={card}
          contentContainerStyle={styles.list}
          style={styles.productList}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  list: {
    padding: 10,
  },
  productCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 7,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 150,
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
    marginLeft: 160,
  },
  productList: {
    marginTop: 50,
    flex: 1,
  },
  title: {
    textAlign: 'center',
    color: 'rgba(94, 3, 53, 0.7)',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 0,
    marginTop: 2,
  },
  cart: {
    color: 'rgba(95, 192, 88, 0.7)',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default products;