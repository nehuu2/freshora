import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import Svg, { Path, Rect, Circle, Line } from 'react-native-svg';
import { styles } from './CategoriesView.styles';
import { cartService } from '../services/cartService';

export default function CategoriesView({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(3);

  useEffect(() => {
    cartService.getCart().then(cart => {
      if (cart && typeof cart.totalItemCount === 'number') {
        setCartCount(cart.totalItemCount);
      }
    }).catch(() => {});
  }, []);

  const handleLocationPress = () => {
    // Location picker handler
  };

  const handleNotificationPress = () => {
    // Notifications handler
  };

  const handleCartPress = () => {
    if (navigation && typeof navigation.navigate === 'function') {
      navigation.navigate('Cart');
    }
  };

  const handleCategoryPress = (categoryName) => {
    if (navigation && typeof navigation.navigate === 'function') {
      if (categoryName === 'All Categories') {
        navigation.navigate('AllCategories');
      } else if (categoryName === 'Fruits & Vegetables') {
        navigation.navigate('FruitsVegetables');
      } else {
        navigation.navigate('CategoryProducts', { categoryName });
      }
    }
  };

  const handleFeaturedPress = (featureName) => {
    if (navigation && typeof navigation.navigate === 'function') {
      navigation.navigate('CategoryProducts', { categoryName: featureName });
    }
  };

  const handleSeeAllPress = () => {
    if (navigation && typeof navigation.navigate === 'function') {
      navigation.navigate('AllCategories');
    }
  };

  const handleShopNowPress = () => {
    if (navigation && typeof navigation.navigate === 'function') {
      navigation.navigate('CategoryProducts', { categoryName: 'Organic & Healthy' });
    }
  };

  const handleNavTab = (tab) => {
    if (!navigation || typeof navigation.navigate !== 'function') return;
    if (tab === 'Home') {
      navigation.navigate('Onboarding7');
    } else if (tab === 'Categories') {
      // Already on Categories
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
                onPress={handleLocationPress}
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
                  onPress={handleNotificationPress}
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

            {/* C. PAGE TITLE & FRESH CHOICES BADGE */}
            <View style={styles.titleSection}>
              <View style={styles.titleLeftCol}>
                <Text style={styles.mainHeadingText} numberOfLines={1}>Shop by Categories</Text>
                <Text style={styles.subtitleText} numberOfLines={1}>Everything you need, all in one place.</Text>
              </View>

              {/* FRESH CHOICES PILL BADGE */}
              <View style={styles.freshChoicesPill}>
                <Svg width={15} height={15} viewBox="0 0 24 24" fill="#16A34A">
                  <Path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                </Svg>
                <View style={styles.pillTextCol}>
                  <Text style={styles.pillTopText}>Fresh Choices</Text>
                  <Text style={styles.pillBottomText}>Healthier Tomorrows</Text>
                </View>
              </View>
            </View>

            {/* D. MAIN 3-COLUMN CATEGORY GRID (9 CARDS) */}
            <View style={styles.gridContainer}>

              {/* 1. FRUITS & VEGETABLES */}
              <TouchableOpacity
                style={[styles.categoryCard, { backgroundColor: '#EDF7ED', borderColor: '#D6ECD7' }]}
                onPress={() => handleCategoryPress('Fruits & Vegetables')}
                activeOpacity={0.85}
              >
                <View style={styles.cardImageContainer}>
                  <Image
                    source={require('../../assets/cat_grid_fruits.jpg')}
                    style={styles.cardProductImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.cardBottomRow}>
                  <View style={styles.cardTextCol}>
                    <Text style={styles.cardCategoryTitle}>Fruits &{'\n'}Vegetables</Text>
                    <Text style={styles.cardItemCountText}>500+ items</Text>
                  </View>
                  <View style={styles.cardArrowCircle}>
                    <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M9 18l6-6-6-6" />
                    </Svg>
                  </View>
                </View>
              </TouchableOpacity>

              {/* 2. DAIRY & BREAKFAST */}
              <TouchableOpacity
                style={[styles.categoryCard, { backgroundColor: '#EBF5FB', borderColor: '#D6EAF8' }]}
                onPress={() => handleCategoryPress('Dairy & Breakfast')}
                activeOpacity={0.85}
              >
                <View style={styles.cardImageContainer}>
                  <Image
                    source={require('../../assets/cat_grid_dairy.jpg')}
                    style={styles.cardProductImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.cardBottomRow}>
                  <View style={styles.cardTextCol}>
                    <Text style={styles.cardCategoryTitle}>Dairy &{'\n'}Breakfast</Text>
                    <Text style={styles.cardItemCountText}>300+ items</Text>
                  </View>
                  <View style={styles.cardArrowCircle}>
                    <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M9 18l6-6-6-6" />
                    </Svg>
                  </View>
                </View>
              </TouchableOpacity>

              {/* 3. SNACKS & BEVERAGES */}
              <TouchableOpacity
                style={[styles.categoryCard, { backgroundColor: '#FEF3E8', borderColor: '#FDE4CF' }]}
                onPress={() => handleCategoryPress('Snacks & Beverages')}
                activeOpacity={0.85}
              >
                <View style={styles.cardImageContainer}>
                  <Image
                    source={require('../../assets/cat_grid_snacks.jpg')}
                    style={styles.cardProductImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.cardBottomRow}>
                  <View style={styles.cardTextCol}>
                    <Text style={styles.cardCategoryTitle}>Snacks &{'\n'}Beverages</Text>
                    <Text style={styles.cardItemCountText}>400+ items</Text>
                  </View>
                  <View style={styles.cardArrowCircle}>
                    <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M9 18l6-6-6-6" />
                    </Svg>
                  </View>
                </View>
              </TouchableOpacity>

              {/* 4. ATTA, RICE & STAPLES */}
              <TouchableOpacity
                style={[styles.categoryCard, { backgroundColor: '#FAF4EB', borderColor: '#F3E7D5' }]}
                onPress={() => handleCategoryPress('Atta, Rice & Staples')}
                activeOpacity={0.85}
              >
                <View style={styles.cardImageContainer}>
                  <Image
                    source={require('../../assets/cat_grid_staples.jpg')}
                    style={styles.cardProductImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.cardBottomRow}>
                  <View style={styles.cardTextCol}>
                    <Text style={styles.cardCategoryTitle}>Atta, Rice &{'\n'}Staples</Text>
                    <Text style={styles.cardItemCountText}>300+ items</Text>
                  </View>
                  <View style={styles.cardArrowCircle}>
                    <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M9 18l6-6-6-6" />
                    </Svg>
                  </View>
                </View>
              </TouchableOpacity>

              {/* 5. HOUSEHOLD ESSENTIALS */}
              <TouchableOpacity
                style={[styles.categoryCard, { backgroundColor: '#E8F4F8', borderColor: '#D3EBF2' }]}
                onPress={() => handleCategoryPress('Household Essentials')}
                activeOpacity={0.85}
              >
                <View style={styles.cardImageContainer}>
                  <Image
                    source={require('../../assets/cat_grid_household.jpg')}
                    style={styles.cardProductImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.cardBottomRow}>
                  <View style={styles.cardTextCol}>
                    <Text style={styles.cardCategoryTitle}>Household{'\n'}Essentials</Text>
                    <Text style={styles.cardItemCountText}>250+ items</Text>
                  </View>
                  <View style={styles.cardArrowCircle}>
                    <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M9 18l6-6-6-6" />
                    </Svg>
                  </View>
                </View>
              </TouchableOpacity>

              {/* 6. PERSONAL CARE */}
              <TouchableOpacity
                style={[styles.categoryCard, { backgroundColor: '#FDF2F4', borderColor: '#FADEE3' }]}
                onPress={() => handleCategoryPress('Personal Care')}
                activeOpacity={0.85}
              >
                <View style={styles.cardImageContainer}>
                  <Image
                    source={require('../../assets/cat_grid_personal.jpg')}
                    style={styles.cardProductImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.cardBottomRow}>
                  <View style={styles.cardTextCol}>
                    <Text style={styles.cardCategoryTitle}>Personal{'\n'}Care</Text>
                    <Text style={styles.cardItemCountText}>300+ items</Text>
                  </View>
                  <View style={styles.cardArrowCircle}>
                    <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M9 18l6-6-6-6" />
                    </Svg>
                  </View>
                </View>
              </TouchableOpacity>

              {/* 7. BABY CARE */}
              <TouchableOpacity
                style={[styles.categoryCard, { backgroundColor: '#E8F6F6', borderColor: '#D1EEEE' }]}
                onPress={() => handleCategoryPress('Baby Care')}
                activeOpacity={0.85}
              >
                <View style={styles.cardImageContainer}>
                  <Image
                    source={require('../../assets/cat_grid_baby.jpg')}
                    style={styles.cardProductImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.cardBottomRow}>
                  <View style={styles.cardTextCol}>
                    <Text style={styles.cardCategoryTitle}>Baby Care</Text>
                    <Text style={styles.cardItemCountText}>200+ items</Text>
                  </View>
                  <View style={styles.cardArrowCircle}>
                    <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M9 18l6-6-6-6" />
                    </Svg>
                  </View>
                </View>
              </TouchableOpacity>

              {/* 8. PET CARE */}
              <TouchableOpacity
                style={[styles.categoryCard, { backgroundColor: '#FFF8E7', borderColor: '#FDF0CA' }]}
                onPress={() => handleCategoryPress('Pet Care')}
                activeOpacity={0.85}
              >
                <View style={styles.cardImageContainer}>
                  <Image
                    source={require('../../assets/cat_grid_pet.jpg')}
                    style={styles.cardProductImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.cardBottomRow}>
                  <View style={styles.cardTextCol}>
                    <Text style={styles.cardCategoryTitle}>Pet Care</Text>
                    <Text style={styles.cardItemCountText}>150+ items</Text>
                  </View>
                  <View style={styles.cardArrowCircle}>
                    <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M9 18l6-6-6-6" />
                    </Svg>
                  </View>
                </View>
              </TouchableOpacity>

              {/* 9. ALL CATEGORIES */}
              <TouchableOpacity
                style={[styles.categoryCard, { backgroundColor: '#EAF7EE', borderColor: '#D3EFE0' }]}
                onPress={() => handleCategoryPress('All Categories')}
                activeOpacity={0.85}
              >
                <View style={styles.allCategoryIconContainer}>
                  <Svg width={36} height={36} viewBox="0 0 24 24" fill="#16A34A">
                    <Rect x={3} y={3} width={7.5} height={7.5} rx={2} />
                    <Rect x={13.5} y={3} width={7.5} height={7.5} rx={2} />
                    <Rect x={13.5} y={13.5} width={7.5} height={7.5} rx={2} />
                    <Rect x={3} y={13.5} width={7.5} height={7.5} rx={2} />
                  </Svg>
                </View>
                <View style={styles.cardBottomRow}>
                  <View style={styles.cardTextCol}>
                    <Text style={styles.cardCategoryTitle}>All{'\n'}Categories</Text>
                    <Text style={styles.cardItemCountText}>2000+ items</Text>
                  </View>
                  <View style={styles.cardArrowCircle}>
                    <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M9 18l6-6-6-6" />
                    </Svg>
                  </View>
                </View>
              </TouchableOpacity>

            </View>

            {/* E. FEATURED CATEGORIES SECTION */}
            <View style={styles.featuredSectionHeader}>
              <Text style={styles.featuredHeadingText}>Featured Categories</Text>
              <TouchableOpacity
                style={styles.seeAllButton}
                onPress={handleSeeAllPress}
                activeOpacity={0.7}
              >
                <Text style={styles.seeAllText}>See All →</Text>
              </TouchableOpacity>
            </View>

            {/* 4 FEATURED CARDS IN A SINGLE ROW */}
            <View style={styles.featuredRowContainer}>
              {/* 1. ORGANIC PRODUCTS */}
              <TouchableOpacity
                style={[styles.featuredCard, { backgroundColor: '#EDF7ED', borderColor: '#D6ECD7' }]}
                onPress={() => handleFeaturedPress('Organic Products')}
                activeOpacity={0.85}
              >
                <View style={styles.featuredCardTopRow}>
                  <View style={styles.featuredCardTextCol}>
                    <Text style={[styles.featuredCardTitle, { color: '#15803D' }]}>Organic{'\n'}Products</Text>
                    <Text style={styles.featuredCardItemCount}>120+ items</Text>
                  </View>
                  <View style={styles.organicBadgeStamp}>
                    <Text style={styles.organicBadgeText}>ORGANIC</Text>
                  </View>
                </View>
                <View style={styles.featuredImageContainer}>
                  <Image
                    source={require('../../assets/cat_feat_organic.jpg')}
                    style={styles.featuredProductImage}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>

              {/* 2. HEALTHY SNACKS */}
              <TouchableOpacity
                style={[styles.featuredCard, { backgroundColor: '#FAF4EB', borderColor: '#F3E7D5' }]}
                onPress={() => handleFeaturedPress('Healthy Snacks')}
                activeOpacity={0.85}
              >
                <View style={styles.featuredCardTopRow}>
                  <View style={styles.featuredCardTextCol}>
                    <Text style={[styles.featuredCardTitle, { color: '#78350F' }]}>Healthy{'\n'}Snacks</Text>
                    <Text style={styles.featuredCardItemCount}>100+ items</Text>
                  </View>
                </View>
                <View style={styles.featuredImageContainer}>
                  <Image
                    source={require('../../assets/cat_feat_snacks.png')}
                    style={styles.featuredProductImage}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>

              {/* 3. BEVERAGES */}
              <TouchableOpacity
                style={[styles.featuredCard, { backgroundColor: '#EBF5FB', borderColor: '#D6EAF8' }]}
                onPress={() => handleFeaturedPress('Beverages')}
                activeOpacity={0.85}
              >
                <View style={styles.featuredCardTopRow}>
                  <View style={styles.featuredCardTextCol}>
                    <Text style={[styles.featuredCardTitle, { color: '#0E7490' }]}>Beverages</Text>
                    <Text style={styles.featuredCardItemCount}>180+ items</Text>
                  </View>
                </View>
                <View style={styles.featuredImageContainer}>
                  <Image
                    source={require('../../assets/cat_feat_beverages.jpg')}
                    style={styles.featuredProductImage}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>

              {/* 4. CLEANING ESSENTIALS */}
              <TouchableOpacity
                style={[styles.featuredCard, { backgroundColor: '#E8F4F8', borderColor: '#D3EBF2' }]}
                onPress={() => handleFeaturedPress('Cleaning Essentials')}
                activeOpacity={0.85}
              >
                <View style={styles.featuredCardTopRow}>
                  <View style={styles.featuredCardTextCol}>
                    <Text style={[styles.featuredCardTitle, { color: '#0F766E' }]}>Cleaning{'\n'}Essentials</Text>
                    <Text style={styles.featuredCardItemCount}>100+ items</Text>
                  </View>
                </View>
                <View style={styles.featuredImageContainer}>
                  <Image
                    source={require('../../assets/cat_feat_cleaning.jpg')}
                    style={styles.featuredProductImage}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            </View>

            {/* F. HEALTHY LIFESTYLE BANNER */}
            <View style={styles.lifestyleBannerCard}>
              {/* BACKGROUND BANNER IMAGE */}
              <Image
                source={require('../../assets/banner_lifestyle_fresh.png')}
                style={styles.lifestyleBgImage}
                resizeMode="cover"
              />

              {/* LEFT TEXT & CTA OVERLAY */}
              <View style={styles.lifestyleLeftCol}>
                <Text style={styles.lifestyleHeadingText}>Explore a{'\n'}Healthier Lifestyle</Text>
                <Text style={styles.lifestyleSubtext}>Wide range of organic, healthy{'\n'}and natural products.</Text>
                <TouchableOpacity
                  style={styles.shopNowButton}
                  onPress={handleShopNowPress}
                  activeOpacity={0.85}
                >
                  <Text style={styles.shopNowBtnText}>Shop Now →</Text>
                </TouchableOpacity>
              </View>

              {/* SCRIPT FLOURISH OVERLAY */}
              <View style={styles.scriptFlourishOverlay}>
                <Text style={styles.scriptFlourishText}>Good{'\n'}Food{'\n'}Happier{'\n'}You ♥</Text>
              </View>
            </View>

          </ScrollView>

          {/* G. FIXED BOTTOM NAVIGATION BAR */}
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
