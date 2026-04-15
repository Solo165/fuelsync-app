import React from "react";
import Svg, { Polygon } from "react-native-svg";
import { Animated } from "react-native";

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

interface Props {
    fill: string | Animated.AnimatedInterpolation<string | number>;
}

export default function DownvoteIcon({ fill }: Props) {
    return (
        <Svg width={24} height={24} viewBox="0 0 24 24">
            <AnimatedPolygon
                points="13.13 .21 16.68 8.49 13.91 7.8 14.68 15.28 19.12 15.28 11.93 23.79 4.88 15.28 8.79 15.28 10.39 5.58 10.39 16.64 8.42 16.64 11.93 20.94 15.54 16.64 13.16 16.64 12.62 5.7 14.65 6.58 13.13 .21"
                fill={fill}
            />
        </Svg>
    );
}
