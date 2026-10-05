import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

export default function CategoryProductsView({ route, navigation }) {
  const categoryName = route?.params?.categoryName || 'Products';
  const [search, setSearch] = useState('');

  const sampleProducts = [
    { id: 1, name: 'Fresh Organic Tomatoes', unit: '500g', price: '₹40', oldPrice: '₹55', img: require('../../assets/cat_grid_fruits.jpg') },
    { id: 2, name: 'Farm Fresh Milk Bottle', unit: '1L', price: '₹68', oldPrice: '₹75', img: require('../../assets/cat_grid_dairy.jpg') },
    { id: 3, name: 'Crunchy Potato Chips', unit: '175g', price: '₹45', oldPrice: '₹50', img: require('../../assets/cat_grid_snacks.jpg') },
    { id: 4, name: 'Premium Basmati Rice', unit: '1kg', price: '₹110', oldPrice: '₹135', img: require('../../assets/cat_grid_staples.jpg') },
    { id: 5, name: 'Ultra Wash Detergent', unit: '1kg', price: '₹140', oldPrice: '₹175', img: require('../../assets/cat_grid_household.jpg') },
    { id: 6, name: 'Gentle Care Shampoo', unit: '400ml', price: '₹220', oldPrice: '₹260', img: require('../../assets/cat_grid_personal.jpg') },
  ];

  return (
    <SafeAreaView style={styles.outerSafeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFDF9" />
      <View style={styles.screenContainer}>
        <View style={styles.mobileCanvas}>

          {/* TOP HEADER */}
          <View style={styles.headerBar}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#123C24" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M19 12H5" />
                <Path d="M12 19l-7-7 7-7" />
              </Svg>
            </TouchableOpacity>
            <Text style={styles.headerTitle} numberOfLines={1}>{categoryName}</Text>
            <TouchableOpacity style={styles.cartIcon} activeOpacity={0.7} onPress={() => navigation.navigate('Categories')}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#123C24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <Path d="M3 6h18" />
                <Path d="M16 10a4 4 0 0 1-8 0" />
              </Svg>
              <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
            </TouchableOpacity>
          </View>

          {/* SEARCH */}
          <View style={styles.searchBox}>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <Circle cx={11} cy={11} r={8} />
              <Path d="m21 21-4.35-4.35" />
            </Svg>
            <TextInput
              style={styles.searchInput}
              placeholder={`Search in ${categoryName}...`}
              placeholderTextColor="#9CA3AF"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {/* PRODUCT LIST */}
          <ScrollView contentContainerStyle={styles.productList} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>Available in {categoryName}</Text>
            <View style={styles.productGrid}>
              {sampleProducts.map((p) => (
                <View key={p.id} style={styles.productCard}>
                  <View style={styles.imageWrap}>
                    <Image source={p.img} style={styles.productImage} resizeMode="contain" />
                  </View>
                  <Text style={styles.productName} numberOfLines={2}>{p.name}</Text>
                  <Text style={styles.productUnit}>{p.unit}</Text>
                  <View style={styles.priceRow}>
                    <View>
                      <Text style={styles.priceText}>{p.price}</Text>
                      <Text style={styles.oldPriceText}>{p.oldPrice}</Text>
                    </View>
                    <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
                      <Text style={styles.addBtnText}>+ ADD</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerSafeArea: { flex: 1, backgroundColor: '#FAFDF9' },
  screenContainer: { flex: 1, backgroundColor: '#FAFDF9', alignItems: 'center' },
  mobileCanvas: { width: '100%', maxWidth: 480, flex: 1, backgroundColor: '#FAFDF9' },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  cartIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { fontSize: 9, fontWeight: '700', color: '#FFFFFF' },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 14,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 13, color: '#1E293B', outlineStyle: 'none' },
  productList: { paddingHorizontal: 16, paddingBottom: 40 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#64748B', marginBottom: 12 },
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  productCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  imageWrap: { width: '100%', height: 90, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  productImage: { width: '100%', height: '100%' },
  productName: { fontSize: 12, fontWeight: '700', color: '#0F172A', minHeight: 32 },
  productUnit: { fontSize: 10, color: '#64748B', marginTop: 2, marginBottom: 6 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceText: { fontSize: 13, fontWeight: '800', color: '#16A34A' },
  oldPriceText: { fontSize: 9.5, color: '#94A3B8', textDecorationLine: 'line-through' },
  addBtn: {
    backgroundColor: '#EAF7EE',
    borderWidth: 1,
    borderColor: '#16A34A',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  addBtnText: { fontSize: 10.5, fontWeight: '700', color: '#16A34A' },
});
