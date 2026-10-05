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
import { styles } from './FreshVegetablesView.styles';

export default function FreshVegetablesView({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isOrganicOnly, setIsOrganicOnly] = useState(false);
  const [sortBy, setSortBy] = useState('default'); // 'default', 'price_asc', 'price_desc'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [cartCount, setCartCount] = useState(3);
  const [addedItems, setAddedItems] = useState({});
  const [wishlist, setWishlist] = useState({});

  // 1. FILTER CATEGORIES (MATCHING SCREEN 3)
  const filterCategories = [
    {
      id: 'all',
      name: 'All',
      filterKey: 'All',
      icon: null,
    },
    {
      id: 'leafy',
      name: 'Leafy\nGreens',
      filterKey: 'Leafy Greens',
      icon: require('../../assets/icon_filter_leafy.png'),
    },
    {
      id: 'roots',
      name: 'Roots &\nTubers',
      filterKey: 'Roots & Tubers',
      icon: require('../../assets/icon_filter_roots.png'),
    },
    {
      id: 'gourds',
      name: 'Gourds',
      filterKey: 'Gourds',
      icon: require('../../assets/icon_filter_gourds.png'),
    },
    {
      id: 'beans',
      name: 'Beans &\nPeas',
      filterKey: 'Beans & Peas',
      icon: require('../../assets/icon_filter_beans.png'),
    },
    {
      id: 'cabbage',
      name: 'Cabbage\n& Cauliflower',
      filterKey: 'Cabbage & Cauliflower',
      icon: require('../../assets/icon_filter_cabbage.png'),
    },
    {
      id: 'herbs',
      name: 'Herbs &\nSeasonings',
      filterKey: 'Herbs & Seasonings',
      icon: require('../../assets/icon_filter_herbs_veg.png'),
    },
  ];

  // 2. 12 VEGETABLE PRODUCTS DATA (EXACT MATCH WITH SCREEN 3)
  const allVegetables = [
    {
      id: 'v1',
      name: 'Tomato',
      unit: '1 kg',
      price: 32,
      oldPrice: 36,
      discount: '12% OFF',
      category: 'Roots & Tubers',
      isOrganic: true,
      image: require('../../assets/veg_tomato.png'),
    },
    {
      id: 'v2',
      name: 'Onion',
      unit: '1 kg',
      price: 28,
      oldPrice: null,
      discount: null,
      category: 'Roots & Tubers',
      isOrganic: false,
      image: require('../../assets/veg_onion.png'),
    },
    {
      id: 'v3',
      name: 'Potato',
      unit: '1 kg',
      price: 22,
      oldPrice: 25,
      discount: '12% OFF',
      category: 'Roots & Tubers',
      isOrganic: false,
      image: require('../../assets/veg_potato.png'),
    },
    {
      id: 'v4',
      name: 'Carrot',
      unit: '1 kg',
      price: 36,
      oldPrice: 40,
      discount: '10% OFF',
      category: 'Roots & Tubers',
      isOrganic: true,
      image: require('../../assets/veg_carrot.png'),
    },
    {
      id: 'v5',
      name: 'Capsicum (Mix)',
      unit: '500 g',
      price: 45,
      oldPrice: null,
      discount: null,
      category: 'Herbs & Seasonings',
      isOrganic: false,
      image: require('../../assets/veg_capsicum.png'),
    },
    {
      id: 'v6',
      name: 'Broccoli',
      unit: '250 g',
      price: 60,
      oldPrice: null,
      discount: null,
      category: 'Cabbage & Cauliflower',
      isOrganic: true,
      image: require('../../assets/veg_broccoli.png'),
    },
    {
      id: 'v7',
      name: 'Cauliflower',
      unit: '1 pc (approx. 500 g)',
      price: 50,
      oldPrice: null,
      discount: null,
      category: 'Cabbage & Cauliflower',
      isOrganic: false,
      image: require('../../assets/veg_cauliflower.png'),
    },
    {
      id: 'v8',
      name: 'Cucumber',
      unit: '1 kg',
      price: 28,
      oldPrice: null,
      discount: null,
      category: 'Gourds',
      isOrganic: false,
      image: require('../../assets/veg_cucumber.png'),
    },
    {
      id: 'v9',
      name: 'Brinjal',
      unit: '1 kg',
      price: 34,
      oldPrice: null,
      discount: null,
      category: 'Gourds',
      isOrganic: false,
      image: require('../../assets/veg_brinjal.png'),
    },
    {
      id: 'v10',
      name: 'Lady Finger',
      unit: '250 g',
      price: 32,
      oldPrice: null,
      discount: null,
      category: 'Beans & Peas',
      isOrganic: false,
      image: require('../../assets/veg_ladyfinger.png'),
    },
    {
      id: 'v11',
      name: 'Green Beans',
      unit: '250 g',
      price: 40,
      oldPrice: null,
      discount: null,
      category: 'Beans & Peas',
      isOrganic: false,
      image: require('../../assets/veg_greenbeans.png'),
    },
    {
      id: 'v12',
      name: 'Spinach',
      unit: '250 g',
      price: 24,
      oldPrice: null,
      discount: null,
      category: 'Leafy Greens',
      isOrganic: true,
      image: require('../../assets/veg_spinach.png'),
    },
  ];

  // FILTER & SORT LOGIC
  const displayedProducts = allVegetables
    .filter((product) => {
      // 1. Category filter
      let matchesCategory = true;
      if (selectedFilter === 'Leafy Greens') {
        matchesCategory = product.category === 'Leafy Greens' || product.name === 'Spinach' || product.name === 'Broccoli';
      } else if (selectedFilter === 'Roots & Tubers') {
        matchesCategory = product.category === 'Roots & Tubers';
      } else if (selectedFilter === 'Gourds') {
        matchesCategory = product.category === 'Gourds';
      } else if (selectedFilter === 'Beans & Peas') {
        matchesCategory = product.category === 'Beans & Peas';
      } else if (selectedFilter === 'Cabbage & Cauliflower') {
        matchesCategory = product.category === 'Cabbage & Cauliflower' || product.name === 'Cauliflower' || product.name === 'Broccoli';
      } else if (selectedFilter === 'Herbs & Seasonings') {
        matchesCategory = product.category === 'Herbs & Seasonings' || product.name === 'Capsicum (Mix)' || product.name === 'Onion';
      }

      // 2. Organic filter
      let matchesOrganic = true;
      if (isOrganicOnly) {
        matchesOrganic = product.isOrganic;
      }

      // 3. Search query
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        matchesSearch =
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q);
      }

      return matchesCategory && matchesOrganic && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price_asc') {
        return a.price - b.price;
      }
      if (sortBy === 'price_desc') {
        return b.price - a.price;
      }
      return 0;
    });

  const handleAddToCart = (productId) => {
    setCartCount((prev) => prev + 1);
    setAddedItems((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleToggleOrganic = () => {
    setIsOrganicOnly((prev) => !prev);
  };

  const handleToggleSortPrice = () => {
    if (sortBy === 'default') {
      setSortBy('price_asc');
    } else if (sortBy === 'price_asc') {
      setSortBy('price_desc');
    } else {
      setSortBy('default');
    }
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

          {/* MAIN SCROLLABLE CONTENT */}
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={true}
          >

            {/* A. TOP HEADER BAR */}
            <View style={styles.topHeaderBar}>
              {/* LOCATION SELECTOR */}
              <TouchableOpacity
                style={styles.locationSelector}
                activeOpacity={0.7}
              >
                <View style={styles.locationTitleRow}>
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

              {/* ACTION ICONS (BELL & CART) */}
              <View style={styles.rightActionRow}>
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
                placeholder="Search in Fresh Vegetables..."
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

            {/* C. BACK BUTTON + TITLE + PROMO PILL */}
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
                  <Text style={styles.categoryMainTitle}>Fresh Vegetables</Text>
                  <Text style={styles.categorySubtitle}>Farm fresh. Naturally nutritious.</Text>
                </View>
              </View>

              {/* PROMO PILL */}
              <View style={styles.promoPill}>
                <Svg width={14} height={14} viewBox="0 0 24 24" fill="#16A34A">
                  <Path d="M17.5 3C11.5 3 7 7.5 7 13.5c0 2.2.7 4.2 1.8 5.8L3 21l1.7-5.8C3.7 13.6 3 11.4 3 9c0-6 4.5-10.5 10.5-10.5h4z" />
                </Svg>
                <Text style={styles.promoText}>Good Food{'\n'}Happier You</Text>
                <Svg width={11} height={11} viewBox="0 0 24 24" fill="#16A34A">
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
                const targetKey = item.filterKey || item.name;
                const isActive = selectedFilter === targetKey;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.filterItem, isActive && styles.filterItemActive]}
                    onPress={() => setSelectedFilter(targetKey)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.filterIconWrap}>
                      {item.id === 'all' ? (
                        <View style={styles.allIconCircle}>
                          <Svg width={28} height={28} viewBox="0 0 24 24" fill="#16A34A">
                            <Rect x="3" y="3" width="7" height="7" rx="2" />
                            <Rect x="14" y="3" width="7" height="7" rx="2" />
                            <Rect x="3" y="14" width="7" height="7" rx="2" />
                            <Rect x="14" y="14" width="7" height="7" rx="2" />
                          </Svg>
                        </View>
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

            {/* E. HERO BANNER */}
            <View style={styles.heroBannerContainer}>
              <Image
                source={require('../../assets/banner_fresh_veg_local_farms.png')}
                style={styles.heroBannerBgImage}
                resizeMode="cover"
              />
              <View style={styles.heroBannerContent}>
                <Text style={styles.heroBannerTitle}>Fresh from{'\n'}Local Farms</Text>
                <Text style={styles.heroBannerSub}>
                  Pure. Natural. Better for you.
                </Text>
                <TouchableOpacity
                  style={styles.heroBannerBtn}
                  onPress={() => setSelectedFilter('All')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.heroBannerBtnText}>Shop Fresh →</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* F. FILTER / SORT ROW */}
            <View style={styles.filterSortStrip}>
              {/* FILTERS */}
              <TouchableOpacity
                style={styles.filterPillBtn}
                onPress={() => {
                  setSelectedFilter('All');
                  setIsOrganicOnly(false);
                  setSortBy('default');
                }}
                activeOpacity={0.7}
              >
                <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
                </Svg>
                <Text style={styles.filterPillText}>Filters</Text>
              </TouchableOpacity>

              {/* PRICE */}
              <TouchableOpacity
                style={[styles.filterPillBtn, (sortBy === 'price_asc' || sortBy === 'price_desc') && styles.filterPillBtnActive]}
                onPress={handleToggleSortPrice}
                activeOpacity={0.7}
              >
                <Text style={[styles.filterPillText, (sortBy === 'price_asc' || sortBy === 'price_desc') && styles.filterPillTextActive]}>
                  Price {sortBy === 'price_asc' ? '↑' : sortBy === 'price_desc' ? '↓' : '▾'}
                </Text>
              </TouchableOpacity>

              {/* BRAND */}
              <TouchableOpacity
                style={styles.filterPillBtn}
                activeOpacity={0.7}
              >
                <Text style={styles.filterPillText}>Brand ▾</Text>
              </TouchableOpacity>

              {/* ORGANIC */}
              <TouchableOpacity
                style={[styles.filterPillBtn, isOrganicOnly && styles.filterPillBtnActive]}
                onPress={handleToggleOrganic}
                activeOpacity={0.7}
              >
                <Svg width={12} height={12} viewBox="0 0 24 24" fill={isOrganicOnly ? '#16A34A' : 'none'} stroke={isOrganicOnly ? '#16A34A' : '#475569'} strokeWidth={2}>
                  <Path d="M17.5 3C11.5 3 7 7.5 7 13.5c0 2.2.7 4.2 1.8 5.8L3 21l1.7-5.8C3.7 13.6 3 11.4 3 9c0-6 4.5-10.5 10.5-10.5h4z" />
                </Svg>
                <Text style={[styles.filterPillText, isOrganicOnly && styles.filterPillTextActive]}>Organic</Text>
              </TouchableOpacity>

              {/* SORT BY */}
              <TouchableOpacity
                style={[styles.filterPillBtn, sortBy !== 'default' && styles.filterPillBtnActive]}
                onPress={handleToggleSortPrice}
                activeOpacity={0.7}
              >
                <Text style={[styles.filterPillText, sortBy !== 'default' && styles.filterPillTextActive]}>
                  Sort By ▾
                </Text>
              </TouchableOpacity>
            </View>

            {/* G. PRODUCT COUNT & VIEW TOGGLE */}
            <View style={styles.countViewRow}>
              <Text style={styles.productCountText}>
                {selectedFilter === 'All' && !isOrganicOnly && !searchQuery.trim()
                  ? '124 Products'
                  : `${displayedProducts.length} Products`}
              </Text>

              <View style={styles.viewToggleRow}>
                <Text style={styles.viewToggleLabel}>View:</Text>
                {/* 4-GRID ICON */}
                <TouchableOpacity
                  style={[styles.viewIconBtn, viewMode === 'grid' && styles.viewIconBtnActive]}
                  onPress={() => setViewMode('grid')}
                  activeOpacity={0.7}
                >
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill={viewMode === 'grid' ? '#16A34A' : '#94A3B8'}>
                    <Rect x="2" y="2" width="4" height="4" rx="1" />
                    <Rect x="8" y="2" width="4" height="4" rx="1" />
                    <Rect x="14" y="2" width="4" height="4" rx="1" />
                    <Rect x="20" y="2" width="4" height="4" rx="1" />
                    <Rect x="2" y="8" width="4" height="4" rx="1" />
                    <Rect x="8" y="8" width="4" height="4" rx="1" />
                    <Rect x="14" y="8" width="4" height="4" rx="1" />
                    <Rect x="20" y="8" width="4" height="4" rx="1" />
                    <Rect x="2" y="14" width="4" height="4" rx="1" />
                    <Rect x="8" y="14" width="4" height="4" rx="1" />
                    <Rect x="14" y="14" width="4" height="4" rx="1" />
                    <Rect x="20" y="14" width="4" height="4" rx="1" />
                  </Svg>
                </TouchableOpacity>

                {/* LIST ICON */}
                <TouchableOpacity
                  style={[styles.viewIconBtn, viewMode === 'list' && styles.viewIconBtnActive]}
                  onPress={() => setViewMode('list')}
                  activeOpacity={0.7}
                >
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={viewMode === 'list' ? '#16A34A' : '#94A3B8'} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <Line x1="8" y1="6" x2="21" y2="6" />
                    <Line x1="8" y1="12" x2="21" y2="12" />
                    <Line x1="8" y1="18" x2="21" y2="18" />
                    <Line x1="3" y1="6" x2="3.01" y2="6" />
                    <Line x1="3" y1="12" x2="3.01" y2="12" />
                    <Line x1="3" y1="18" x2="3.01" y2="18" />
                  </Svg>
                </TouchableOpacity>
              </View>
            </View>

            {/* H. PRODUCTS: GRID VIEW (4 COLUMNS) OR LIST VIEW */}
            {viewMode === 'grid' ? (
              <View style={styles.gridContainer}>
                {displayedProducts.map((product) => {
                  const isWishlisted = !!wishlist[product.id];
                  const quantityAdded = addedItems[product.id] || 0;

                  return (
                    <View key={product.id} style={styles.productCard}>
                      {/* CARD TOP AREA WITH IMAGE & BADGES */}
                      <View style={styles.cardImageWrapper}>
                        {product.discount ? (
                          <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>{product.discount}</Text>
                          </View>
                        ) : null}

                        <TouchableOpacity
                          style={styles.wishlistBtn}
                          onPress={() => toggleWishlist(product.id)}
                          activeOpacity={0.7}
                        >
                          <Svg
                            width={13}
                            height={13}
                            viewBox="0 0 24 24"
                            fill={isWishlisted ? '#EF4444' : 'none'}
                            stroke={isWishlisted ? '#EF4444' : '#94A3B8'}
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </Svg>
                        </TouchableOpacity>

                        <Image
                          source={product.image}
                          style={styles.productImage}
                          resizeMode="contain"
                        />
                      </View>

                      {/* CARD DETAILS */}
                      <View style={styles.cardInfo}>
                        <Text style={styles.productName} numberOfLines={1}>
                          {product.name}
                        </Text>
                        <Text style={styles.productWeight}>{product.unit}</Text>

                        <View style={styles.priceRow}>
                          <Text style={styles.currentPrice}>₹{product.price}</Text>
                          {product.oldPrice ? (
                            <Text style={styles.oldPrice}>₹{product.oldPrice}</Text>
                          ) : null}
                        </View>
                      </View>

                      {/* ADD BUTTON */}
                      <TouchableOpacity
                        style={[styles.addBtn, quantityAdded > 0 && styles.addBtnAdded]}
                        onPress={() => handleAddToCart(product.id)}
                        activeOpacity={0.8}
                      >
                        <Svg width={9} height={9} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
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
            ) : (
              <View style={styles.listContainer}>
                {displayedProducts.map((product) => {
                  const quantityAdded = addedItems[product.id] || 0;

                  return (
                    <View key={product.id} style={styles.listCard}>
                      <View style={styles.listImageWrap}>
                        <Image
                          source={product.image}
                          style={styles.listImage}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={styles.listDetails}>
                        <Text style={styles.listName}>{product.name}</Text>
                        <Text style={styles.listWeight}>{product.unit}</Text>
                        <View style={styles.listPriceRow}>
                          <Text style={styles.listPrice}>₹{product.price}</Text>
                          {product.oldPrice ? (
                            <Text style={styles.listOldPrice}>₹{product.oldPrice}</Text>
                          ) : null}
                        </View>
                      </View>
                      <TouchableOpacity
                        style={[styles.listAddBtn, quantityAdded > 0 && styles.addBtnAdded]}
                        onPress={() => handleAddToCart(product.id)}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.listAddBtnText}>
                          {quantityAdded > 0 ? `Added (${quantityAdded})` : '+ Add'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            )}

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
