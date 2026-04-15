import React from "react";
import Svg, { Polygon } from "react-native-svg";
import { Animated } from "react-native";

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

interface Props {
    fill: string | Animated.AnimatedInterpolation<string | number>;
}

export default function UpvoteIcon({ fill }: Props) {
    return (
        <Svg width={24} height={24} viewBox="0 0 24 24">
            <AnimatedPolygon
                points="10.87 23.79 7.32 15.51 10.09 16.2 9.32 8.72 4.88 8.72 12.07 .21 19.12 8.72 15.21 8.72 13.61 18.42 13.61 7.36 15.58 7.36 12.07 3.06 8.46 7.36 10.84 7.36 11.38 18.3 9.35 17.42 10.87 23.79"
                fill={fill}
            />
        </Svg>
    );
}
