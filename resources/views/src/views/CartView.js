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
import Svg, { Path, Rect, Circle, Line, Polyline } from 'react-native-svg';
import { styles } from './CartView.styles';
import { cartService } from '../services/cartService';
import { getProductAsset } from '../constants/assetMap';

export default function CartView({ navigation }) {
  // Initial cart items matching the visual reference (Screen 5: My Cart)
  const [cartItems, setCartItems] = useState([
    {
      id: 'item_tomato',
      cart_item_id: 1,
      name: 'Tomato',
      unit: '1 kg',
      price: 32,
      oldPrice: 36,
      discount: '12% OFF',
      quantity: 1,
      image: require('../../assets/veg_tomato.png'),
    },
    {
      id: 'item_banana',
      cart_item_id: 2,
      name: 'Banana',
      unit: '1 kg',
      price: 48,
      oldPrice: null,
      discount: null,
      quantity: 2,
      image: require('../../assets/item_banana.png'),
    },
    {
      id: 'item_potato',
      cart_item_id: 3,
      name: 'Potato',
      unit: '1 kg',
      price: 22,
      oldPrice: 25,
      discount: '12% OFF',
      quantity: 1,
      image: require('../../assets/veg_potato.png'),
    },
    {
      id: 'item_onion',
      cart_item_id: 4,
      name: 'Onion',
      unit: '1 kg',
      price: 28,
      oldPrice: null,
      discount: null,
      quantity: 1,
      image: require('../../assets/veg_onion.png'),
    },
  ]);

  const loadCartFromBackend = () => {
    cartService.getCart().then(cartData => {
      if (cartData && Array.isArray(cartData.items) && cartData.items.length > 0) {
        const mapped = cartData.items.map(item => ({
          ...item,
          id: item.code || item.id,
          cart_item_id: item.cart_item_id || item.id,
          image: getProductAsset(item.image),
        }));
        setCartItems(mapped);
      }
    }).catch(() => {});
  };

  useEffect(() => {
    loadCartFromBackend();
  }, []);

  // "You might also need" cross-sell products
  const crossSellProducts = [
    {
      id: 'cross_milk',
      name: 'Milk',
      unit: '1 L',
      price: 60,
      oldPrice: 65,
      discount: null,
      image: require('../../assets/cross_milk.png'),
    },
    {
      id: 'cross_bread',
      name: 'Bread',
      unit: '400 g',
      price: 40,
      oldPrice: 45,
      discount: null,
      image: require('../../assets/cross_bread.png'),
    },
    {
      id: 'cross_eggs',
      name: 'Eggs',
      unit: '12 pcs',
      price: 72,
      oldPrice: 80,
      discount: null,
      image: require('../../assets/cross_eggs.png'),
    },
    {
      id: 'cross_oil',
      name: 'Cooking Oil',
      unit: '1 L',
      price: 150,
      oldPrice: 165,
      discount: null,
      image: require('../../assets/cross_oil.png'),
    },
  ];

  // Dynamic calculations
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate bill details
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalMrp = cartItems.reduce((sum, item) => {
    const mrp = item.oldPrice || item.price;
    return sum + mrp * item.quantity;
  }, 0);
  const totalDiscount = Math.max(0, totalMrp - totalAmount);

  // Free delivery threshold: ₹199
  const freeDeliveryThreshold = 199;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - totalAmount);
  const progressPercent = Math.min(100, Math.round((totalAmount / freeDeliveryThreshold) * 100));

  // Handlers
  const handleIncreaseQty = (id) => {
    setCartItems(prev => {
      const target = prev.find(item => item.id === id || item.cart_item_id === id);
      if (target) {
        cartService.updateQuantity(target.cart_item_id || target.id, target.quantity + 1, target.unit).catch(() => {});
      }
      return prev.map(item =>
        item.id === id || item.cart_item_id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  };

  const handleDecreaseQty = (id) => {
    setCartItems(prev => {
      const target = prev.find(item => item.id === id || item.cart_item_id === id);
      if (target) {
        if (target.quantity <= 1) {
          cartService.removeFromCart(target.cart_item_id || target.id).catch(() => {});
        } else {
          cartService.updateQuantity(target.cart_item_id || target.id, target.quantity - 1, target.unit).catch(() => {});
        }
      }
      return prev
        .map(item => {
          if (item.id === id || item.cart_item_id === id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter(item => item.quantity > 0);
    });
  };

  const handleRemoveItem = (id) => {
    const target = cartItems.find(item => item.id === id || item.cart_item_id === id);
    if (target) {
      cartService.removeFromCart(target.cart_item_id || target.id).catch(() => {});
    }
    setCartItems(prev => prev.filter(item => item.id !== id && item.cart_item_id !== id));
  };

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            cartService.clearCart().catch(() => {});
            setCartItems([]);
          },
        },
      ]
    );
  };

  const handleAddCrossSell = (prod) => {
    cartService.addToCart({
      product_code: prod.id,
      quantity: 1,
      unit: prod.unit,
      price: prod.price,
    }).catch(() => {});
    setCartItems(prev => {
      const existing = prev.find(item => item.id === prod.id);
      if (existing) {
        return prev.map(item =>
          item.id === prod.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...prod, quantity: 1 }];
    });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart is empty', 'Please add items before proceeding to checkout.');
      return;
    }
    navigation.navigate('Checkout');
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
                  activeOpacity={0.7}
                >
                  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <Circle cx="9" cy="21" r="1" />
                    <Circle cx="20" cy="21" r="1" />
                    <Path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </Svg>
                  {totalItemCount > 0 && (
                    <View style={styles.cartBadge}>
                      <Text style={styles.cartBadgeText}>{totalItemCount}</Text>
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

            {/* C. CART TITLE & CLEAR CART BUTTON */}
            <View style={styles.cartHeaderRow}>
              <View style={styles.cartTitleCol}>
                <Text style={styles.cartMainHeading}>My Cart</Text>
                <Text style={styles.cartItemCountSub}>
                  {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} in your cart
                </Text>
              </View>

              {cartItems.length > 0 && (
                <TouchableOpacity
                  style={styles.clearCartBtn}
                  onPress={handleClearCart}
                  activeOpacity={0.7}
                >
                  <Svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <Polyline points="3 6 5 6 21 6" />
                    <Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </Svg>
                  <Text style={styles.clearCartText}>Clear Cart</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* D. FREE DELIVERY PROGRESS CARD */}
            <View style={styles.freeDeliveryCard}>
              <View style={styles.freeDeliveryLeft}>
                <View style={styles.freeDeliveryMsgRow}>
                  <Svg width="18" height="18" viewBox="0 0 24 24" fill="#16A34A">
                    <Path d="M19 7h-3V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a3 3 0 0 0 6 0h4a3 3 0 0 0 6 0h1a2 2 0 0 0 2-2v-5l-3-4zM6 18a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm12 0a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm2-7h-3V9h2.25z" />
                  </Svg>
                  <Text style={styles.freeDeliveryMsgText}>
                    {remainingForFreeDelivery > 0
                      ? `Add ₹${remainingForFreeDelivery} more for FREE delivery!`
                      : '🎉 You have unlocked FREE delivery!'}
                  </Text>
                </View>

                <View style={styles.progressBarTrack}>
                  <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
                </View>

                <Text style={styles.progressAmtText}>
                  ₹{totalAmount} / ₹{freeDeliveryThreshold}
                </Text>
              </View>

              <View style={styles.freeDeliveryRight}>
                <Image
                  source={require('../../assets/cart_delivery_van.png')}
                  style={styles.deliveryVanImg}
                  resizeMode="contain"
                />
                <Text style={styles.freeDeliveryBadgeText}>Free{"\n"}Delivery</Text>
              </View>
            </View>

            {/* E. CART ITEMS LIST */}
            {cartItems.length > 0 ? (
              <View style={styles.cartItemsContainer}>
                {cartItems.map((item) => (
                  <View key={item.id} style={styles.cartItemCard}>
                    <View style={styles.itemImgWrapper}>
                      <Image source={item.image} style={styles.itemImg} resizeMode="contain" />
                    </View>

                    <View style={styles.itemDetails}>
                      <View style={styles.itemNameRow}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <TouchableOpacity
                          style={styles.deleteBtn}
                          onPress={() => handleRemoveItem(item.id)}
                          activeOpacity={0.7}
                        >
                          <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <Polyline points="3 6 5 6 21 6" />
                            <Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </Svg>
                        </TouchableOpacity>
                      </View>

                      <Text style={styles.itemUnit}>{item.unit}</Text>

                      <View style={styles.itemPriceRow}>
                        <Text style={styles.itemCurrentPrice}>₹{item.price}</Text>
                        {item.oldPrice && (
                          <Text style={styles.itemOldPrice}>₹{item.oldPrice}</Text>
                        )}
                        {item.discount && (
                          <View style={styles.itemDiscountPill}>
                            <Text style={styles.itemDiscountText}>{item.discount}</Text>
                          </View>
                        )}
                      </View>
                    </View>

                    {/* Stepper controls */}
                    <View style={styles.stepperContainer}>
                      <TouchableOpacity
                        style={styles.stepperBtnMinus}
                        onPress={() => handleDecreaseQty(item.id)}
                        activeOpacity={0.7}
                      >
                        <Svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round">
                          <Line x1="5" y1="12" x2="19" y2="12" />
                        </Svg>
                      </TouchableOpacity>

                      <Text style={styles.stepperCountText}>{item.quantity}</Text>

                      <TouchableOpacity
                        style={styles.stepperBtnPlus}
                        onPress={() => handleIncreaseQty(item.id)}
                        activeOpacity={0.7}
                      >
                        <Svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round">
                          <Line x1="12" y1="5" x2="12" y2="19" />
                          <Line x1="5" y1="12" x2="19" y2="12" />
                        </Svg>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.emptyCartBox}>
                <Svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5">
                  <Circle cx="9" cy="21" r="1" />
                  <Circle cx="20" cy="21" r="1" />
                  <Path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </Svg>
                <Text style={styles.emptyCartText}>Your cart is empty</Text>
                <Text style={styles.emptyCartSubText}>Add items to start shopping!</Text>
                <TouchableOpacity
                  style={styles.shopNowBtn}
                  onPress={() => navigation.navigate('FreshVegetables')}
                >
                  <Text style={styles.shopNowBtnText}>Browse Fresh Produce</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* F. YOU MIGHT ALSO NEED (CROSS-SELL SECTION) */}
            <View style={styles.crossSellSection}>
              <View style={styles.crossSellHeader}>
                <View style={styles.crossSellHeaderLeft}>
                  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <Polyline points="20 12 20 22 4 22 4 12" />
                    <Rect x="2" y="7" width="20" height="5" />
                    <Line x1="12" y1="22" x2="12" y2="7" />
                    <Path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                    <Path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                  </Svg>
                  <View>
                    <Text style={styles.crossSellTitle}>You might also need</Text>
                    <Text style={styles.crossSellSub}>Add everyday essentials to your cart</Text>
                  </View>
                </View>
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Categories')}>
                  <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M9 18l6-6-6-6" />
                  </Svg>
                </TouchableOpacity>
              </View>

              <View style={styles.crossSellGrid}>
                {crossSellProducts.map((prod) => (
                  <View key={prod.id} style={styles.crossSellCard}>
                    <View style={styles.crossSellImgWrap}>
                      <Image source={prod.image} style={styles.crossSellProductImg} resizeMode="contain" />
                    </View>
                    <Text style={styles.crossSellName} numberOfLines={1}>{prod.name}</Text>
                    <Text style={styles.crossSellUnit}>{prod.unit}</Text>
                    <View style={styles.crossSellBottomRow}>
                      <Text style={styles.crossSellPrice}>₹{prod.price}</Text>
                      <TouchableOpacity
                        style={styles.crossSellAddBtn}
                        onPress={() => handleAddCrossSell(prod)}
                        activeOpacity={0.7}
                      >
                        <Svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round">
                          <Line x1="12" y1="5" x2="12" y2="19" />
                          <Line x1="5" y1="12" x2="19" y2="12" />
                        </Svg>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* G. BILL DETAILS */}
            <View style={styles.billSection}>
              <Text style={styles.billHeading}>Bill Details</Text>
              <View style={styles.billCard}>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Total MRP</Text>
                  <Text style={styles.billValue}>₹{totalMrp}</Text>
                </View>

                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Discount</Text>
                  <Text style={styles.billDiscountValue}>- ₹{totalDiscount}</Text>
                </View>

                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Delivery Charge</Text>
                  <View style={styles.deliveryChargeRow}>
                    <Text style={styles.deliveryOldVal}>₹40</Text>
                    <Text style={styles.deliveryFreeVal}>FREE</Text>
                  </View>
                </View>

                <View style={styles.billDivider} />

                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Total Amount</Text>
                  <Text style={styles.totalValue}>₹{totalAmount}</Text>
                </View>

                {totalDiscount > 0 && (
                  <View style={styles.savingsBanner}>
                    <Svg width="14" height="14" viewBox="0 0 24 24" fill="#16A34A">
                      <Circle cx="12" cy="12" r="10" />
                      <Path d="M9 12l2 2 4-4" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                    </Svg>
                    <Text style={styles.savingsBannerText}>
                      You are saving ₹{totalDiscount} on this order!
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* H. BOTTOM ACTION BUTTONS */}
            <View style={styles.ctaRow}>
              <TouchableOpacity
                style={styles.continueBtn}
                onPress={() => navigation.navigate('FreshVegetables')}
                activeOpacity={0.8}
              >
                <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M19 12H5" />
                  <Path d="M12 19l-7-7 7-7" />
                </Svg>
                <Text style={styles.continueBtnText}>Continue Shopping</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkoutBtn}
                onPress={handleCheckout}
                activeOpacity={0.8}
              >
                <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
                <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M5 12h14" />
                  <Path d="M12 5l7 7-7 7" />
                </Svg>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* I. FIXED BOTTOM NAVIGATION BAR */}
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

              {/* Categories */}
              <TouchableOpacity
                style={styles.navTab}
                onPress={() => navigation.navigate('Categories')}
                activeOpacity={0.7}
              >
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <Rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <Rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <Rect x="14" y="14" width="7" height="7" rx="1.5" />
                  <Rect x="3" y="14" width="7" height="7" rx="1.5" />
                </Svg>
                <Text style={styles.navLabel}>Categories</Text>
              </TouchableOpacity>

              {/* Orders */}
              <TouchableOpacity
                style={styles.navTab}
                onPress={() => Alert.alert('Orders', 'Your order history')}
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
