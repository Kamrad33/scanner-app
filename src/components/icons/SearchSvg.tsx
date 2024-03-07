import { View } from 'react-native';
import { Path, Svg, SvgUri } from 'react-native-svg';

const ScanSvg = () => {
    return (
        <View>
            <Svg width="30" height="30" viewBox="0 0 60 60" fill="none">
                <Path d="M27.5 15C34.4035 15 40 20.5964 40 27.5M41.647 41.6372L52.5 52.5M47.5 27.5C47.5 38.5458 38.5458 47.5 27.5 47.5C16.4543 47.5 7.5 38.5458 7.5 27.5C7.5 16.4543 16.4543 7.5 27.5 7.5C38.5458 7.5 47.5 16.4543 47.5 27.5Z" stroke="black" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        </View>
    );
};

export default ScanSvg;