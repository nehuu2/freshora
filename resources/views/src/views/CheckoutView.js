import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Svg, { Path, Rect, Circle, Line, Polyline, Polygon } from 'react-native-svg';
import { styles } from './CheckoutView.styles';

export default function CheckoutView({ navigation }) {
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('standard'); // 'standard' | 'express'
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'wallet' | 'cod'

  // Order Items matching the visual reference (Screen 6: Checkout)
  const orderItems = [
    {
      id: 'chk_tomato',
      name: 'Tomato',
      unit: '1 kg',
      quantity: 1,
      price: 32,
      oldPrice: 36,
      image: require('../../assets/veg_tomato.png'),
    },
    {
      id: 'chk_banana',
      name: 'Banana',
      unit: '1 kg',
      quantity: 2,
      price: 96,
      oldPrice: null,
      image: require('../../assets/item_banana.png'),
    },
    {
      id: 'chk_potato',
      name: 'Potato',
      unit: '1 kg',
      quantity: 1,
      price: 22,
      oldPrice: 25,
      image: require('../../assets/veg_potato.png'),
    },
    {
      id: 'chk_onion',
      name: 'Onion',
      unit: '1 kg',
      quantity: 1,
      price: 28,
      oldPrice: null,
      image: require('../../assets/veg_onion.png'),
    },
  ];

  // Price calculations
  const totalMrp = 159;
  const totalDiscount = 23;
  const deliveryCharge = selectedDeliveryOption === 'express' ? 40 : 0;
  const totalAmount = 136 + deliveryCharge;

  const handlePlaceOrder = () => {
    navigation.navigate('OrderSuccess');
  };

  const handleChangeAddress = () => {
    Alert.alert('Change Address', 'Selected address: Home (Sector 67, Gurugram)');
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
              <View style={styles.headerLeftCol}>
                <TouchableOpacity
                  style={styles.backBtn}
                  onPress={() => navigation.goBack()}
                  activeOpacity={0.7}
                >
                  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F2E1E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M15 18l-6-6 6-6" />
                  </Svg>
                </TouchableOpacity>
                <View style={styles.headerTitleBlock}>
                  <Text style={styles.mainTitleText}>Checkout</Text>
                  <Text style={styles.subtitleText}>Review your order and complete the payment</Text>
                </View>
              </View>

              <View style={styles.secureBadge}>
                <Svg width="16" height="16" viewBox="0 0 24 24" fill="#16A34A">
                  <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <Path d="m9 12 2 2 4-4" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                </Svg>
                <View style={styles.secureTextCol}>
                  <Text style={styles.secureMainText}>Secure Checkout</Text>
                  <Text style={styles.secureSubText}>100% Safe & Secure</Text>
                </View>
              </View>
            </View>

            {/* B. STEP PROGRESS INDICATOR */}
            <View style={styles.stepsContainer}>
              {/* Step 1: Cart */}
              <View style={styles.stepItem}>
                <View style={styles.stepCircleActive}>
                  <Text style={styles.stepNumberActive}>1</Text>
                </View>
                <Text style={[styles.stepLabel, styles.stepLabelActive]}>Cart</Text>
              </View>

              {/* Line 1 -> 2 */}
              <View style={styles.stepConnectingLineCompleted} />

              {/* Step 2: Checkout (Active) */}
              <View style={styles.stepItem}>
                <View style={styles.stepCircleActive}>
                  <Text style={styles.stepNumberActive}>2</Text>
                </View>
                <Text style={[styles.stepLabel, styles.stepLabelActive]}>Checkout</Text>
              </View>

              {/* Line 2 -> 3 */}
              <View style={styles.stepConnectingLinePending} />

              {/* Step 3: Payment */}
              <View style={styles.stepItem}>
                <View style={styles.stepCircleInactive}>
                  <Text style={styles.stepNumberInactive}>3</Text>
                </View>
                <Text style={styles.stepLabel}>Payment</Text>
              </View>

              {/* Line 3 -> 4 */}
              <View style={styles.stepConnectingLinePending} />

              {/* Step 4: Order Placed */}
              <View style={styles.stepItem}>
                <View style={styles.stepCircleInactive}>
                  <Text style={styles.stepNumberInactive}>4</Text>
                </View>
                <Text style={styles.stepLabel}>Order Placed</Text>
              </View>
            </View>

            {/* C. DELIVERY ADDRESS SECTION */}
            <View style={styles.sectionBlock}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionHeading}>Delivery Address</Text>
                <TouchableOpacity onPress={handleChangeAddress} activeOpacity={0.7}>
                  <Text style={styles.sectionActionLink}>Change</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.addressCard}>
                <View style={styles.addressLeftCol}>
                  <View style={styles.addressIconWrap}>
                    <Svg width="14" height="14" viewBox="0 0 24 24" fill="#FFFFFF">
                      <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                    </Svg>
                  </View>
                  <View style={styles.addressDetails}>
                    <Text style={styles.addressType}>Home</Text>
                    <Text style={styles.recipientName}>Aryan Mangla</Text>
                    <Text style={styles.addressLine}>H. No. 123, Sector 67, Gurugram, Haryana 122001</Text>
                    <Text style={styles.phoneLine}>+91 98765 43210</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.changeAddressBtn}
                  onPress={handleChangeAddress}
                  activeOpacity={0.7}
                >
                  <Text style={styles.changeAddressBtnText}>Change</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* D. ORDER ITEMS (4) */}
            <View style={styles.sectionBlock}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionHeading}>Order Items ({orderItems.length})</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')} activeOpacity={0.7}>
                  <Text style={styles.sectionActionLink}>Edit Cart</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.orderItemsCard}>
                {orderItems.map((item, idx) => (
                  <View
                    key={item.id}
                    style={[
                      styles.orderItemRow,
                      idx === orderItems.length - 1 && styles.orderItemRowLast,
                    ]}
                  >
                    <View style={styles.itemLeftGroup}>
                      <Image source={item.image} style={styles.itemThumb} resizeMode="contain" />
                      <View style={styles.itemInfoCol}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemUnit}>{item.unit}</Text>
                      </View>
                    </View>

                    <View style={styles.qtyPill}>
                      <Text style={styles.qtyPillText}>{item.quantity}</Text>
                    </View>

                    <View style={styles.itemPriceCol}>
                      <Text style={styles.itemPrice}>₹{item.price}</Text>
                      {item.oldPrice && (
                        <Text style={styles.itemOldPrice}>₹{item.oldPrice}</Text>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* E. DELIVERY OPTIONS */}
            <View style={styles.sectionBlock}>
              <Text style={[styles.sectionHeading, { marginBottom: 8 }]}>Delivery Options</Text>
              <View style={styles.deliveryOptionsRow}>
                {/* Option 1: Standard */}
                <TouchableOpacity
                  style={[
                    styles.deliveryOptCard,
                    selectedDeliveryOption === 'standard' && styles.deliveryOptCardActive,
                  ]}
                  onPress={() => setSelectedDeliveryOption('standard')}
                  activeOpacity={0.8}
                >
                  <View style={styles.deliveryOptLeft}>
                    <Svg width="18" height="18" viewBox="0 0 24 24" fill="#16A34A">
                      <Path d="M19 7h-3V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a3 3 0 0 0 6 0h4a3 3 0 0 0 6 0h1a2 2 0 0 0 2-2v-5l-3-4zM6 18a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm12 0a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm2-7h-3V9h2.25z" />
                    </Svg>
                    <View style={styles.deliveryOptDetails}>
                      <Text style={styles.deliveryOptTitle}>Standard Delivery</Text>
                      <Text style={styles.deliveryOptTime}>Today, 5 PM - 8 PM</Text>
                      <Text style={styles.deliveryOptPriceFree}>FREE</Text>
                    </View>
                  </View>

                  <View
                    style={
                      selectedDeliveryOption === 'standard'
                        ? styles.radioCircleActive
                        : styles.radioCircle
                    }
                  >
                    {selectedDeliveryOption === 'standard' && (
                      <Svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round">
                        <Polyline points="20 6 9 17 4 12" />
                      </Svg>
                    )}
                  </View>
                </TouchableOpacity>

                {/* Option 2: Express */}
                <TouchableOpacity
                  style={[
                    styles.deliveryOptCard,
                    selectedDeliveryOption === 'express' && styles.deliveryOptCardActive,
                  ]}
                  onPress={() => setSelectedDeliveryOption('express')}
                  activeOpacity={0.8}
                >
                  <View style={styles.deliveryOptLeft}>
                    <Svg width="18" height="18" viewBox="0 0 24 24" fill="#3B82F6">
                      <Polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </Svg>
                    <View style={styles.deliveryOptDetails}>
                      <Text style={styles.deliveryOptTitle}>Express Delivery</Text>
                      <Text style={styles.deliveryOptTime}>Within 2 hours</Text>
                      <Text style={styles.deliveryOptPricePaid}>₹40</Text>
                    </View>
                  </View>

                  <View
                    style={
                      selectedDeliveryOption === 'express'
                        ? styles.radioCircleActive
                        : styles.radioCircle
                    }
                  >
                    {selectedDeliveryOption === 'express' && (
                      <Svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round">
                        <Polyline points="20 6 9 17 4 12" />
                      </Svg>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* F. PAYMENT METHOD */}
            <View style={styles.sectionBlock}>
              <Text style={[styles.sectionHeading, { marginBottom: 8 }]}>Payment Method</Text>
              <View style={styles.paymentCard}>
                {/* 1. UPI */}
                <TouchableOpacity
                  style={styles.paymentRow}
                  onPress={() => setSelectedPaymentMethod('upi')}
                  activeOpacity={0.7}
                >
                  <View style={styles.paymentLeftGroup}>
                    <View style={styles.paymentIconWrap}>
                      <Svg width="28" height="20" viewBox="0 0 32 20" fill="none">
                        <Rect width="32" height="20" rx="3" fill="#F8FAFC" />
                        <Path d="M7 6l4 8h3l-4-8H7z" fill="#F97316" />
                        <Path d="M14 6l4 8h3l-4-8h-3z" fill="#16A34A" />
                        <Path d="M21 6l4 8h3l-4-8h-3z" fill="#0284C7" />
                      </Svg>
                    </View>
                    <View style={styles.paymentTexts}>
                      <Text style={styles.paymentName}>UPI</Text>
                      <Text style={styles.paymentSub}>Pay with any UPI app (GPay, PhonePe, Paytm etc.)</Text>
                    </View>
                  </View>

                  <View
                    style={
                      selectedPaymentMethod === 'upi'
                        ? styles.radioCircleActive
                        : styles.radioCircle
                    }
                  >
                    {selectedPaymentMethod === 'upi' && (
                      <Svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round">
                        <Polyline points="20 6 9 17 4 12" />
                      </Svg>
                    )}
                  </View>
                </TouchableOpacity>

                {/* 2. Credit / Debit Card */}
                <TouchableOpacity
                  style={styles.paymentRow}
                  onPress={() => setSelectedPaymentMethod('card')}
                  activeOpacity={0.7}
                >
                  <View style={styles.paymentLeftGroup}>
                    <View style={styles.paymentIconWrap}>
                      <Svg width="22" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <Rect x="1" y="4" width="22" height="16" rx="2" />
                        <Line x1="1" y1="10" x2="23" y2="10" />
                      </Svg>
                    </View>
                    <View style={styles.paymentTexts}>
                      <Text style={styles.paymentName}>Credit / Debit Card</Text>
                      <Text style={styles.paymentSub}>Visa, Mastercard, Rupey and more</Text>
                    </View>
                  </View>

                  <View
                    style={
                      selectedPaymentMethod === 'card'
                        ? styles.radioCircleActive
                        : styles.radioCircle
                    }
                  >
                    {selectedPaymentMethod === 'card' && (
                      <Svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round">
                        <Polyline points="20 6 9 17 4 12" />
                      </Svg>
                    )}
                  </View>
                </TouchableOpacity>

                {/* 3. Wallet */}
                <TouchableOpacity
                  style={styles.paymentRow}
                  onPress={() => setSelectedPaymentMethod('wallet')}
                  activeOpacity={0.7}
                >
                  <View style={styles.paymentLeftGroup}>
                    <View style={styles.paymentIconWrap}>
                      <Svg width="22" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <Path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
                        <Path d="M4 6v12a2 2 0 0 0 2 2h14v-4" />
                        <Path d="M18 12a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4v-6h-4z" />
                      </Svg>
                    </View>
                    <View style={styles.paymentTexts}>
                      <Text style={styles.paymentName}>Wallet</Text>
                      <Text style={styles.paymentSub}>Paytm, Amazon Pay and more</Text>
                    </View>
                  </View>

                  <View
                    style={
                      selectedPaymentMethod === 'wallet'
                        ? styles.radioCircleActive
                        : styles.radioCircle
                    }
                  >
                    {selectedPaymentMethod === 'wallet' && (
                      <Svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round">
                        <Polyline points="20 6 9 17 4 12" />
                      </Svg>
                    )}
                  </View>
                </TouchableOpacity>

                {/* 4. Cash on Delivery */}
                <TouchableOpacity
                  style={[styles.paymentRow, styles.paymentRowLast]}
                  onPress={() => setSelectedPaymentMethod('cod')}
                  activeOpacity={0.7}
                >
                  <View style={styles.paymentLeftGroup}>
                    <View style={styles.paymentIconWrap}>
                      <Svg width="22" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <Rect x="2" y="6" width="20" height="12" rx="2" />
                        <Circle cx="12" cy="12" r="2" />
                        <Path d="M6 12h.01M18 12h.01" />
                      </Svg>
                    </View>
                    <View style={styles.paymentTexts}>
                      <Text style={styles.paymentName}>Cash on Delivery</Text>
                      <Text style={styles.paymentSub}>Pay when you receive your order</Text>
                    </View>
                  </View>

                  <View
                    style={
                      selectedPaymentMethod === 'cod'
                        ? styles.radioCircleActive
                        : styles.radioCircle
                    }
                  >
                    {selectedPaymentMethod === 'cod' && (
                      <Svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round">
                        <Polyline points="20 6 9 17 4 12" />
                      </Svg>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* G. ORDER SUMMARY */}
            <View style={styles.sectionBlock}>
              <Text style={[styles.sectionHeading, { marginBottom: 8 }]}>Order Summary</Text>
              <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Total MRP</Text>
                  <Text style={styles.summaryValue}>₹{totalMrp}</Text>
                </View>

                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Discount</Text>
                  <Text style={styles.summaryDiscountVal}>- ₹{totalDiscount}</Text>
                </View>

                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Delivery Charge</Text>
                  <View style={styles.deliveryChargeRow}>
                    {selectedDeliveryOption === 'standard' ? (
                      <>
                        <Text style={styles.deliveryOldVal}>₹40</Text>
                        <Text style={styles.deliveryFreeVal}>FREE</Text>
                      </>
                    ) : (
                      <Text style={styles.summaryValue}>₹40</Text>
                    )}
                  </View>
                </View>

                <View style={styles.summaryDivider} />

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

            {/* H. PLACE ORDER BUTTON */}
            <TouchableOpacity
              style={styles.placeOrderBtn}
              onPress={handlePlaceOrder}
              activeOpacity={0.8}
            >
              <Text style={styles.placeOrderBtnText}>Place Order</Text>
              <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <Path d="M5 12h14" />
                <Path d="M12 5l7 7-7 7" />
              </Svg>
            </TouchableOpacity>
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
