import { View } from 'react-native';
import { Path, Svg, SvgUri } from 'react-native-svg';

const ScanSvg = () => {
    return (
        <View>
            <Svg width="30" height="30" viewBox="0 0 60 60" fill="none">
                <Path d="M10 30H50M20 17.5V20M30 17.5V20M20 42.5V40M40 17.5V20M40 42.5V40M30 42.5V40" stroke="black" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                <Path d="M7.5 20V10C7.5 9.33696 7.76339 8.70107 8.23223 8.23223C8.70107 7.76339 9.33696 7.5 10 7.5H20" stroke="black" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                <Path d="M52.5 20V10C52.5 9.33696 52.2366 8.70107 51.7678 8.23223C51.2989 7.76339 50.663 7.5 50 7.5H40" stroke="black" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                <Path d="M7.5 40V50C7.5 50.663 7.76339 51.2989 8.23223 51.7678C8.70107 52.2366 9.33696 52.5 10 52.5H20" stroke="black" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                <Path d="M40 52.5H50C50.663 52.5 51.2989 52.2366 51.7678 51.7678C52.2366 51.2989 52.5 50.663 52.5 50V40" stroke="black" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        </View>
    );
};

export default ScanSvg;