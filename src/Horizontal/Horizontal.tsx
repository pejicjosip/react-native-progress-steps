import React, { FC, cloneElement } from 'react';

import type { IHorizontal } from './Horizontal.types';
import type { IstepState } from '../ProgressSteps.types';
import Marker from '../Marker';
import { ORIENTATION_HORIZONTAL } from '../constants';
import { Text, View } from 'react-native';
import styles from './Horizontal.styles';
import Title from '../Title/Title';
import Content from '../Content/Content';

const Horizontal: FC<IHorizontal> = ({
  colors,
  currentStep,
  isFirstInteraction,
  marker,
  orientation = ORIENTATION_HORIZONTAL,
  steps,
}) => {
  let index = steps.length;
  let headers = [];
  let contents = [];

  while (index--) {
    const { id, title, info } = steps[index];
    const stepState: IstepState = {
      isActive: index === currentStep,
      isCompleted: index < currentStep,
      isFirst: index === 0,
      isFirstInteraction,
      isLast: index === steps.length - 1,
      stepIndex: index,
    };

    headers.unshift(
      <View key={`title-${id ?? index}`} style={styles.marker}>
        {marker ? (
          cloneElement(marker, {
            stepState,
            colors: colors?.marker,
            orientation,
            ...marker.props,
          })
        ) : (
          <Marker
            stepState={stepState}
            colors={colors?.marker}
            orientation={orientation}
          />
        )}
        {title &&
          cloneElement(<Title>{title}</Title>, {
            stepState,
            colors: colors?.title,
            orientation,
          })}
      </View>
    );

    contents.unshift(
      <View key={`content-${id ?? index}`}>
        {info &&
          cloneElement(
            <Content>
              <Text>{info}</Text>
            </Content>,
            { stepState, orientation }
          )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>{headers}</View>
      <View style={styles.content}>{contents}</View>
    </View>
  );
};

export default Horizontal;
