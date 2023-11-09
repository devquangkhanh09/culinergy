import { RootScreens } from '@/Screens';
import React, { FC } from 'react';
import { KeyboardAvoidingView, StyleProp, StyleSheet, ViewStyle, TextStyle, Button, Touchable, TouchableOpacity, Text } from 'react-native';
import { FooterProps } from 'react-native-onboard/lib/OnboardFlow/Footer';

interface Props extends FooterProps {
  onNavigate: any
}

export const OnboardingFooter: FC<Props> = ({
  style,
  Components,
  paginationSelectedColor,
  paginationColor,
  currentPage,
  goToNextPage,
  pages,
  canContinue,
  setCanContinue,
  showFooter = true,
  primaryButtonStyle,
  primaryButtonTextStyle,
  ...props
}) => {
  function getPrimaryButtonTitle() {
    if (pages && pages[currentPage] && pages[currentPage].primaryButtonTitle) {
      return pages[currentPage].primaryButtonTitle
    }
    return pages?.length! - 1 === currentPage
      ? 'Get Started'
      : 'Next'
  }

  const totalPages = pages?.length ?? 0

  return (
    <KeyboardAvoidingView behavior="position" style={[defaultStyles.view, style]} {...props}>
      <Components.PrimaryButtonComponent
        text={getPrimaryButtonTitle()}
        currentPage={currentPage}
        totalPages={totalPages}
        goToNextPage={goToNextPage}
        disabled={!canContinue}
        style={primaryButtonStyle}
        textStyle={primaryButtonTextStyle}
      />

      <Components.PaginationComponent
        paginationColor={paginationColor}
        paginationSelectedColor={paginationSelectedColor}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      <TouchableOpacity
        activeOpacity={0.8}
        style={{ position: 'absolute', bottom: 0, right: 15}}
        onPress={props.onNavigate}
      >
        <Text style={{ color: '#57B97D' }}>Skip</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const defaultStyles = StyleSheet.create({
  view: {
    backgroundColor: 'transparent',
    maxHeight: 70,
  }
})