import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import Svg, { Path, Rect, Circle, Line, Polyline, Polygon } from 'react-native-svg';
import { styles } from './ProfileView.styles';
import { authService } from '../services/authService';
import { cartService } from '../services/cartService';

export default function ProfileView({ navigation }) {
  const [userName, setUserName] = useState('Aryan Mangla');
  const [userPhone, setUserPhone] = useState('+91 98765 43210');
  const [userEmail, setUserEmail] = useState('aryan.mangla@example.com');
  const [cartCount, setCartCount] = useState(4);
  const [activeModal, setActiveModal] = useState(null); // 'edit' | 'benefits' | 'wallet' | 'offers' | 'refer' | 'support' | 'settings' | 'address'

  useEffect(() => {
    authService.getMe().then(user => {
      if (user) {
        if (user.name) setUserName(user.name);
        if (user.phone) setUserPhone(user.phone);
        if (user.email) setUserEmail(user.email);
      }
    }).catch(() => {});

    cartService.getCart().then(cart => {
      if (cart && typeof cart.totalItemCount === 'number') {
        setCartCount(cart.totalItemCount);
      }
    }).catch(() => {});
  }, []);

  // Menu items list
  const menuItems = [
    {
      id: 'addresses',
      title: 'My Addresses',
      subtitle: 'Manage your delivery addresses',
      badge: null,
      iconType: 'pin',
    },
    {
      id: 'payments',
      title: 'Payment Methods',
      subtitle: 'UPI, Cards, Wallets and more',
      badge: null,
      iconType: 'card',
    },
    {
      id: 'wallet',
      title: 'My Wallet',
      subtitle: 'View balance and transactions',
      badge: '₹250',
      iconType: 'wallet',
    },
    {
      id: 'offers',
      title: 'My Offers',
      subtitle: 'View and apply your coupons',
      badge: '3 new',
      iconType: 'offer',
    },
    {
      id: 'wishlist',
      title: 'My Wishlist',
      subtitle: 'Your saved products',
      badge: null,
      iconType: 'heart',
    },
    {
      id: 'refer',
      title: 'Refer & Earn',
      subtitle: 'Invite friends and earn rewards',
      badge: null,
      iconType: 'users',
    },
    {
      id: 'support',
      title: 'Help & Support',
      subtitle: 'Get help with your orders',
      badge: null,
      iconType: 'headset',
    },
    {
      id: 'settings',
      title: 'Settings',
      subtitle: 'App preferences and notifications',
      badge: null,
      iconType: 'gear',
    },
  ];

  const handleMenuPress = (item) => {
    if (item.id === 'wishlist') {
      navigation.navigate('FreshVegetables');
    } else {
      setActiveModal(item.id);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out from Freshora?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => navigation.navigate('Onboarding'),
        },
      ]
    );
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
                onPress={() => Alert.alert('Location', 'Sector 67, Gurugram 122001')}
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
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cartCount}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* B. USER PROFILE CARD */}
            <View style={styles.profileHeaderCard}>
              <View style={styles.profileLeftCol}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={require('../../assets/user_aryan.png')}
                    style={styles.avatarImage}
                    resizeMode="cover"
                  />
                  <View style={styles.cameraIconBadge}>
                    <Svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <Circle cx="12" cy="13" r="4" />
                    </Svg>
                  </View>
                </View>

                <View style={styles.userInfoCol}>
                  <Text style={styles.userNameText}>{userName}</Text>
                  <Text style={styles.userPhoneText}>{userPhone}</Text>
                  <Text style={styles.userEmailText}>{userEmail}</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.editProfileBtn}
                onPress={() => setActiveModal('edit')}
                activeOpacity={0.7}
              >
                <Svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M12 20h9" />
                  <Path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </Svg>
                <Text style={styles.editProfileBtnText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>

            {/* C. GOLD MEMBER BANNER */}
            <View style={styles.goldMemberBanner}>
              <View style={styles.goldLeftCol}>
                <View style={styles.crownIconWrap}>
                  <Svg width="18" height="18" viewBox="0 0 24 24" fill="#D97706">
                    <Path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14v2H5v-2z" />
                  </Svg>
                </View>
                <View>
                  <Text style={styles.goldTitle}>Gold Member</Text>
                  <Text style={styles.goldSub}>Save more. Shop smarter.</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.viewBenefitsBtn}
                onPress={() => setActiveModal('benefits')}
                activeOpacity={0.7}
              >
                <Text style={styles.viewBenefitsText}>View Benefits</Text>
                <Svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M5 12h14" />
                  <Path d="M12 5l7 7-7 7" />
                </Svg>
              </TouchableOpacity>
            </View>

            {/* D. MY ORDERS SECTION */}
            <View style={styles.sectionBlock}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionHeading}>My Orders</Text>
                <TouchableOpacity onPress={() => navigation.navigate('OrderSuccess')} activeOpacity={0.7}>
                  <Text style={styles.sectionActionLink}>View All →</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.ordersActionGrid}>
                {/* 1. To Be Delivered */}
                <TouchableOpacity
                  style={styles.orderActionCard}
                  onPress={() => navigation.navigate('OrderSuccess')}
                  activeOpacity={0.7}
                >
                  <View style={styles.orderActionIconCircle}>
                    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <Line x1="3" y1="6" x2="21" y2="6" />
                      <Path d="M16 10a4 4 0 0 1-8 0" />
                    </Svg>
                  </View>
                  <Text style={styles.orderActionTitle}>To Be Delivered</Text>
                  <Text style={styles.orderActionCount}>1 order</Text>
                </TouchableOpacity>

                {/* 2. Out for Delivery */}
                <TouchableOpacity
                  style={styles.orderActionCard}
                  onPress={() => navigation.navigate('OrderSuccess')}
                  activeOpacity={0.7}
                >
                  <View style={styles.orderActionIconCircle}>
                    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M1 3h15v13H1z" />
                      <Path d="M16 8h4l3 3v5h-7V8z" />
                      <Circle cx="5.5" cy="18.5" r="2.5" />
                      <Circle cx="18.5" cy="18.5" r="2.5" />
                    </Svg>
                  </View>
                  <Text style={styles.orderActionTitle}>Out for Delivery</Text>
                  <Text style={styles.orderActionCount}>0 orders</Text>
                </TouchableOpacity>

                {/* 3. Delivered */}
                <TouchableOpacity
                  style={styles.orderActionCard}
                  onPress={() => navigation.navigate('OrderSuccess')}
                  activeOpacity={0.7}
                >
                  <View style={styles.orderActionIconCircle}>
                    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M21 8v13H3V8" />
                      <Path d="M1 3h22v5H1z" />
                      <Path d="M10 12h4" />
                    </Svg>
                  </View>
                  <Text style={styles.orderActionTitle}>Delivered</Text>
                  <Text style={styles.orderActionCount}>12 orders</Text>
                </TouchableOpacity>

                {/* 4. Returns */}
                <TouchableOpacity
                  style={styles.orderActionCard}
                  onPress={() => Alert.alert('Returns', 'No active return requests.')}
                  activeOpacity={0.7}
                >
                  <View style={styles.orderActionIconCircle}>
                    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <Polyline points="1 4 1 10 7 10" />
                      <Path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                    </Svg>
                  </View>
                  <Text style={styles.orderActionTitle}>Returns</Text>
                  <Text style={styles.orderActionCount}>0 orders</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* E. MENU LIST CARD */}
            <View style={styles.menuCard}>
              {menuItems.map((item, idx) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItemRow,
                    idx === menuItems.length - 1 && styles.menuItemRowLast,
                  ]}
                  onPress={() => handleMenuPress(item)}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIconWrap}>
                      {item.iconType === 'pin' && (
                        <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2">
                          <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <Circle cx="12" cy="10" r="3" />
                        </Svg>
                      )}
                      {item.iconType === 'card' && (
                        <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2">
                          <Rect x="1" y="4" width="22" height="16" rx="2" />
                          <Line x1="1" y1="10" x2="23" y2="10" />
                        </Svg>
                      )}
                      {item.iconType === 'wallet' && (
                        <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2">
                          <Path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
                          <Path d="M4 6v12a2 2 0 0 0 2 2h14v-4" />
                          <Path d="M18 12a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4v-6h-4z" />
                        </Svg>
                      )}
                      {item.iconType === 'offer' && (
                        <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2">
                          <Polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </Svg>
                      )}
                      {item.iconType === 'heart' && (
                        <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2">
                          <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </Svg>
                      )}
                      {item.iconType === 'users' && (
                        <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2">
                          <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <Circle cx="9" cy="7" r="4" />
                          <Path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <Path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </Svg>
                      )}
                      {item.iconType === 'headset' && (
                        <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2">
                          <Path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                          <Path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                        </Svg>
                      )}
                      {item.iconType === 'gear' && (
                        <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2">
                          <Circle cx="12" cy="12" r="3" />
                          <Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </Svg>
                      )}
                    </View>

                    <View style={styles.menuTexts}>
                      <Text style={styles.menuTitle}>{item.title}</Text>
                      <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                    </View>
                  </View>

                  <View style={styles.menuRight}>
                    {item.badge && (
                      <View style={styles.menuBadge}>
                        <Text style={styles.menuBadgeText}>{item.badge}</Text>
                      </View>
                    )}
                    <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M9 18l6-6-6-6" />
                    </Svg>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* F. LOGOUT BUTTON */}
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={handleLogout}
              activeOpacity={0.8}
            >
              <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <Polyline points="16 17 21 12 16 7" />
                <Line x1="21" y1="12" x2="9" y2="12" />
              </Svg>
              <Text style={styles.logoutBtnText}>Logout</Text>
            </TouchableOpacity>

            {/* G. PROMOTIONAL BANNER: GOOD FOOD HAPPIER YOU */}
            <View style={styles.promoBannerCard}>
              <View style={styles.promoContentCol}>
                <Text style={styles.promoMainTitle}>Good Food{"\n"}Happier You</Text>
                <Text style={styles.promoSubText}>
                  Fresh groceries for a healthier tomorrow.
                </Text>
                <TouchableOpacity
                  style={styles.shopMoreBtn}
                  onPress={() => navigation.navigate('FruitsVegetables')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.shopMoreBtnText}>Shop Now</Text>
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
          </ScrollView>

          {/* H. FIXED BOTTOM NAVIGATION BAR */}
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
                onPress={() => navigation.navigate('OrderSuccess')}
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
                onPress={() => setActiveModal('offers')}
                activeOpacity={0.7}
              >
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <Line x1="7" y1="7" x2="7.01" y2="7" />
                </Svg>
                <View style={styles.offerBadge} />
                <Text style={styles.navLabel}>Offers</Text>
              </TouchableOpacity>

              {/* Profile (Active) */}
              <TouchableOpacity
                style={styles.navTab}
                activeOpacity={0.7}
              >
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="#16A34A" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <Circle cx="12" cy="7" r="4" />
                </Svg>
                <Text style={[styles.navLabel, styles.navLabelActive]}>Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* MODALS */}
      <Modal visible={activeModal !== null} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentBox}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>
                {activeModal === 'edit' && 'Edit Profile'}
                {activeModal === 'benefits' && '👑 Gold Membership'}
                {activeModal === 'wallet' && '💳 Freshora Wallet'}
                {activeModal === 'offers' && '🎁 Active Coupons'}
                {activeModal === 'refer' && '👥 Refer & Earn'}
                {activeModal === 'support' && '🎧 Help & Support'}
                {activeModal === 'settings' && '⚙️ App Settings'}
                {activeModal === 'addresses' && '📍 Saved Addresses'}
                {activeModal === 'payments' && '💳 Payment Methods'}
              </Text>
              <TouchableOpacity onPress={() => setActiveModal(null)} style={styles.modalCloseBtn}>
                <Svg width="18" height="18" viewBox="0 0 24 24" stroke="#475569" strokeWidth="2.5" fill="none">
                  <Line x1="18" y1="6" x2="6" y2="18" />
                  <Line x1="6" y1="6" x2="18" y2="18" />
                </Svg>
              </TouchableOpacity>
            </View>

            {activeModal === 'edit' && (
              <View style={{ gap: 8 }}>
                <Text style={styles.modalBodyText}>Name:</Text>
                <TextInput
                  value={userName}
                  onChangeText={setUserName}
                  style={{ borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, padding: 8, fontSize: 12 }}
                />
                <Text style={styles.modalBodyText}>Phone:</Text>
                <TextInput
                  value={userPhone}
                  onChangeText={setUserPhone}
                  style={{ borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, padding: 8, fontSize: 12 }}
                />
                <Text style={styles.modalBodyText}>Email:</Text>
                <TextInput
                  value={userEmail}
                  onChangeText={setUserEmail}
                  style={{ borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, padding: 8, fontSize: 12 }}
                />
              </View>
            )}

            {activeModal === 'benefits' && (
              <View style={{ gap: 6 }}>
                <Text style={styles.modalBodyText}>✓ Unlimited Free Delivery on orders above ₹99</Text>
                <Text style={styles.modalBodyText}>✓ Extra 5% cashback on all organic veggies</Text>
                <Text style={styles.modalBodyText}>✓ Priority 2-hour express delivery slots</Text>
              </View>
            )}

            {activeModal === 'wallet' && (
              <View style={{ gap: 6 }}>
                <Text style={[styles.modalTitle, { color: '#16A34A', fontSize: 18 }]}>Current Balance: ₹250</Text>
                <Text style={styles.modalBodyText}>Available for all orders. Instant 1-click checkout.</Text>
              </View>
            )}

            {activeModal === 'offers' && (
              <View style={{ gap: 6 }}>
                <Text style={styles.modalBodyText}>• FRESH50 - 50% discount on fresh greens</Text>
                <Text style={styles.modalBodyText}>• FREEVEG - Free 1kg Potato with order</Text>
                <Text style={styles.modalBodyText}>• GOLDDEL - Free Express shipping voucher</Text>
              </View>
            )}

            {activeModal === 'refer' && (
              <View style={{ gap: 6 }}>
                <Text style={styles.modalBodyText}>Share code: <Text style={{ fontWeight: '800', color: '#16A34A' }}>ARYAN100</Text></Text>
                <Text style={styles.modalBodyText}>Earn ₹100 wallet cashback when your friend places their first order!</Text>
              </View>
            )}

            {activeModal === 'support' && (
              <View style={{ gap: 6 }}>
                <Text style={styles.modalBodyText}>Need help with orders or refunds?</Text>
                <Text style={[styles.modalBodyText, { fontWeight: '700' }]}>📞 1800-FRESHORA (24x7 Toll-Free)</Text>
              </View>
            )}

            {activeModal === 'settings' && (
              <View style={{ gap: 6 }}>
                <Text style={styles.modalBodyText}>• Order notifications: ON</Text>
                <Text style={styles.modalBodyText}>• Promotional offers: ON</Text>
                <Text style={styles.modalBodyText}>• Dark mode: Automatic</Text>
              </View>
            )}

            {activeModal === 'addresses' && (
              <View style={{ gap: 6 }}>
                <Text style={[styles.modalBodyText, { fontWeight: '800' }]}>Home (Default):</Text>
                <Text style={styles.modalBodyText}>H. No. 123, Sector 67, Gurugram, Haryana 122001</Text>
              </View>
            )}

            {activeModal === 'payments' && (
              <View style={{ gap: 6 }}>
                <Text style={styles.modalBodyText}>• Google Pay UPI (aryan@okhdfcbank)</Text>
                <Text style={styles.modalBodyText}>• HDFC Bank Visa Card (ending in 4821)</Text>
                <Text style={styles.modalBodyText}>• Freshora Wallet (₹250)</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.modalPrimaryBtn}
              onPress={() => {
                if (activeModal === 'edit') {
                  authService.updateProfile({ name: userName, phone: userPhone, email: userEmail }).catch(() => {});
                }
                setActiveModal(null);
              }}
            >
              <Text style={styles.modalPrimaryBtnText}>Save & Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
