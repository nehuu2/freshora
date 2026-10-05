import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import Svg, { Path, Rect, Circle, Line, Polyline, Polygon } from 'react-native-svg';
import { styles } from './OrderSuccessView.styles';

export default function OrderSuccessView({ navigation }) {
  const [selectedTrackStep, setSelectedTrackStep] = useState(0); // 0..3
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showOffersModal, setShowOffersModal] = useState(false);

  // 4 Ordered items
  const orderItems = [
    {
      id: 'ord_tomato',
      name: 'Tomato',
      unit: '1 kg',
      price: 32,
      oldPrice: 36,
      image: require('../../assets/veg_tomato.png'),
    },
    {
      id: 'ord_banana',
      name: 'Banana',
      unit: '1 kg',
      price: 48,
      oldPrice: null,
      image: require('../../assets/item_banana.png'),
    },
    {
      id: 'ord_potato',
      name: 'Potato',
      unit: '1 kg',
      price: 22,
      oldPrice: 25,
      image: require('../../assets/veg_potato.png'),
    },
    {
      id: 'ord_onion',
      name: 'Onion',
      unit: '1 kg',
      price: 28,
      oldPrice: null,
      image: require('../../assets/veg_onion.png'),
    },
  ];

  const trackMilestones = [
    {
      title: 'Order Placed',
      time: '09:41 AM',
      sub: '09:41 AM',
      desc: 'Your order #ORD123456 has been confirmed by the store.',
    },
    {
      title: 'Preparing',
      time: '10:00 AM (Est.)',
      sub: 'We are getting your items ready',
      desc: 'Fresh farm items are being handpicked and packed with quality check.',
    },
    {
      title: 'Out for Delivery',
      time: '04:30 PM (Est.)',
      sub: 'On the way to your location',
      desc: 'Our delivery partner will be on the way with your grocery bag.',
    },
    {
      title: 'Delivered',
      time: '05:00 - 08:00 PM',
      sub: 'Enjoy your fresh groceries',
      desc: 'Order delivered to your doorstep at Sector 67, Gurugram.',
    },
  ];

  return (
    <SafeAreaView style={styles.outerSafeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFDF9" />

      <View style={styles.screenContainer}>
        <View style={styles.mobileCanvas}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* A. TOP CLOSE BUTTON */}
            <View style={styles.topCloseRow}>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => navigation.navigate('Onboarding7')}
                activeOpacity={0.7}
              >
                <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <Line x1="18" y1="6" x2="6" y2="18" />
                  <Line x1="6" y1="6" x2="18" y2="18" />
                </Svg>
              </TouchableOpacity>
            </View>

            {/* B. SUCCESS HEADER WITH SPARKLE CHECKMARK */}
            <View style={styles.successHeaderBlock}>
              <View style={styles.successBadgeWrap}>
                <View style={styles.sparkle1} />
                <View style={styles.sparkle2} />
                <View style={styles.sparkle3} />
                <View style={styles.successInnerCircle}>
                  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <Polyline points="20 6 9 17 4 12" />
                  </Svg>
                </View>
              </View>

              <View style={styles.successTextCol}>
                <Text style={styles.successTitle}>Order Placed{"\n"}Successfully!</Text>
                <Text style={styles.successThankYou}>Thank you for shopping with us 💚</Text>
                <Text style={styles.successSubText}>Your order is being prepared and will be delivered soon.</Text>
              </View>
            </View>

            {/* C. ORDER INFO 3-COL CARD */}
            <View style={styles.orderInfoCard}>
              <View style={styles.orderInfoCol}>
                <Text style={styles.orderInfoLabel}>Order Number</Text>
                <Text style={styles.orderInfoValue}>#ORD123456</Text>
              </View>

              <View style={[styles.orderInfoCol, styles.orderInfoColBorder]}>
                <Text style={styles.orderInfoLabel}>Order Date</Text>
                <Text style={styles.orderInfoValue}>7 Sep 2026, 09:41 AM</Text>
              </View>

              <View style={[styles.orderInfoCol, styles.orderInfoColBorder]}>
                <Text style={styles.orderInfoLabel}>Total Amount</Text>
                <Text style={styles.orderInfoValue}>₹136</Text>
              </View>
            </View>

            {/* D. ORDER TRACKING SECTION */}
            <View style={styles.sectionBlock}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionHeading}>Order Tracking</Text>
                <TouchableOpacity onPress={() => setShowDetailsModal(true)} activeOpacity={0.7}>
                  <Text style={styles.sectionActionLink}>View Details →</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.trackingFlowContainer}>
                {/* Step 1: Order Placed */}
                <TouchableOpacity
                  style={styles.trackStepItem}
                  onPress={() => setSelectedTrackStep(0)}
                  activeOpacity={0.7}
                >
                  <View style={styles.trackIconCircleActive}>
                    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <Line x1="3" y1="6" x2="21" y2="6" />
                      <Path d="M16 10a4 4 0 0 1-8 0" />
                    </Svg>
                  </View>
                  <Text style={styles.trackStepTitleActive}>Order Placed</Text>
                  <Text style={styles.trackStepSub}>09:41 AM</Text>
                </TouchableOpacity>

                {/* Connecting Line 1 -> 2 */}
                <View style={styles.trackConnectingLineCompleted} />

                {/* Step 2: Preparing */}
                <TouchableOpacity
                  style={styles.trackStepItem}
                  onPress={() => setSelectedTrackStep(1)}
                  activeOpacity={0.7}
                >
                  <View style={selectedTrackStep >= 1 ? styles.trackIconCircleActive : styles.trackIconCircleInactive}>
                    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={selectedTrackStep >= 1 ? '#FFFFFF' : '#64748B'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <Polyline points="21 8 21 21 3 21 3 8" />
                      <Rect x="1" y="3" width="22" height="5" />
                      <Line x1="10" y1="12" x2="14" y2="12" />
                    </Svg>
                  </View>
                  <Text style={selectedTrackStep >= 1 ? styles.trackStepTitleActive : styles.trackStepTitleInactive}>Preparing</Text>
                  <Text style={styles.trackStepSub}>We are getting your items ready</Text>
                </TouchableOpacity>

                {/* Connecting Line 2 -> 3 */}
                <View style={selectedTrackStep >= 2 ? styles.trackConnectingLineCompleted : styles.trackConnectingLinePending} />

                {/* Step 3: Out for Delivery */}
                <TouchableOpacity
                  style={styles.trackStepItem}
                  onPress={() => setSelectedTrackStep(2)}
                  activeOpacity={0.7}
                >
                  <View style={selectedTrackStep >= 2 ? styles.trackIconCircleActive : styles.trackIconCircleInactive}>
                    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={selectedTrackStep >= 2 ? '#FFFFFF' : '#64748B'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M1 3h15v13H1z" />
                      <Path d="M16 8h4l3 3v5h-7V8z" />
                      <Circle cx="5.5" cy="18.5" r="2.5" />
                      <Circle cx="18.5" cy="18.5" r="2.5" />
                    </Svg>
                  </View>
                  <Text style={selectedTrackStep >= 2 ? styles.trackStepTitleActive : styles.trackStepTitleInactive}>Out for Delivery</Text>
                  <Text style={styles.trackStepSub}>On the way to your location</Text>
                </TouchableOpacity>

                {/* Connecting Line 3 -> 4 */}
                <View style={selectedTrackStep >= 3 ? styles.trackConnectingLineCompleted : styles.trackConnectingLinePending} />

                {/* Step 4: Delivered */}
                <TouchableOpacity
                  style={styles.trackStepItem}
                  onPress={() => setSelectedTrackStep(3)}
                  activeOpacity={0.7}
                >
                  <View style={selectedTrackStep >= 3 ? styles.trackIconCircleActive : styles.trackIconCircleInactive}>
                    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={selectedTrackStep >= 3 ? '#FFFFFF' : '#64748B'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <Polyline points="9 22 9 12 15 12 15 22" />
                    </Svg>
                  </View>
                  <Text style={selectedTrackStep >= 3 ? styles.trackStepTitleActive : styles.trackStepTitleInactive}>Delivered</Text>
                  <Text style={styles.trackStepSub}>Enjoy your fresh groceries</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* E. DELIVERY DETAILS CARD */}
            <View style={styles.sectionBlock}>
              <View style={styles.deliveryDetailsCard}>
                {/* Left: Address */}
                <View style={styles.deliveryDetailsColLeft}>
                  <View style={styles.detailsIconCircle}>
                    <Svg width="14" height="14" viewBox="0 0 24 24" fill="#16A34A">
                      <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                    </Svg>
                  </View>
                  <View style={styles.detailsColText}>
                    <Text style={styles.detailsTag}>Delivering to</Text>
                    <Text style={styles.detailsTitle}>Home</Text>
                    <Text style={styles.detailsAddressLine}>H. No. 123, Sector 67, Gurugram, Haryana 122001</Text>
                    <Text style={styles.detailsPhone}>+91 98765 43210</Text>
                  </View>
                </View>

                {/* Right: Estimated Delivery */}
                <View style={styles.deliveryDetailsColRight}>
                  <View style={styles.detailsIconCircle}>
                    <Svg width="14" height="14" viewBox="0 0 24 24" fill="#16A34A">
                      <Circle cx="12" cy="12" r="10" />
                      <Polyline points="12 6 12 12 16 14" stroke="#FFFFFF" strokeWidth="2" fill="none" />
                    </Svg>
                  </View>
                  <View style={styles.detailsColText}>
                    <Text style={styles.detailsEstimateTag}>Estimated Delivery</Text>
                    <Text style={styles.detailsEstimateTime}>Today, 5 PM - 8 PM</Text>
                    <Text style={styles.detailsFreeTag}>FREE Delivery</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* F. ITEMS IN THIS ORDER (4) */}
            <View style={styles.sectionBlock}>
              <Text style={[styles.sectionHeading, { marginBottom: 8 }]}>Items in this order ({orderItems.length})</Text>
              <View style={styles.orderItemsGrid}>
                {orderItems.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.orderItemSmallCard}
                    onPress={() => navigation.navigate('ProductDetails')}
                    activeOpacity={0.8}
                  >
                    <View style={styles.orderItemImgWrap}>
                      <Image source={item.image} style={styles.orderItemImg} resizeMode="contain" />
                    </View>
                    <Text style={styles.orderItemName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.orderItemUnit}>{item.unit}</Text>
                    <View style={styles.orderItemPriceRow}>
                      <Text style={styles.orderItemCurrentPrice}>₹{item.price}</Text>
                      {item.oldPrice && (
                        <Text style={styles.orderItemOldPrice}>₹{item.oldPrice}</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* G. ACTION BUTTONS ROW */}
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity
                style={styles.viewOrderDetailsBtn}
                onPress={() => setShowDetailsModal(true)}
                activeOpacity={0.8}
              >
                <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <Polyline points="14 2 14 8 20 8" />
                  <Line x1="16" y1="13" x2="8" y2="13" />
                  <Line x1="16" y1="17" x2="8" y2="17" />
                  <Polyline points="10 9 9 9 8 9" />
                </Svg>
                <Text style={styles.viewOrderDetailsBtnText}>View Order Details</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.continueShoppingBtn}
                onPress={() => navigation.navigate('FreshVegetables')}
                activeOpacity={0.8}
              >
                <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <Circle cx="9" cy="21" r="1" />
                  <Circle cx="20" cy="21" r="1" />
                  <Path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </Svg>
                <Text style={styles.continueShoppingBtnText}>Continue Shopping</Text>
              </TouchableOpacity>
            </View>

            {/* H. PROMOTIONAL BANNER: GOOD FOOD HAPPIER YOU */}
            <View style={styles.promoBannerCard}>
              <View style={styles.promoContentCol}>
                <Text style={styles.promoMainTitle}>Good Food{"\n"}Happier You</Text>
                <Text style={styles.promoSubText}>
                  Fresh essentials, delivered to your doorstep.
                </Text>
                <TouchableOpacity
                  style={styles.shopMoreBtn}
                  onPress={() => navigation.navigate('FruitsVegetables')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.shopMoreBtnText}>Shop More</Text>
                  <Svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M5 12h14" />
                    <Path d="M12 5l7 7-7 7" />
                  </Svg>
                </TouchableOpacity>
              </View>

              <Image
                source={require('../../assets/order_promo_basket.png')}
                style={styles.promoBasketImg}
                resizeMode="contain"
              />
            </View>

            {/* I. NEED HELP CARD */}
            <View style={styles.needHelpCard}>
              <View style={styles.needHelpLeft}>
                <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <Path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </Svg>
                <View style={styles.needHelpTextCol}>
                  <Text style={styles.needHelpTitle}>Need Help?</Text>
                  <Text style={styles.needHelpSub}>We're here for you. Contact our support team anytime.</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.getHelpBtn}
                onPress={() => setShowHelpModal(true)}
                activeOpacity={0.7}
              >
                <Text style={styles.getHelpBtnText}>Get Help</Text>
                <Svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M5 12h14" />
                  <Path d="M12 5l7 7-7 7" />
                </Svg>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* J. FIXED BOTTOM NAVIGATION BAR */}
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

              {/* Orders (Active) */}
              <TouchableOpacity
                style={styles.navTab}
                activeOpacity={0.7}
              >
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="#16A34A" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <Line x1="3" y1="6" x2="21" y2="6" stroke="#FFFFFF" strokeWidth="1.5" />
                  <Path d="M16 10a4 4 0 0 1-8 0" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
                </Svg>
                <Text style={[styles.navLabel, styles.navLabelActive]}>Orders</Text>
              </TouchableOpacity>

              {/* Offers */}
              <TouchableOpacity
                style={styles.navTab}
                onPress={() => setShowOffersModal(true)}
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

      {/* MODAL 1: ORDER DETAILS & RECEIPT */}
      <Modal visible={showDetailsModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentBox}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Order Details #ORD123456</Text>
              <TouchableOpacity onPress={() => setShowDetailsModal(false)} style={styles.modalCloseIconBtn}>
                <Svg width="18" height="18" viewBox="0 0 24 24" stroke="#475569" strokeWidth="2.5" fill="none">
                  <Line x1="18" y1="6" x2="6" y2="18" />
                  <Line x1="6" y1="6" x2="18" y2="18" />
                </Svg>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 340 }}>
              <View style={styles.modalReceiptSection}>
                <Text style={styles.modalSectionLabel}>Delivery Location:</Text>
                <Text style={styles.modalBodyTextBold}>Aryan Mangla</Text>
                <Text style={styles.modalBodyText}>H. No. 123, Sector 67, Gurugram, Haryana 122001</Text>
                <Text style={styles.modalBodyText}>Phone: +91 98765 43210</Text>
              </View>

              <View style={styles.modalReceiptSection}>
                <Text style={styles.modalSectionLabel}>Items Summary (4 items):</Text>
                {orderItems.map(item => (
                  <View key={item.id} style={styles.modalItemRow}>
                    <Text style={styles.modalItemName}>{item.name} ({item.unit})</Text>
                    <Text style={styles.modalItemPrice}>₹{item.price}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.modalReceiptSection}>
                <View style={styles.modalItemRow}>
                  <Text style={styles.modalBodyText}>Payment Mode:</Text>
                  <Text style={styles.modalBodyTextBold}>UPI (Verified ✓)</Text>
                </View>
                <View style={styles.modalItemRow}>
                  <Text style={styles.modalBodyText}>Delivery Charge:</Text>
                  <Text style={{ color: '#16A34A', fontWeight: '700', fontSize: 11 }}>FREE</Text>
                </View>
                <View style={[styles.modalItemRow, { marginTop: 4, borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingTop: 4 }]}>
                  <Text style={styles.modalTitle}>Total Paid:</Text>
                  <Text style={styles.modalPriceHighlight}>₹136</Text>
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity style={styles.modalPrimaryBtn} onPress={() => setShowDetailsModal(false)}>
              <Text style={styles.modalPrimaryBtnText}>Close Receipt</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL 2: CUSTOMER SUPPORT & HELP */}
      <Modal visible={showHelpModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentBox}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Freshora Help Center</Text>
              <TouchableOpacity onPress={() => setShowHelpModal(false)} style={styles.modalCloseIconBtn}>
                <Svg width="18" height="18" viewBox="0 0 24 24" stroke="#475569" strokeWidth="2.5" fill="none">
                  <Line x1="18" y1="6" x2="6" y2="18" />
                  <Line x1="6" y1="6" x2="18" y2="18" />
                </Svg>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalBodyText}>How can we assist you with order #ORD123456?</Text>

            <View style={{ gap: 8, marginVertical: 12 }}>
              <TouchableOpacity style={styles.helpActionCard} onPress={() => setShowHelpModal(false)}>
                <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2">
                  <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </Svg>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={styles.helpCardTitle}>Live Chat with Support</Text>
                  <Text style={styles.helpCardSub}>Average response time: 1 minute</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.helpActionCard} onPress={() => setShowHelpModal(false)}>
                <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2">
                  <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </Svg>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={styles.helpCardTitle}>Call Us (Toll-Free)</Text>
                  <Text style={styles.helpCardSub}>+91 1800-FRESHORA (24x7)</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.helpActionCard} onPress={() => setShowHelpModal(false)}>
                <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2">
                  <Circle cx="12" cy="12" r="10" />
                  <Line x1="12" y1="8" x2="12" y2="12" />
                  <Line x1="12" y1="16" x2="12.01" y2="16" />
                </Svg>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={styles.helpCardTitle}>Change Delivery Instructions</Text>
                  <Text style={styles.helpCardSub}>Add gate code or delivery note</Text>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.modalPrimaryBtn} onPress={() => setShowHelpModal(false)}>
              <Text style={styles.modalPrimaryBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL 3: EXCLUSIVE OFFERS MODAL */}
      <Modal visible={showOffersModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentBox}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>🎉 Special Offers For You</Text>
              <TouchableOpacity onPress={() => setShowOffersModal(false)} style={styles.modalCloseIconBtn}>
                <Svg width="18" height="18" viewBox="0 0 24 24" stroke="#475569" strokeWidth="2.5" fill="none">
                  <Line x1="18" y1="6" x2="6" y2="18" />
                  <Line x1="6" y1="6" x2="18" y2="18" />
                </Svg>
              </TouchableOpacity>
            </View>

            <View style={{ gap: 8, marginVertical: 10 }}>
              <View style={styles.modalOfferCard}>
                <Text style={styles.modalOfferTitle}>FRESH50 - 50% OFF</Text>
                <Text style={styles.modalOfferSub}>Valid on your next organic vegetable purchase!</Text>
              </View>
              <View style={styles.modalOfferCard}>
                <Text style={styles.modalOfferTitle}>FREE SHIP - Free Delivery</Text>
                <Text style={styles.modalOfferSub}>Free express 2-hour shipping on orders above ₹99.</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.modalPrimaryBtn}
              onPress={() => {
                setShowOffersModal(false);
                navigation.navigate('FreshVegetables');
              }}
            >
              <Text style={styles.modalPrimaryBtnText}>Shop Fresh Offers</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
