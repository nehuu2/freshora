import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Svg, { Path, Rect, Circle, Line } from 'react-native-svg';
import { styles } from './FruitsVegetablesView.styles';

export default function FruitsVegetablesView({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [cartCount, setCartCount] = useState(3);
  const [addedItems, setAddedItems] = useState({});

  // 1. FILTER CATEGORIES
  const filterCategories = [
    {
      id: 'all',
      name: 'All',
      icon: require('../../assets/cat_icon_all.png'),
    },
    {
      id: 'fruits',
      name: 'Fresh Fruits',
      icon: require('../../assets/cat_filter_fruits.png'),
    },
    {
      id: 'vegetables',
      name: 'Fresh Vegetables',
      icon: require('../../assets/cat_filter_veg.png'),
    },
    {
      id: 'leafy',
      name: 'Leafy Greens',
      icon: require('../../assets/cat_filter_leafy.png'),
    },
    {
      id: 'exotic',
      name: 'Exotic Fruits',
      icon: require('../../assets/cat_filter_exotic.png'),
    },
    {
      id: 'herbs',
      name: 'Herbs & Seasonings',
      icon: require('../../assets/cat_filter_herbs.png'),
    },
    {
      id: 'organic',
      name: 'Organic',
      icon: require('../../assets/cat_filter_organic.png'),
    },
  ];

  // 2. POPULAR PRODUCTS DATA (8 PRODUCTS)
  const allProducts = [
    {
      id: 'p1',
      name: 'Apple',
      variety: '(Shimla)',
      unit: '1 kg',
      price: 135,
      oldPrice: 150,
      discount: '10% OFF',
      category: 'Fresh Fruits',
      isOrganic: true,
      image: require('../../assets/prod_apple_shimla.png'),
    },
    {
      id: 'p2',
      name: 'Banana',
      variety: '(Robusta)',
      unit: '1 kg',
      price: 48,
      oldPrice: null,
      discount: null,
      category: 'Fresh Fruits',
      isOrganic: false,
      image: require('../../assets/prod_banana_robusta.png'),
    },
    {
      id: 'p3',
      name: 'Tomato',
      variety: '(Local)',
      unit: '1 kg',
      price: 32,
      oldPrice: null,
      discount: null,
      category: 'Fresh Vegetables',
      isOrganic: true,
      image: require('../../assets/prod_tomato_local.png'),
    },
    {
      id: 'p4',
      name: 'Potato',
      variety: '',
      unit: '1 kg',
      price: 22,
      oldPrice: 25,
      discount: '12% OFF',
      category: 'Fresh Vegetables',
      isOrganic: false,
      image: require('../../assets/prod_potato_fresh.png'),
    },
    {
      id: 'p5',
      name: 'Onion',
      variety: '',
      unit: '1 kg',
      price: 28,
      oldPrice: null,
      discount: null,
      category: 'Fresh Vegetables',
      isOrganic: false,
      image: require('../../assets/prod_onion_red.png'),
    },
    {
      id: 'p6',
      name: 'Carrot',
      variety: '',
      unit: '1 kg',
      price: 36,
      oldPrice: 40,
      discount: '10% OFF',
      category: 'Fresh Vegetables',
      isOrganic: true,
      image: require('../../assets/prod_carrot_fresh.png'),
    },
    {
      id: 'p7',
      name: 'Capsicum',
      variety: '(Mix)',
      unit: '500 g',
      price: 45,
      oldPrice: null,
      discount: null,
      category: 'Fresh Vegetables',
      isOrganic: false,
      image: require('../../assets/prod_capsicum_mix.png'),
    },
    {
      id: 'p8',
      name: 'Broccoli',
      variety: '',
      unit: '250 g',
      price: 60,
      oldPrice: null,
      discount: null,
      category: 'Fresh Vegetables',
      isOrganic: true,
      image: require('../../assets/prod_broccoli_fresh.png'),
    },
  ];

  // 3. YOU MAY ALSO LIKE DATA
  const recommendedProducts = [
    {
      id: 'r1',
      name: 'Mango',
      variety: '(Safeda)',
      unit: '1 kg',
      price: 90,
      oldPrice: 110,
      discount: '18% OFF',
      image: require('../../assets/prod_mango.png'),
    },
    {
      id: 'r2',
      name: 'Watermelon',
      variety: '(Kiran)',
      unit: '1 pc (2-3kg)',
      price: 55,
      oldPrice: null,
      discount: null,
      image: require('../../assets/prod_watermelon.png'),
    },
    {
      id: 'r3',
      name: 'Sweet Corn',
      variety: '',
      unit: '2 pcs',
      price: 35,
      oldPrice: 45,
      discount: '22% OFF',
      image: require('../../assets/prod_sweetcorn.png'),
    },
    {
      id: 'r4',
      name: 'Fresh Milk',
      variety: '(Cow)',
      unit: '1 L',
      price: 68,
      oldPrice: 75,
      discount: '9% OFF',
      image: require('../../assets/prod_milk.png'),
    },
  ];

  // Filter products based on active category chip and search query
  const displayedProducts = allProducts.filter((product) => {
    // Filter matching
    let matchesCategory = true;
    if (selectedFilter === 'Fresh Fruits') {
      matchesCategory = product.category === 'Fresh Fruits';
    } else if (selectedFilter === 'Fresh Vegetables') {
      matchesCategory = product.category === 'Fresh Vegetables';
    } else if (selectedFilter === 'Leafy Greens') {
      matchesCategory = product.name === 'Broccoli' || product.name === 'Capsicum';
    } else if (selectedFilter === 'Exotic Fruits') {
      matchesCategory = product.name === 'Apple' || product.name === 'Banana';
    } else if (selectedFilter === 'Herbs & Seasonings') {
      matchesCategory = product.name === 'Onion' || product.name === 'Capsicum';
    } else if (selectedFilter === 'Organic') {
      matchesCategory = product.isOrganic;
    }

    // Search query matching
    let matchesSearch = true;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      matchesSearch =
        product.name.toLowerCase().includes(q) ||
        product.variety.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q);
    }

    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (productId) => {
    setCartCount((prev) => prev + 1);
    setAddedItems((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const handleCartPress = () => {
    if (navigation && typeof navigation.navigate === 'function') {
      navigation.navigate('CategoryProducts', { categoryName: 'Cart' });
    }
  };

  const handleBackPress = () => {
    if (navigation && typeof navigation.goBack === 'function') {
      navigation.goBack();
    }
  };

  const handleNavTab = (tab) => {
    if (!navigation || typeof navigation.navigate !== 'function') return;
    if (tab === 'Home') {
      navigation.navigate('Onboarding7');
    } else if (tab === 'Categories') {
      navigation.navigate('Categories');
    } else if (tab === 'Orders') {
      navigation.navigate('CategoryProducts', { categoryName: 'My Orders' });
    } else if (tab === 'Offers') {
      navigation.navigate('CategoryProducts', { categoryName: 'Special Offers' });
    } else if (tab === 'Profile') {
      navigation.navigate('Users');
    }
  };

  return (
    <SafeAreaView style={styles.outerSafeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFDF9" hidden={false} />
      <View style={styles.screenContainer}>
        <View style={styles.mobileCanvas}>

          {/* MAIN SCROLLABLE CONTENT AREA */}
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={true}
          >

            {/* A. TOP HEADER BAR */}
            <View style={styles.topHeaderBar}>
              {/* LOCATION SELECTOR (LEFT) */}
              <TouchableOpacity
                style={styles.locationSelector}
                activeOpacity={0.7}
              >
                <View style={styles.locationTitleRow}>
                  {/* GREEN PIN ICON */}
                  <Svg width={18} height={18} viewBox="0 0 24 24" fill="#16A34A">
                    <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </Svg>
                  <Text style={styles.deliveringToText}>Delivering to</Text>
                  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#123C24" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M6 9l6 6 6-6" />
                  </Svg>
                </View>
                <Text style={styles.locationAddressText}>Sector 67, Gurugram 122001</Text>
              </TouchableOpacity>

              {/* RIGHT ACTION ICONS (BELL & CART) */}
              <View style={styles.rightActionRow}>
                {/* NOTIFICATION BELL */}
                <TouchableOpacity
                  style={styles.iconButton}
                  activeOpacity={0.7}
                  accessibilityLabel="Notifications"
                >
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#123C24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <Path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </Svg>
                  <View style={styles.notificationDot} />
                </TouchableOpacity>

                {/* CART ICON */}
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={handleCartPress}
                  activeOpacity={0.7}
                  accessibilityLabel="Cart"
                >
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#123C24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <Path d="M3 6h18" />
                    <Path d="M16 10a4 4 0 0 1-8 0" />
                  </Svg>
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cartCount}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* B. SEARCH BAR */}
            <View style={styles.searchBarContainer}>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <Circle cx={11} cy={11} r={8} />
                <Path d="m21 21-4.35-4.35" />
              </Svg>
              <TextInput
                style={styles.searchInput}
                placeholder="Search in Fruits & Vegetables..."
                placeholderTextColor="#94A3B8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity style={styles.qrButton} activeOpacity={0.7}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M3 7V5a2 2 0 0 1 2-2h2" />
                  <Path d="M17 3h2a2 2 0 0 1 2 2v2" />
                  <Path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                  <Path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                  <Rect x="7" y="7" width="3" height="3" />
                  <Rect x="14" y="7" width="3" height="3" />
                  <Rect x="7" y="14" width="3" height="3" />
                  <Rect x="14" y="14" width="3" height="3" />
                </Svg>
              </TouchableOpacity>
            </View>

            {/* C. BACK BUTTON + CATEGORY TITLE + PROMO BADGE */}
            <View style={styles.categoryTitleSection}>
              <View style={styles.titleLeftCol}>
                <TouchableOpacity
                  style={styles.backBtn}
                  onPress={handleBackPress}
                  activeOpacity={0.7}
                >
                  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#0F2E1E" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M15 18l-6-6 6-6" />
                  </Svg>
                </TouchableOpacity>
                <View style={styles.titleTexts}>
                  <Text style={styles.categoryMainTitle}>Fruits & Vegetables</Text>
                  <Text style={styles.categorySubtitle}>Fresh, farm-fresh and full of nutrition.</Text>
                </View>
              </View>

              {/* PROMO PILL */}
              <View style={styles.promoPill}>
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="#16A34A">
                  <Path d="M17.5 3C11.5 3 7 7.5 7 13.5c0 2.2.7 4.2 1.8 5.8L3 21l1.7-5.8C3.7 13.6 3 11.4 3 9c0-6 4.5-10.5 10.5-10.5h4z" />
                </Svg>
                <Text style={styles.promoText}>Eat Fresh{'\n'}Stay Healthy</Text>
                <Svg width={12} height={12} viewBox="0 0 24 24" fill="#16A34A">
                  <Path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </Svg>
              </View>
            </View>

            {/* D. HORIZONTALLY SCROLLABLE CATEGORY FILTER ROW */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterScroll}
              contentContainerStyle={styles.filterScrollContent}
            >
              {filterCategories.map((item) => {
                const isActive = selectedFilter === item.name;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.filterItem, isActive && styles.filterItemActive]}
                    onPress={() => {
                      if (item.name === 'Fresh Vegetables' && navigation && typeof navigation.navigate === 'function') {
                        navigation.navigate('FreshVegetables');
                      } else {
                        setSelectedFilter(item.name);
                      }
                    }}
                    activeOpacity={0.7}
                  >
                    <View style={styles.filterIconWrap}>
                      {item.id === 'all' ? (
                        <Svg width={20} height={20} viewBox="0 0 24 24" fill="#16A34A">
                          <Rect x="3" y="3" width="7" height="7" rx="2" />
                          <Rect x="14" y="3" width="7" height="7" rx="2" />
                          <Rect x="3" y="14" width="7" height="7" rx="2" />
                          <Rect x="14" y="14" width="7" height="7" rx="2" />
                        </Svg>
                      ) : (
                        <Image source={item.icon} style={styles.filterIconImage} resizeMode="contain" />
                      )}
                    </View>
                    <Text style={[styles.filterLabel, isActive && styles.filterLabelActive]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* E. HERO BANNER ("Freshness Picked for You") */}
            <View style={styles.heroBannerContainer}>
              <Image
                source={require('../../assets/banner_fruits_veg_hero.png')}
                style={styles.heroBannerBgImage}
                resizeMode="cover"
              />
              <View style={styles.heroBannerContent}>
                <Text style={styles.heroBannerTitle}>Freshness{'\n'}Picked for You</Text>
                <Text style={styles.heroBannerSub}>
                  Handpicked fruits & vegetables{'\n'}for a healthier tomorrow.
                </Text>
                <TouchableOpacity
                  style={styles.heroBannerBtn}
                  onPress={() => setSelectedFilter('Fresh Fruits')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.heroBannerBtnText}>Shop Fresh →</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* F. POPULAR PRODUCTS SECTION HEADER */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Popular Products</Text>
              <TouchableOpacity
                style={styles.seeAllButton}
                onPress={() => setSelectedFilter('All')}
                activeOpacity={0.7}
              >
                <Text style={styles.seeAllText}>See All →</Text>
              </TouchableOpacity>
            </View>

            {/* G. 4-COLUMN PRODUCT GRID */}
            <View style={styles.productGrid}>
              {displayedProducts.map((product) => {
                const quantityAdded = addedItems[product.id] || 0;
                return (
                  <View key={product.id} style={styles.productCard}>
                    {/* DISCOUNT BADGE */}
                    {product.discount ? (
                      <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>{product.discount}</Text>
                      </View>
                    ) : null}

                    {/* PRODUCT IMAGE */}
                    <View style={styles.productImageWrap}>
                      <Image
                        source={product.image}
                        style={styles.productImage}
                        resizeMode="contain"
                      />
                    </View>

                    {/* PRODUCT INFO */}
                    <View style={styles.productInfo}>
                      <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
                      <Text style={styles.productVariety} numberOfLines={1}>{product.variety || ' '}</Text>
                      <Text style={styles.productUnit}>{product.unit}</Text>
                      <View style={styles.priceRow}>
                        <Text style={styles.productPrice}>₹{product.price}</Text>
                        {product.oldPrice ? (
                          <Text style={styles.productOldPrice}>₹{product.oldPrice}</Text>
                        ) : null}
                      </View>
                    </View>

                    {/* ADD BUTTON */}
                    <TouchableOpacity
                      style={[styles.addBtn, quantityAdded > 0 && styles.addBtnAdded]}
                      onPress={() => handleAddToCart(product.id)}
                      activeOpacity={0.8}
                    >
                      <Svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                        <Path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <Path d="M3 6h18" />
                        <Path d="M16 10a4 4 0 0 1-8 0" />
                      </Svg>
                      <Text style={styles.addBtnText}>
                        {quantityAdded > 0 ? `Add (${quantityAdded})` : 'Add'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>

            {/* H. SECOND BANNER ("Go Organic Go Healthy") */}
            <View style={styles.organicBannerContainer}>
              <Image
                source={require('../../assets/banner_organic_veg_hero.png')}
                style={styles.organicBannerBgImage}
                resizeMode="cover"
              />
              <View style={styles.organicBannerContent}>
                <Text style={styles.organicBannerTitle}>Go Organic{'\n'}Go Healthy</Text>
                <Text style={styles.organicBannerSub}>
                  Naturally grown. Better for you.
                </Text>
                <TouchableOpacity
                  style={styles.organicBannerBtn}
                  onPress={() => setSelectedFilter('Organic')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.organicBannerBtnText}>Explore Organic →</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* I. YOU MAY ALSO LIKE SECTION */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>You May Also Like</Text>
              <TouchableOpacity
                style={styles.seeAllButton}
                onPress={() => navigation.navigate('Categories')}
                activeOpacity={0.7}
              >
                <Text style={styles.seeAllText}>See All →</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.productGrid}>
              {recommendedProducts.map((product) => {
                const quantityAdded = addedItems[product.id] || 0;
                return (
                  <View key={product.id} style={styles.productCard}>
                    {product.discount ? (
                      <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>{product.discount}</Text>
                      </View>
                    ) : null}

                    <View style={styles.productImageWrap}>
                      <Image
                        source={product.image}
                        style={styles.productImage}
                        resizeMode="contain"
                      />
                    </View>

                    <View style={styles.productInfo}>
                      <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
                      <Text style={styles.productVariety} numberOfLines={1}>{product.variety || ' '}</Text>
                      <Text style={styles.productUnit}>{product.unit}</Text>
                      <View style={styles.priceRow}>
                        <Text style={styles.productPrice}>₹{product.price}</Text>
                        {product.oldPrice ? (
                          <Text style={styles.productOldPrice}>₹{product.oldPrice}</Text>
                        ) : null}
                      </View>
                    </View>

                    <TouchableOpacity
                      style={[styles.addBtn, quantityAdded > 0 && styles.addBtnAdded]}
                      onPress={() => handleAddToCart(product.id)}
                      activeOpacity={0.8}
                    >
                      <Svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                        <Path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <Path d="M3 6h18" />
                        <Path d="M16 10a4 4 0 0 1-8 0" />
                      </Svg>
                      <Text style={styles.addBtnText}>
                        {quantityAdded > 0 ? `Add (${quantityAdded})` : 'Add'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>

          </ScrollView>

          {/* J. FIXED BOTTOM NAVIGATION BAR */}
          <View style={styles.bottomNavContainer}>
            <View style={styles.bottomNavCanvas}>
              {/* 1. HOME */}
              <TouchableOpacity
                style={styles.navTab}
                onPress={() => handleNavTab('Home')}
                activeOpacity={0.7}
              >
                <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <Path d="M9 22V12h6v10" />
                </Svg>
                <Text style={styles.navLabel}>Home</Text>
              </TouchableOpacity>

              {/* 2. CATEGORIES (ACTIVE) */}
              <TouchableOpacity
                style={styles.navTab}
                onPress={() => handleNavTab('Categories')}
                activeOpacity={0.7}
              >
                <Svg width={22} height={22} viewBox="0 0 24 24" fill="#16A34A">
                  <Rect x="3" y="3" width="7" height="7" rx="2" />
                  <Rect x="14" y="3" width="7" height="7" rx="2" />
                  <Rect x="3" y="14" width="7" height="7" rx="2" />
                  <Rect x="14" y="14" width="7" height="7" rx="2" />
                </Svg>
                <Text style={[styles.navLabel, styles.navLabelActive]}>Categories</Text>
              </TouchableOpacity>

              {/* 3. ORDERS */}
              <TouchableOpacity
                style={styles.navTab}
                onPress={() => handleNavTab('Orders')}
                activeOpacity={0.7}
              >
                <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <Path d="M3 6h18" />
                  <Path d="M16 10a4 4 0 0 1-8 0" />
                </Svg>
                <Text style={styles.navLabel}>Orders</Text>
              </TouchableOpacity>

              {/* 4. OFFERS */}
              <TouchableOpacity
                style={styles.navTab}
                onPress={() => handleNavTab('Offers')}
                activeOpacity={0.7}
              >
                <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <Line x1="7" y1="7" x2="7.01" y2="7" />
                </Svg>
                <View style={styles.offerBadge} />
                <Text style={styles.navLabel}>Offers</Text>
              </TouchableOpacity>

              {/* 5. PROFILE */}
              <TouchableOpacity
                style={styles.navTab}
                onPress={() => handleNavTab('Profile')}
                activeOpacity={0.7}
              >
                <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <Circle cx="12" cy="7" r="4" />
                </Svg>
                <Text style={styles.navLabel}>Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}
