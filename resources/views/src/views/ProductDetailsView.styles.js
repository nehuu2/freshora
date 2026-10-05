import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
  outerSafeArea: {
    flex: 1,
    backgroundColor: '#FAFDF9',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#EEF2F6',
    alignItems: 'center',
  },
  mobileCanvas: {
    width: '100%',
    maxWidth: 480,
    flex: 1,
    backgroundColor: '#FAFDF9',
    position: 'relative',
  },
  scrollContent: {
    paddingBottom: 85,
  },

  // A. TOP HEADER BAR
  topHeaderBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: Platform.OS === 'android' ? 12 : 8,
    paddingBottom: 6,
  },
  locationSelector: {
    flex: 1,
  },
  locationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deliveringToText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  locationAddressText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#0F2E1E',
    marginTop: 1,
  },
  rightActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 7,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },
  cartBadge: {
    position: 'absolute',
    top: -3,
    right: -3,
    backgroundColor: '#16A34A',
    borderRadius: 9,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },

  // B. SEARCH BAR
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 12,
    marginTop: 4,
    marginBottom: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    height: 40,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: '#0F2E1E',
    paddingVertical: 0,
  },
  qrButton: {
    padding: 2,
  },

  // C. BREADCRUMBS ROW
  breadcrumbsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 4,
    marginBottom: 8,
    gap: 8,
  },
  backBtn: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  breadcrumbTexts: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  breadcrumbLink: {
    fontSize: 10.5,
    color: '#64748B',
    fontWeight: '500',
  },
  breadcrumbSeparator: {
    fontSize: 10,
    color: '#94A3B8',
  },
  breadcrumbCurrent: {
    fontSize: 10.5,
    color: '#0F2E1E',
    fontWeight: '700',
  },

  // D. PRODUCT SHOWCASE SECTION
  showcaseSection: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    gap: 8,
    alignItems: 'flex-start',
  },
  thumbnailColumn: {
    width: 44,
    gap: 6,
  },
  thumbnailItem: {
    width: 42,
    height: 42,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  thumbnailItemActive: {
    borderColor: '#16A34A',
    borderWidth: 1.5,
  },
  thumbImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  playOverlay: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainImageContainer: {
    flex: 1,
    height: 210,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EAEFEA',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  mainDiscountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#16A34A',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 2,
  },
  mainDiscountText: {
    color: '#FFFFFF',
    fontSize: 8.5,
    fontWeight: '700',
  },
  expandBtn: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  mainProductImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    ...(Platform.OS === 'web'
      ? {
          objectFit: 'contain',
          objectPosition: 'center',
        }
      : {}),
  },

  // E. PRODUCT TITLE & DETAILS
  titleSection: {
    paddingHorizontal: 12,
    marginTop: 10,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F2E1E',
    letterSpacing: -0.2,
  },
  shareWishRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionIconBtn: {
    padding: 2,
  },
  productSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F2E1E',
  },
  reviewsText: {
    fontSize: 10.5,
    color: '#64748B',
  },

  // F. PRICE ROW
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginTop: 6,
  },
  currentPrice: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F2E1E',
  },
  oldPrice: {
    fontSize: 13,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  discountPill: {
    backgroundColor: '#16A34A',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountPillText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  taxText: {
    fontSize: 9.5,
    color: '#64748B',
    marginTop: 2,
  },

  // G. DESCRIPTION & HIGHLIGHTS
  descriptionParagraph: {
    fontSize: 10.5,
    color: '#475569',
    lineHeight: 14.5,
    marginTop: 8,
    paddingHorizontal: 12,
  },
  highlightsContainer: {
    paddingHorizontal: 12,
    marginTop: 8,
    gap: 5,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  highlightText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#0F2E1E',
  },

  // H. SELECT QUANTITY
  sectionBlock: {
    paddingHorizontal: 12,
    marginTop: 14,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F2E1E',
    marginBottom: 8,
  },
  qtyRow: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'space-between',
  },
  qtyCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyCardActive: {
    borderColor: '#16A34A',
    backgroundColor: '#EAF7EE',
    borderWidth: 1.5,
  },
  qtyWeightText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F2E1E',
  },
  qtyPriceText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#475569',
    marginTop: 2,
  },

  // I. ACTION BUTTONS (ADD TO CART / BUY NOW)
  ctaButtonsRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginTop: 12,
    gap: 8,
  },
  addToCartBtn: {
    flex: 1,
    backgroundColor: '#EAF7EE',
    borderWidth: 1.5,
    borderColor: '#16A34A',
    borderRadius: 8,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  addToCartBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#16A34A',
  },
  buyNowBtn: {
    flex: 1,
    backgroundColor: '#16A34A',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyNowBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // J. DELIVERY INFO CARD
  deliveryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    marginHorizontal: 12,
    marginTop: 12,
    padding: 8,
  },
  deliveryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  deliveryTextCol: {
    flex: 1,
  },
  deliveryMainText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#0F2E1E',
  },
  deliverySubText: {
    fontSize: 9,
    color: '#64748B',
    marginTop: 1,
  },
  pincodeBtn: {
    backgroundColor: '#EAF7EE',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  pincodeBtnText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#16A34A',
  },

  // K. PRODUCT DETAILS & BADGE
  detailsBadgeSection: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginTop: 14,
    gap: 8,
  },
  detailsCol: {
    flex: 1.4,
  },
  detailsHeading: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#0F2E1E',
    marginBottom: 4,
  },
  detailsBodyText: {
    fontSize: 9.5,
    color: '#64748B',
    lineHeight: 13.5,
  },
  farmBadgeCard: {
    flex: 1,
    backgroundColor: '#EAF7EE',
    borderWidth: 1,
    borderColor: '#C6EBD0',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  farmBadgeTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#16A34A',
    textAlign: 'center',
    marginTop: 3,
  },
  farmBadgeSub: {
    fontSize: 8.5,
    fontWeight: '600',
    color: '#3A6B48',
    textAlign: 'center',
    marginTop: 2,
  },

  // L. NUTRITIONAL INFORMATION
  nutritionSection: {
    paddingHorizontal: 12,
    marginTop: 14,
  },
  nutritionHeading: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#0F2E1E',
    marginBottom: 8,
  },
  nutritionRow: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'space-between',
  },
  nutritionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  nutritionValText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F2E1E',
  },
  nutritionLabelText: {
    fontSize: 8.5,
    color: '#64748B',
    marginTop: 2,
  },

  // M. YOU MAY ALSO LIKE
  recomSection: {
    paddingHorizontal: 12,
    marginTop: 14,
    marginBottom: 10,
  },
  recomHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recomTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F2E1E',
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seeAllText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#16A34A',
  },
  recomGrid: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'space-between',
  },
  recomCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EAEFEA',
    padding: 5,
    justifyContent: 'space-between',
  },
  recomImgWrap: {
    width: '100%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  recomProductImage: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
  },
  recomName: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#0F2E1E',
  },
  recomUnit: {
    fontSize: 8,
    color: '#64748B',
    marginTop: 1,
  },
  recomBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  recomPrice: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#0F2E1E',
  },
  recomAddBtn: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#16A34A',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  recomAddBtnAdded: {
    backgroundColor: '#16A34A',
  },

  // N. FIXED BOTTOM NAVIGATION
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    alignItems: 'center',
    zIndex: 100,
  },
  bottomNavCanvas: {
    width: '100%',
    maxWidth: 480,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: Platform.OS === 'ios' ? 18 : 8,
  },
  navTab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'relative',
  },
  navLabel: {
    fontSize: 9.5,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 2,
  },
  navLabelActive: {
    color: '#16A34A',
    fontWeight: '700',
  },
  offerBadge: {
    position: 'absolute',
    top: -2,
    right: 24,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },
});
