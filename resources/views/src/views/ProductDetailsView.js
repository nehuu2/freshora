import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import Svg, { Path, Rect, Circle, Line, Polyline, Polygon } from 'react-native-svg';
import { styles } from './ProductDetailsView.styles';
import { cartService } from '../services/cartService';
import { productService } from '../services/productService';

export default function ProductDetailsView({ navigation }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedQtyId, setSelectedQtyId] = useState('1kg');
  const [cartCount, setCartCount] = useState(3);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedItems, setAddedItems] = useState({});
  const [pincode, setPincode] = useState('122001');

  useEffect(() => {
    cartService.getCart().then(cart => {
      if (cart && typeof cart.totalItemCount === 'number') {
        setCartCount(cart.totalItemCount);
      }
    }).catch(() => {});

    cartService.getWishlist().then(wish => {
      if (wish && Array.isArray(wish.productIds)) {
        if (wish.productIds.includes(3) || wish.productIds.includes('p3')) {
          setIsWishlisted(true);
        }
      }
    }).catch(() => {});
  }, []);

  // 1. Gallery images
  const galleryImages = [
    require('../../assets/tomato_gallery_1.png'),
    require('../../assets/tomato_gallery_2.png'),
    require('../../assets/tomato_gallery_3.png'),
    require('../../assets/tomato_gallery_4.png'),
    require('../../assets/tomato_gallery_5.png'),
  ];

  // 2. Quantity options
  const quantityOptions = [
    { id: '250g', weight: '250 g', price: 10, oldPrice: 12 },
    { id: '500g', weight: '500 g', price: 18, oldPrice: 20 },
    { id: '1kg', weight: '1 kg', price: 32, oldPrice: 36 },
    { id: '2kg', weight: '2 kg', price: 60, oldPrice: 68 },
  ];

  const currentOption = quantityOptions.find(q => q.id === selectedQtyId) || quantityOptions[2];

  // 3. Recommended products
  const recommendedProducts = [
    {
      id: 'rec_onion',
      name: 'Onion',
      unit: '1 kg',
      price: '₹28',
      image: require('../../assets/veg_onion.png'),
    },
    {
      id: 'rec_potato',
      name: 'Potato',
      unit: '1 kg',
      price: '₹22',
      image: require('../../assets/veg_potato.png'),
    },
    {
      id: 'rec_carrot',
      name: 'Carrot',
      unit: '1 kg',
      price: '₹36',
      image: require('../../assets/veg_carrot.png'),
    },
    {
      id: 'rec_capsicum',
      name: 'Capsicum (Mix)',
      unit: '500 g',
      price: '₹45',
      image: require('../../assets/veg_capsicum.png'),
    },
  ];

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    setAddedItems(prev => ({ ...prev, main: true }));
    cartService.addToCart({
      product_code: 'p3',
      quantity: 1,
      unit: currentOption.weight,
      price: currentOption.price,
    }).catch(() => {});
  };

  const handleToggleRecItem = (id) => {
    setAddedItems(prev => {
      const isAdded = !prev[id];
      if (!isAdded) {
        setCartCount(c => c + 1);
        const prod = recommendedProducts.find(p => p.id === id);
        cartService.addToCart({
          product_code: id.replace('rec_', 'v_'),
          quantity: 1,
          unit: prod ? prod.unit : '1 kg',
          price: prod ? parseFloat(prod.price.replace('₹', '')) : 25,
        }).catch(() => {});
      } else {
        setCartCount(c => Math.max(0, c - 1));
      }
      return { ...prev, [id]: !isAdded };
    });
  };

  const handleCheckPincode = () => {
    Alert.alert('Delivery Available', `Instant Delivery available in ${pincode} (Gurugram) by Today 5 PM!`);
  };

  return (
    <SafeAreaView style={styles.outerSafeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFDF9" />

      <View style={styles.screenContainer}>
        <View style={styles.mobileCanvas}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* A. TOP HEADER BAR */}
            <View style={styles.topHeaderBar}>
              <TouchableOpacity
                style={styles.locationSelector}
                onPress={() => Alert.alert('Select Location', 'Current: Sector 67, Gurugram 122001')}
                activeOpacity={0.7}
              >
                <View style={styles.locationTitleRow}>
                  <Svg width="14" height="14" viewBox="0 0 24 24" fill="#16A34A">
                    <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                  </Svg>
                  <Text style={styles.deliveringToText}>Delivering to</Text>
                  <Svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5">
                    <Path d="M6 9l6 6 6-6" />
                  </Svg>
                </View>
                <Text style={styles.locationAddressText} numberOfLines={1}>
                  Sector 67, Gurugram 122001
                </Text>
              </TouchableOpacity>

              <View style={styles.rightActionRow}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => Alert.alert('Notifications', 'No new notifications')}
                  activeOpacity={0.7}
                >
                  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <Path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </Svg>
                  <View style={styles.notificationDot} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => navigation.navigate('Cart')}
                  activeOpacity={0.7}
                >
                  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <Circle cx="9" cy="21" r="1" />
                    <Circle cx="20" cy="21" r="1" />
                    <Path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </Svg>
                  {cartCount > 0 && (
                    <View style={styles.cartBadge}>
                      <Text style={styles.cartBadgeText}>{cartCount}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* B. SEARCH BAR */}
            <View style={styles.searchBarContainer}>
              <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <Circle cx="11" cy="11" r="8" />
                <Line x1="21" y1="21" x2="16.65" y2="16.65" />
              </Svg>
              <TextInput
                style={styles.searchInput}
                placeholder="Search for products, categories and more..."
                placeholderTextColor="#94A3B8"
              />
              <TouchableOpacity style={styles.qrButton} activeOpacity={0.7}>
                <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

            {/* C. BREADCRUMBS ROW */}
            <View style={styles.breadcrumbsRow}>
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => navigation.goBack()}
                activeOpacity={0.7}
              >
                <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F2E1E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M15 18l-6-6 6-6" />
                </Svg>
              </TouchableOpacity>
              <View style={styles.breadcrumbTexts}>
                <TouchableOpacity onPress={() => navigation.navigate('FruitsVegetables')}>
                  <Text style={styles.breadcrumbLink}>Fruits & Vegetables</Text>
                </TouchableOpacity>
                <Text style={styles.breadcrumbSeparator}>&gt;</Text>
                <TouchableOpacity onPress={() => navigation.navigate('FreshVegetables')}>
                  <Text style={styles.breadcrumbLink}>Fresh Vegetables</Text>
                </TouchableOpacity>
                <Text style={styles.breadcrumbSeparator}>&gt;</Text>
                <Text style={styles.breadcrumbCurrent}>Tomato</Text>
              </View>
            </View>

            {/* D. PRODUCT SHOWCASE SECTION (THUMBNAILS + MAIN IMAGE) */}
            <View style={styles.showcaseSection}>
              {/* Left Thumbnail Column */}
              <View style={styles.thumbnailColumn}>
                {galleryImages.map((img, idx) => (
                  <TouchableOpacity
                    key={`thumb_${idx}`}
                    style={[
                      styles.thumbnailItem,
                      selectedImageIndex === idx && styles.thumbnailItemActive,
                    ]}
                    onPress={() => setSelectedImageIndex(idx)}
                    activeOpacity={0.8}
                  >
                    <Image source={img} style={styles.thumbImage} resizeMode="contain" />
                    {idx === 4 && (
                      <View style={styles.playOverlay}>
                        <Svg width="8" height="8" viewBox="0 0 24 24" fill="#FFFFFF">
                          <Path d="M8 5v14l11-7z" />
                        </Svg>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              {/* Main Product Image Container */}
              <View style={styles.mainImageContainer}>
                <View style={styles.mainDiscountBadge}>
                  <Text style={styles.mainDiscountText}>12% OFF</Text>
                </View>

                <Image
                  source={galleryImages[selectedImageIndex]}
                  style={styles.mainProductImage}
                  resizeMode="contain"
                />

                <TouchableOpacity style={styles.expandBtn} activeOpacity={0.7}>
                  <Svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                  </Svg>
                </TouchableOpacity>
              </View>
            </View>

            {/* E. PRODUCT TITLE, RATINGS, PRICE */}
            <View style={styles.titleSection}>
              <View style={styles.titleRow}>
                <View>
                  <Text style={styles.productTitle}>Tomato</Text>
                  <Text style={styles.productSubtitle}>Fresh & Juicy</Text>
                </View>
                <View style={styles.shareWishRow}>
                  <TouchableOpacity
                    style={styles.actionIconBtn}
                    onPress={() => Alert.alert('Share', 'Share link copied to clipboard!')}
                    activeOpacity={0.7}
                  >
                    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <Circle cx="18" cy="5" r="3" />
                      <Circle cx="6" cy="12" r="3" />
                      <Circle cx="18" cy="19" r="3" />
                      <Line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <Line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </Svg>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionIconBtn}
                    onPress={() => setIsWishlisted(!isWishlisted)}
                    activeOpacity={0.7}
                  >
                    <Svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill={isWishlisted ? '#EF4444' : 'none'}
                      stroke={isWishlisted ? '#EF4444' : '#64748B'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </Svg>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Rating */}
              <View style={styles.ratingRow}>
                <Svg width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B">
                  <Path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </Svg>
                <Text style={styles.ratingText}>4.6</Text>
                <Text style={styles.reviewsText}>(1.2K reviews)</Text>
              </View>

              {/* Price Row */}
              <View style={styles.priceRow}>
                <Text style={styles.currentPrice}>₹{currentOption.price}</Text>
                <Text style={styles.oldPrice}>₹{currentOption.oldPrice}</Text>
                <View style={styles.discountPill}>
                  <Text style={styles.discountPillText}>12% OFF</Text>
                </View>
              </View>
              <Text style={styles.taxText}>Inclusive of all taxes</Text>
            </View>

            {/* F. DESCRIPTION & HIGHLIGHTS */}
            <Text style={styles.descriptionParagraph}>
              Farm fresh tomatoes, naturally ripened, full of flavor and nutrients. Perfect for your daily cooking needs.
            </Text>

            <View style={styles.highlightsContainer}>
              <View style={styles.highlightItem}>
                <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <Path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </Svg>
                <Text style={styles.highlightText}>Freshly Sourced</Text>
              </View>
              <View style={styles.highlightItem}>
                <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <Path d="m9 12 2 2 4-4" />
                </Svg>
                <Text style={styles.highlightText}>No Harmful Chemicals</Text>
              </View>
              <View style={styles.highlightItem}>
                <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <Rect x="1" y="3" width="15" height="13" />
                  <Polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <Circle cx="5.5" cy="18.5" r="2.5" />
                  <Circle cx="18.5" cy="18.5" r="2.5" />
                </Svg>
                <Text style={styles.highlightText}>Quality Checked</Text>
              </View>
            </View>

            {/* G. SELECT QUANTITY */}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>Select Quantity</Text>
              <View style={styles.qtyRow}>
                {quantityOptions.map(opt => (
                  <TouchableOpacity
                    key={opt.id}
                    style={[
                      styles.qtyCard,
                      selectedQtyId === opt.id && styles.qtyCardActive,
                    ]}
                    onPress={() => setSelectedQtyId(opt.id)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.qtyWeightText}>{opt.weight}</Text>
                    <Text style={styles.qtyPriceText}>₹{opt.price}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* H. CTA ACTION BUTTONS */}
            <View style={styles.ctaButtonsRow}>
              <TouchableOpacity
                style={styles.addToCartBtn}
                onPress={handleAddToCart}
                activeOpacity={0.8}
              >
                <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <Circle cx="9" cy="21" r="1" />
                  <Circle cx="20" cy="21" r="1" />
                  <Path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </Svg>
                <Text style={styles.addToCartBtnText}>
                  {addedItems.main ? 'Added in Cart ✓' : 'Add to Cart'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buyNowBtn}
                onPress={() => navigation.navigate('Cart')}
                activeOpacity={0.8}
              >
                <Text style={styles.buyNowBtnText}>Buy Now</Text>
              </TouchableOpacity>
            </View>

            {/* I. DELIVERY INFO CARD */}
            <View style={styles.deliveryCard}>
              <View style={styles.deliveryLeft}>
                <Svg width="22" height="22" viewBox="0 0 24 24" fill="#16A34A">
                  <Path d="M19 7h-3V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a3 3 0 0 0 6 0h4a3 3 0 0 0 6 0h1a2 2 0 0 0 2-2v-5l-3-4zM6 18a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm12 0a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm2-7h-3V9h2.25z" />
                </Svg>
                <View style={styles.deliveryTextCol}>
                  <Text style={styles.deliveryMainText}>Get it by <Text style={{ color: '#0F2E1E', fontWeight: '800' }}>Today, 5 PM</Text></Text>
                  <Text style={styles.deliverySubText}>Free delivery on orders above ₹199</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.pincodeBtn}
                onPress={handleCheckPincode}
                activeOpacity={0.7}
              >
                <Text style={styles.pincodeBtnText}>Check Pincode</Text>
                <Svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M9 18l6-6-6-6" />
                </Svg>
              </TouchableOpacity>
            </View>

            {/* J. PRODUCT DETAILS & 100% FARM FRESH BADGE */}
            <View style={styles.detailsBadgeSection}>
              <View style={styles.detailsCol}>
                <Text style={styles.detailsHeading}>Product Details</Text>
                <Text style={styles.detailsBodyText}>
                  Our tomatoes are handpicked from trusted farms, carefully selected to ensure the best quality and freshness. Rich in vitamins and antioxidants, they add a natural taste and nutrition to your meals.
                </Text>
              </View>

              <View style={styles.farmBadgeCard}>
                <Svg width="26" height="26" viewBox="0 0 24 24" fill="#16A34A">
                  <Path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A9.49 9.49 0 0 0 17 8zm-7.25 7c-1.32.74-2.42 1.6-3.3 2.57C7.38 15 9.07 13.06 11 11.75c.95-.64 2.05-1.19 3.25-1.63-1.67 1.48-3.15 3.19-4.5 4.88z" />
                </Svg>
                <Text style={styles.farmBadgeTitle}>100%{"\n"}Farm Fresh</Text>
                <Text style={styles.farmBadgeSub}>Good Food{"\n"}Happier You 💚</Text>
              </View>
            </View>

            {/* K. NUTRITIONAL INFORMATION */}
            <View style={styles.nutritionSection}>
              <Text style={styles.nutritionHeading}>Nutritional Information (per 100 g)</Text>
              <View style={styles.nutritionRow}>
                <View style={styles.nutritionCard}>
                  <Text style={styles.nutritionValText}>18</Text>
                  <Text style={styles.nutritionLabelText}>Calories</Text>
                </View>
                <View style={styles.nutritionCard}>
                  <Text style={styles.nutritionValText}>0.9 g</Text>
                  <Text style={styles.nutritionLabelText}>Protein</Text>
                </View>
                <View style={styles.nutritionCard}>
                  <Text style={styles.nutritionValText}>3.9 g</Text>
                  <Text style={styles.nutritionLabelText}>Carbohydrates</Text>
                </View>
                <View style={styles.nutritionCard}>
                  <Text style={styles.nutritionValText}>0.2 g</Text>
                  <Text style={styles.nutritionLabelText}>Fat</Text>
                </View>
              </View>
            </View>

            {/* L. YOU MAY ALSO LIKE */}
            <View style={styles.recomSection}>
              <View style={styles.recomHeaderRow}>
                <Text style={styles.recomTitle}>You May Also Like</Text>
                <TouchableOpacity
                  style={styles.seeAllBtn}
                  onPress={() => navigation.navigate('FreshVegetables')}
                  activeOpacity={0.7}
                >
                  <Text style={styles.seeAllText}>See All</Text>
                  <Svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M5 12h14" />
                    <Path d="M12 5l7 7-7 7" />
                  </Svg>
                </TouchableOpacity>
              </View>

              <View style={styles.recomGrid}>
                {recommendedProducts.map(prod => (
                  <View key={prod.id} style={styles.recomCard}>
                    <View style={styles.recomImgWrap}>
                      <Image source={prod.image} style={styles.recomProductImage} resizeMode="contain" />
                    </View>
                    <Text style={styles.recomName} numberOfLines={1}>{prod.name}</Text>
                    <Text style={styles.recomUnit}>{prod.unit}</Text>
                    <View style={styles.recomBottomRow}>
                      <Text style={styles.recomPrice}>{prod.price}</Text>
                      <TouchableOpacity
                        style={[
                          styles.recomAddBtn,
                          addedItems[prod.id] && styles.recomAddBtnAdded,
                        ]}
                        onPress={() => handleToggleRecItem(prod.id)}
                        activeOpacity={0.7}
                      >
                        <Svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={addedItems[prod.id] ? '#FFFFFF' : '#16A34A'}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {addedItems[prod.id] ? (
                            <Path d="M20 6L9 17l-5-5" />
                          ) : (
                            <>
                              <Line x1="12" y1="5" x2="12" y2="19" />
                              <Line x1="5" y1="12" x2="19" y2="12" />
                            </>
                          )}
                        </Svg>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* M. BOTTOM NAVIGATION BAR */}
          <View style={styles.bottomNavContainer}>
            <View style={styles.bottomNavCanvas}>
              {/* Home */}
              <TouchableOpacity
                style={styles.navTab}
                onPress={() => navigation.navigate('Onboarding7')}
                activeOpacity={0.7}
              >
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <Polyline points="9 22 9 12 15 12 15 22" />
                </Svg>
                <Text style={styles.navLabel}>Home</Text>
              </TouchableOpacity>

              {/* Categories (Active) */}
              <TouchableOpacity
                style={styles.navTab}
                onPress={() => navigation.navigate('Categories')}
                activeOpacity={0.7}
              >
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="#16A34A" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <Rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <Rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <Rect x="14" y="14" width="7" height="7" rx="1.5" />
                  <Rect x="3" y="14" width="7" height="7" rx="1.5" />
                </Svg>
                <Text style={[styles.navLabel, styles.navLabelActive]}>Categories</Text>
              </TouchableOpacity>

              {/* Orders */}
              <TouchableOpacity
                style={styles.navTab}
                onPress={() => Alert.alert('Orders', 'Your orders history is empty')}
                activeOpacity={0.7}
              >
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <Line x1="3" y1="6" x2="21" y2="6" />
                  <Path d="M16 10a4 4 0 0 1-8 0" />
                </Svg>
                <Text style={styles.navLabel}>Orders</Text>
              </TouchableOpacity>

              {/* Offers */}
              <TouchableOpacity
                style={styles.navTab}
                onPress={() => Alert.alert('Offers', 'Explore exclusive discounts')}
                activeOpacity={0.7}
              >
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <Line x1="7" y1="7" x2="7.01" y2="7" />
                </Svg>
                <View style={styles.offerBadge} />
                <Text style={styles.navLabel}>Offers</Text>
              </TouchableOpacity>

              {/* Profile */}
              <TouchableOpacity
                style={styles.navTab}
                onPress={() => navigation.navigate('Profile')}
                activeOpacity={0.7}
              >
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
