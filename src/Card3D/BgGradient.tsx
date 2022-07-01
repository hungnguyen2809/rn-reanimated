import {
  BlurMask,
  Canvas,
  RoundedRect,
  SweepGradient,
  useSharedValueEffect,
  useValue,
  vec,
} from '@shopify/react-native-skia';
import React, {useEffect} from 'react';
import {useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';

type BgGradientProps = {
  width: number;
  height: number;
};

const canvasPadding = 40;

const BgGradient: React.FC<BgGradientProps> = ({width, height}) => {
  const rValue = useSharedValue(0);
  const skValue = useValue(0);

  useEffect(() => {
    rValue.value = withRepeat(withTiming(10, {duration: 2000}), -1, true); // -1 là vô hạn
  }, [rValue]);

  //chia sẻ dữ liệu từ các amimated khác (ở đây là reamimated) cho skia
  useSharedValueEffect(() => {
    skValue.current = rValue.value;
  }, rValue);

  return (
    <Canvas
      style={{width: width + canvasPadding, height: height + canvasPadding}}>
      <RoundedRect
        x={canvasPadding / 2}
        y={canvasPadding / 2}
        r={20}
        width={width}
        height={height}
        color="white">
        <SweepGradient
          c={vec((width + canvasPadding) / 2, (height + canvasPadding) / 2)} // c (center): tâm
          colors={['cyan', 'magenta', 'yellow', 'cyan']}
        />
        <BlurMask blur={skValue} style={'solid'} />
      </RoundedRect>
    </Canvas>
  );
};

export default BgGradient;
