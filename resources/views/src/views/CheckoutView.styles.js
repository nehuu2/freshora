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
    paddingBottom: 95,
  },

  // A. TOP HEADER BAR
  topHeaderBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: Platform.OS === 'android' ? 12 : 8,
    paddingBottom: 8,
  },
  headerLeftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  backBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleBlock: {
    flex: 1,
  },
  mainTitleText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F2E1E',
    letterSpacing: -0.2,
  },
  subtitleText: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 1,
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  secureTextCol: {
    alignItems: 'flex-start',
  },
  secureMainText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#16A34A',
  },
  secureSubText: {
    fontSize: 7.5,
    color: '#64748B',
  },

  // B. STEP PROGRESS INDICATOR
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 6,
    marginBottom: 14,
    position: 'relative',
  },
  stepItem: {
    alignItems: 'center',
    zIndex: 2,
  },
  stepCircleActive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#16A34A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleInactive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberActive: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stepNumberInactive: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  stepLabel: {
    fontSize: 9.5,
    color: '#64748B',
    marginTop: 4,
  },
  stepLabelActive: {
    color: '#16A34A',
    fontWeight: '700',
  },
  stepConnectingLineCompleted: {
    flex: 1,
    height: 2,
    backgroundColor: '#16A34A',
    marginBottom: 16,
    marginHorizontal: -4,
  },
  stepConnectingLinePending: {
    flex: 1,
    height: 2,
    backgroundColor: '#CBD5E1',
    marginBottom: 16,
    marginHorizontal: -4,
  },

  // C. DELIVERY ADDRESS SECTION
  sectionBlock: {
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F2E1E',
  },
  sectionActionLink: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16A34A',
  },
  addressCard: {
    backgroundColor: '#EAF7EE',
    borderWidth: 1,
    borderColor: '#C6EBD0',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addressLeftCol: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    flex: 1,
    paddingRight: 6,
  },
  addressIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#16A34A',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  addressDetails: {
    flex: 1,
  },
  addressTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addressType: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F2E1E',
  },
  recipientName: {
    fontSize: 10.5,
    color: '#334155',
    fontWeight: '600',
    marginTop: 1,
  },
  addressLine: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 1,
    lineHeight: 14,
  },
  phoneLine: {
    fontSize: 10,
    color: '#0F2E1E',
    fontWeight: '600',
    marginTop: 2,
  },
  changeAddressBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#16A34A',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  changeAddressBtnText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#16A34A',
  },

  // D. ORDER ITEMS LIST
  orderItemsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEFEA',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  orderItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  orderItemRowLast: {
    borderBottomWidth: 0,
  },
  itemLeftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  itemThumb: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    ...(Platform.OS === 'web'
      ? {
          objectFit: 'contain',
          objectPosition: 'center',
        }
      : {}),
  },
  itemInfoCol: {
    flex: 1,
  },
  itemName: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#0F2E1E',
  },
  itemUnit: {
    fontSize: 9.5,
    color: '#64748B',
    marginTop: 1,
  },
  qtyPill: {
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 12,
  },
  qtyPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  itemPriceCol: {
    alignItems: 'flex-end',
    minWidth: 40,
  },
  itemPrice: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F2E1E',
  },
  itemOldPrice: {
    fontSize: 9.5,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },

  // E. DELIVERY OPTIONS
  deliveryOptionsRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  deliveryOptCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deliveryOptCardActive: {
    backgroundColor: '#EAF7EE',
    borderColor: '#16A34A',
    borderWidth: 1.5,
  },
  deliveryOptLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  deliveryOptDetails: {
    flex: 1,
  },
  deliveryOptTitle: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#0F2E1E',
  },
  deliveryOptTime: {
    fontSize: 8.5,
    color: '#64748B',
    marginTop: 1,
  },
  deliveryOptPriceFree: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#16A34A',
    marginTop: 1,
  },
  deliveryOptPricePaid: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#0F2E1E',
    marginTop: 1,
  },
  radioCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  radioCircleActive: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#16A34A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
  },

  // F. PAYMENT METHODS
  paymentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEFEA',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  paymentRowLast: {
    borderBottomWidth: 0,
  },
  paymentLeftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  paymentIconWrap: {
    width: 32,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentTexts: {
    flex: 1,
  },
  paymentName: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#0F2E1E',
  },
  paymentSub: {
    fontSize: 9,
    color: '#64748B',
    marginTop: 1,
  },

  // G. ORDER SUMMARY
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 11,
    color: '#0F2E1E',
    fontWeight: '700',
  },
  summaryDiscountVal: {
    fontSize: 11,
    color: '#16A34A',
    fontWeight: '700',
  },
  deliveryChargeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deliveryOldVal: {
    fontSize: 10.5,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  deliveryFreeVal: {
    fontSize: 11,
    color: '#16A34A',
    fontWeight: '800',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 6,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F2E1E',
  },
  totalValue: {
    fontSize: 17,
    fontWeight: '900',
    color: '#0F2E1E',
  },
  savingsBanner: {
    backgroundColor: '#EAF7EE',
    borderWidth: 1,
    borderColor: '#C6EBD0',
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  savingsBannerText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#16A34A',
  },

  // H. PLACE ORDER BUTTON
  placeOrderBtn: {
    backgroundColor: '#16A34A',
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  placeOrderBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // I. FIXED BOTTOM NAVIGATION
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
