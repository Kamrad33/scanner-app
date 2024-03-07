import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

interface HeartSvgProps{
    fill?: boolean;
}

const HeartSvg = ({ fill }: HeartSvgProps) => {
    if (fill) {
        return (
            <View>
                <Svg width="100%" height="100%" viewBox="0 0 32 32" fill="#FF7373">
                    <Path d="M9.17647 1C5.0837 1 1.76471 4.10651 1.76471 7.93918C1.76471 11.0331 3.06177 18.376 15.8293 25.7988C16.058 25.9304 16.3205 26 16.5882 26C16.8559 26 17.1185 25.9304 17.3472 25.7988C30.1147 18.376 31.4118 11.0331 31.4118 7.93918C31.4118 4.10651 28.0928 1 24 1C19.9072 1 16.5882 5.20556 16.5882 5.20556C16.5882 5.20556 13.2693 1 9.17647 1Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </Svg>
            </View>
        );
    } else {
        return (
            <View>
                <Svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
                    <Path d="M9.17647 1C5.0837 1 1.76471 4.10651 1.76471 7.93918C1.76471 11.0331 3.06177 18.376 15.8293 25.7988C16.058 25.9304 16.3205 26 16.5882 26C16.8559 26 17.1185 25.9304 17.3472 25.7988C30.1147 18.376 31.4118 11.0331 31.4118 7.93918C31.4118 4.10651 28.0928 1 24 1C19.9072 1 16.5882 5.20556 16.5882 5.20556C16.5882 5.20556 13.2693 1 9.17647 1Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </Svg>
            </View>
        )
    }
};

export default HeartSvg;