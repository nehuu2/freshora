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
  Platform,
} from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { styles } from './OnboardingPage5View.styles';
import { authService } from '../services/authService';

export default function OnboardingPage5View({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleCreateAccount = async () => {
    if (fullName || mobileNumber) {
      try {
        await authService.register({
          fullName: fullName || 'Aryan Mangla',
          mobileNumber: mobileNumber || '+91 98765 43210',
          email: email || undefined,
          password: password || undefined,
        });
      } catch (err) {
        // Continue to navigation even on network error
      }
    }
    if (navigation) {
      if (typeof navigation.navigate === 'function') {
        navigation.navigate('Onboarding6');
      } else if (typeof navigation.replace === 'function') {
        navigation.replace('Onboarding6');
      }
    }
  };


  const handleLoginNav = () => {
    if (navigation) {
      if (typeof navigation.navigate === 'function') {
        navigation.navigate('Onboarding6');
      } else if (typeof navigation.replace === 'function') {
        navigation.replace('Onboarding6');
      }
    }
  };


  return (
    <SafeAreaView style={styles.outerSafeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#D6EBD8" hidden={true} />
      <View style={styles.screenContainer}>
        <View style={styles.mobileCanvas}>

          {/* TOP SECTION: EXISTING BACKGROUND IMAGE */}
          <View style={styles.topImageContainer}>
            <Image
              source={require('../../assets/page5_full_artwork.png')}
              style={styles.backgroundImage}
              resizeMode="cover"
            />
          </View>

          {/* OVERLAPPING WHITE ACCOUNT PANEL */}
          <View style={styles.whitePanel}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              bounces={false}
            >

              {/* 5. CREATE ACCOUNT LABEL */}
              <Text style={styles.categoryLabel}>CREATE ACCOUNT</Text>

              {/* 6. MAIN HEADING */}
              <Text style={styles.heading}>
                <Text style={styles.darkHeading}>Let's get you{"\n"}</Text>
                <Text style={styles.limeHeading}>started</Text>
              </Text>

              {/* 7. DESCRIPTION */}
              <Text style={styles.description}>
                Create an account to enjoy fresh groceries,{"\n"}
                fast delivery and a healthier, happier you.
              </Text>

              {/* 8. FULL NAME INPUT */}
              <View style={styles.inputContainer}>
                <View style={styles.inputIconLeft}>
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <Circle cx={12} cy={7} r={4} />
                  </Svg>
                </View>
                <TextInput
                  style={styles.textInput}
                  placeholder="Full Name"
                  placeholderTextColor="#9CA3AF"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>

              {/* 9. MOBILE NUMBER INPUT */}
              <View style={styles.inputContainer}>
                <View style={styles.inputIconLeft}>
                  <Svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </Svg>
                </View>
                <View style={styles.flagContainer}>
                  <Svg width={18} height={12} viewBox="0 0 18 12">
                    <Rect width={18} height={4} fill="#FF9933" />
                    <Rect y={4} width={18} height={4} fill="#FFFFFF" />
                    <Rect y={8} width={18} height={4} fill="#138808" />
                    <Circle cx={9} cy={6} r={1.5} fill="#000080" />
                  </Svg>
                  <Text style={styles.countryCode}>+91</Text>
                  <Svg width={8} height={5} viewBox="0 0 10 6" fill="none" stroke="#6B7280" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 3 }}>
                    <Path d="m1 1 4 4 4-4" />
                  </Svg>
                  <View style={styles.verticalDivider} />
                </View>
                <TextInput
                  style={styles.textInputFlex}
                  placeholder="Mobile Number"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                />
              </View>

              {/* 10. EMAIL INPUT */}
              <View style={styles.inputContainer}>
                <View style={styles.inputIconLeft}>
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <Path d="m22 6-10 7L2 6" />
                  </Svg>
                </View>
                <TextInput
                  style={styles.textInput}
                  placeholder="Email Address (Optional)"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* 11. PASSWORD INPUT WITH EYE TOGGLE */}
              <View style={styles.inputContainer}>
                <View style={styles.inputIconLeft}>
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <Rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
                    <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </Svg>
                </View>
                <TextInput
                  style={styles.textInput}
                  placeholder="Create Password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIconButton}
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                >
                  {showPassword ? (
                    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <Circle cx={12} cy={12} r={3} />
                    </Svg>
                  ) : (
                    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <Path d="m1 1 22 22" />
                    </Svg>
                  )}
                </TouchableOpacity>
              </View>

              {/* 12. PASSWORD REQUIREMENT TEXT */}
              <Text style={styles.passwordHelperText}>
                Use at least 8 characters with a mix of letters, numbers and a symbol.
              </Text>

              {/* 13. TERMS CHECKBOX */}
              <TouchableOpacity
                style={styles.termsRow}
                onPress={() => setAgreeTerms(!agreeTerms)}
                activeOpacity={0.8}
              >
                <View style={[styles.checkboxSquare, agreeTerms && styles.checkboxSquareChecked]}>
                  {agreeTerms && (
                    <Svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M20 6L9 17l-5-5" />
                    </Svg>
                  )}
                </View>
                <Text style={styles.termsText}>
                  I agree to the{' '}
                  <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
              </TouchableOpacity>

              {/* 14. CREATE ACCOUNT BUTTON */}
              <TouchableOpacity
                style={styles.createAccountBtn}
                onPress={handleCreateAccount}
                activeOpacity={0.85}
              >
                <Text style={styles.createAccountBtnText}>Create Account</Text>
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 8 }}>
                  <Path d="M5 12h14M12 5l7 7-7 7" />
                </Svg>
              </TouchableOpacity>

              {/* 15. OR CONTINUE WITH DIVIDER */}
              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* 16. SOCIAL LOGIN BUTTONS */}
              <View style={styles.socialButtonsRow}>

                {/* GOOGLE BUTTON */}
                <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
                  <Svg width={16} height={16} viewBox="0 0 24 24">
                    <Path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <Path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <Path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <Path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </Svg>
                  <Text style={styles.socialBtnText}>Google</Text>
                </TouchableOpacity>

                {/* APPLE BUTTON */}
                <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
                  <Svg width={15} height={15} viewBox="0 0 24 24" fill="#000000">
                    <Path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.12-1.96.99-3.1-.97.04-2.14.65-2.84 1.47-.62.72-1.16 1.88-1.01 3 .01 0 .04.01.07.01 1.08 0 2.12-.56 2.79-1.38z" />
                  </Svg>
                  <Text style={styles.socialBtnText}>Apple</Text>
                </TouchableOpacity>

                {/* WHATSAPP BUTTON */}
                <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="#25D366">
                    <Path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l.279.444-1.16 4.238 4.341-1.138.448.278zm10.741-6.52c-.097-.163-.357-.261-.747-.455-.39-.195-2.309-1.139-2.666-1.269-.357-.13-.618-.195-.878.195-.26.39-.974 1.269-1.196 1.529-.222.26-.444.293-.834.098-.39-.195-1.646-.607-3.136-1.935-1.159-1.034-1.942-2.312-2.17-2.702-.228-.39-.024-.601.171-.795.176-.175.39-.455.585-.683.195-.228.26-.39.39-.651.13-.261.065-.489-.033-.684-.097-.195-.878-2.115-1.204-2.898-.317-.763-.64-.66-.878-.672-.228-.012-.489-.014-.75-.014-.26 0-.684.097-1.04.489-.357.391-1.366 1.336-1.366 3.257 0 1.921 1.399 3.778 1.594 4.039.195.26 2.753 4.204 6.67 5.894.931.402 1.658.642 2.224.823.935.298 1.787.256 2.46.155.751-.113 2.309-.944 2.634-1.856.325-.912.325-1.692.228-1.855z" />
                  </Svg>
                  <Text style={styles.socialBtnText}>WhatsApp</Text>
                </TouchableOpacity>

              </View>

              {/* 17. LOGIN TEXT */}
              <TouchableOpacity
                style={styles.loginRow}
                onPress={handleLoginNav}
                activeOpacity={0.7}
              >
                <Text style={styles.loginTextGray}>Already have an account? </Text>
                <Text style={styles.loginTextGreen}>Log In </Text>
                <Svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#1B753A" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M5 12h14M12 5l7 7-7 7" />
                </Svg>
              </TouchableOpacity>

              {/* 18. BOTTOM SAFE AREA BOTTOM SPACING */}
              <View style={styles.bottomSpacer} />

            </ScrollView>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}
