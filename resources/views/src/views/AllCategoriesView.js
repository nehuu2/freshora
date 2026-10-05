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
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { styles } from './AllCategoriesView.styles';

export default function AllCategoriesView({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const categoriesData = [
    {
      id: '1',
      name: 'Fruits & Vegetables',
      count: '500+ items',
      description: 'Fresh produce for a healthier you',
      bgColor: '#EDF7ED',
      borderColor: '#D6ECD7',
      image: require('../../assets/cat_grid_fruits.jpg'),
    },
    {
      id: '2',
      name: 'Dairy & Breakfast',
      count: '300+ items',
      description: 'Milk, cheese, eggs, cereals and more',
      bgColor: '#EBF5FB',
      borderColor: '#D6EAF8',
      image: require('../../assets/cat_grid_dairy.jpg'),
    },
    {
      id: '3',
      name: 'Snacks & Beverages',
      count: '400+ items',
      description: 'Chips, cookies, drinks and more',
      bgColor: '#FEF3E8',
      borderColor: '#FDE4CF',
      image: require('../../assets/cat_grid_snacks.jpg'),
    },
    {
      id: '4',
      name: 'Atta, Rice & Staples',
      count: '300+ items',
      description: 'Daily essentials for your kitchen',
      bgColor: '#FAF4EB',
      borderColor: '#F3E7D5',
      image: require('../../assets/cat_grid_staples.jpg'),
    },
    {
      id: '5',
      name: 'Household Essentials',
      count: '250+ items',
      description: 'Cleaning and home care products',
      bgColor: '#E8F4F8',
      borderColor: '#D3EBF2',
      image: require('../../assets/cat_grid_household.jpg'),
    },
    {
      id: '6',
      name: 'Personal Care',
      count: '300+ items',
      description: 'Beauty and hygiene essentials',
      bgColor: '#FDF2F4',
      borderColor: '#FADEE3',
      image: require('../../assets/cat_grid_personal.jpg'),
    },
    {
      id: '7',
      name: 'Baby Care',
      count: '200+ items',
      description: 'Gentle care for your little one',
      bgColor: '#E8F6F6',
      borderColor: '#D1EEEE',
      image: require('../../assets/cat_grid_baby.jpg'),
    },
    {
      id: '8',
      name: 'Pet Care',
      count: '150+ items',
      description: 'Food and accessories for your pets',
      bgColor: '#FFF8E7',
      borderColor: '#FDF0CA',
      image: require('../../assets/cat_grid_pet.jpg'),
    },
    {
      id: '9',
      name: 'Organic Products',
      count: '120+ items',
      description: 'Naturally good, always',
      bgColor: '#EDF7ED',
      borderColor: '#D6ECD7',
      image: require('../../assets/cat_feat_organic.jpg'),
    },
    {
      id: '10',
      name: 'Healthy Snacks',
      count: '100+ items',
      description: 'Nutritious choices for a better you',
      bgColor: '#FAF4EB',
      borderColor: '#F3E7D5',
      image: require('../../assets/cat_feat_snacks.png'),
    },
    {
      id: '11',
      name: 'Beverages',
      count: '180+ items',
      description: 'Juices, soft drinks, and more',
      bgColor: '#EBF5FB',
      borderColor: '#D6EAF8',
      image: require('../../assets/cat_feat_beverages.jpg'),
    },
    {
      id: '12',
      name: 'Cleaning Essentials',
      count: '100+ items',
      description: 'For a cleaner, greener home',
      bgColor: '#E8F4F8',
      borderColor: '#D3EBF2',
      image: require('../../assets/cat_feat_cleaning.jpg'),
    },
  ];

  const filteredCategories = categoriesData.filter((cat) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      cat.name.toLowerCase().includes(query) ||
      cat.description.toLowerCase().includes(query)
    );
  });

  const handleCategoryPress = (categoryName) => {
    if (navigation && typeof navigation.navigate === 'function') {
      if (categoryName === 'Fruits & Vegetables') {
        navigation.navigate('FruitsVegetables');
      } else {
        navigation.navigate('CategoryProducts', { categoryName });
      }
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
      navigation.navigate('Profile');
    }
  };

  return (
    <SafeAreaView style={styles.outerSafeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFDF9" hidden={false} />
      <View style={styles.screenContainer}>
        <View style={styles.mobileCanvas}>

          {/* MAIN SCROLLABLE AREA */}
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={true}
          >

            {/* A. TOP HEADER BAR */}
            <View style={styles.topHeaderBar}>
              {/* LOCATION SECTION (LEFT) */}
              <TouchableOpacity
                style={styles.locationSelector}
                activeOpacity={0.7}
              >
                <View style={styles.locationTitleRow}>
                  {/* GREEN LOCATION PIN */}
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
                  <View style={styles.notificationBadge} />
                </TouchableOpacity>

                {/* CART ICON WITH GREEN BADGE '3' */}
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => navigation && navigation.navigate && navigation.navigate('CategoryProducts', { categoryName: 'Cart' })}
                  activeOpacity={0.7}
                  accessibilityLabel="Cart"
                >
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#123C24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <Path d="M3 6h18" />
                    <Path d="M16 10a4 4 0 0 1-8 0" />
                  </Svg>
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>3</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* B. SEARCH BAR SECTION */}
            <View style={styles.searchSection}>
              <View style={styles.searchBarCard}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <Circle cx={11} cy={11} r={8} />
                  <Path d="m21 21-4.35-4.35" />
                </Svg>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search for products, categories and more..."
                  placeholderTextColor="#9CA3AF"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                <TouchableOpacity activeOpacity={0.7} accessibilityLabel="Scan QR">
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#123C24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M3 7V5a2 2 0 0 1 2-2h2" />
                    <Path d="M17 3h2a2 2 0 0 1 2 2v2" />
                    <Path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                    <Path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                    <Rect x={7} y={7} width={10} height={10} rx={1} />
                  </Svg>
                </TouchableOpacity>
              </View>
            </View>

            {/* C. PAGE TITLE & PROMOTIONAL CARD */}
            <View style={styles.titleSection}>
              <View style={styles.titleLeftCol}>
                <Text style={styles.mainHeadingText} numberOfLines={1}>All Categories</Text>
                <Text style={styles.subtitleText} numberOfLines={1}>Explore our wide range of products</Text>
              </View>

              {/* GOOD FOOD HAPPIER YOU PROMO PILL */}
              <View style={styles.goodFoodPill}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="#16A34A">
                  <Path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                </Svg>
                <View style={styles.pillTextCol}>
                  <Text style={styles.pillTopText}>Good Food</Text>
                  <View style={styles.pillBottomTextRow}>
                    <Text style={styles.pillBottomText}>Happier You </Text>
                    <Svg width={9} height={9} viewBox="0 0 24 24" fill="#15803D">
                      <Path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </Svg>
                  </View>
                </View>
              </View>
            </View>

            {/* D. VERTICALLY STACKED CATEGORY LIST (12 ROWS) */}
            <View style={styles.listContainer}>
              {filteredCategories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryRowCard,
                    { backgroundColor: cat.bgColor, borderColor: cat.borderColor },
                  ]}
                  onPress={() => handleCategoryPress(cat.name)}
                  activeOpacity={0.8}
                >
                  {/* LEFT CATEGORY IMAGE */}
                  <View style={styles.rowImageContainer}>
                    <Image
                      source={cat.image}
                      style={styles.rowProductImage}
                      resizeMode="contain"
                    />
                  </View>

                  {/* MIDDLE TEXT INFO */}
                  <View style={styles.rowTextCol}>
                    <Text style={styles.rowCategoryTitle}>{cat.name}</Text>
                    <Text style={styles.rowItemCountText}>{cat.count}</Text>
                    <Text style={styles.rowDescriptionText}>{cat.description}</Text>
                  </View>

                  {/* RIGHT ARROW CHEVRON */}
                  <View style={styles.rowArrowContainer}>
                    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M9 18l6-6-6-6" />
                    </Svg>
                  </View>
                </TouchableOpacity>
              ))}

              {filteredCategories.length === 0 && (
                <View style={styles.noResultsContainer}>
                  <Text style={styles.noResultsText}>No categories found for "{searchQuery}"</Text>
                </View>
              )}
            </View>

          </ScrollView>

          {/* E. FIXED BOTTOM NAVIGATION BAR */}
          <View style={styles.fixedBottomNav}>
            {/* 1. HOME */}
            <TouchableOpacity
              style={styles.navTabItem}
              onPress={() => handleNavTab('Home')}
              activeOpacity={0.8}
            >
              <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </Svg>
              <Text style={styles.navTabLabel}>Home</Text>
            </TouchableOpacity>

            {/* 2. CATEGORIES (ACTIVE) */}
            <TouchableOpacity
              style={styles.navTabItem}
              onPress={() => handleNavTab('Categories')}
              activeOpacity={0.8}
            >
              <Svg width={22} height={22} viewBox="0 0 24 24" fill="#16A34A">
                <Rect x={3} y={3} width={7} height={7} rx={1.5} />
                <Rect x={14} y={3} width={7} height={7} rx={1.5} />
                <Rect x={14} y={14} width={7} height={7} rx={1.5} />
                <Rect x={3} y={14} width={7} height={7} rx={1.5} />
              </Svg>
              <Text style={styles.navTabActiveLabel}>Categories</Text>
            </TouchableOpacity>

            {/* 3. ORDERS */}
            <TouchableOpacity
              style={styles.navTabItem}
              onPress={() => handleNavTab('Orders')}
              activeOpacity={0.8}
            >
              <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <Path d="M3 6h18" />
                <Path d="M16 10a4 4 0 0 1-8 0" />
              </Svg>
              <Text style={styles.navTabLabel}>Orders</Text>
            </TouchableOpacity>

            {/* 4. OFFERS (WITH RED NOTIFICATION BADGE) */}
            <TouchableOpacity
              style={styles.navTabItem}
              onPress={() => handleNavTab('Offers')}
              activeOpacity={0.8}
            >
              <View style={styles.navIconContainer}>
                <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <Circle cx={7.5} cy={7.5} r={1} fill="#64748B" />
                </Svg>
                <View style={styles.offersRedBadge} />
              </View>
              <Text style={styles.navTabLabel}>Offers</Text>
            </TouchableOpacity>

            {/* 5. PROFILE */}
            <TouchableOpacity
              style={styles.navTabItem}
              onPress={() => handleNavTab('Profile')}
              activeOpacity={0.8}
            >
              <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <Circle cx={12} cy={7} r={4} />
              </Svg>
              <Text style={styles.navTabLabel}>Profile</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}
