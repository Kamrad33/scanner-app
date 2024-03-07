import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

const StarSvg = () => {
    return (
        <View>
            <Svg width="100%" height="100%" viewBox="0 0 55 53" fill="#FFC340">
                <Path d="M3.26587 21.7719C2.48274 21.0476 2.90814 19.7383 3.96739 19.6128L18.9763 17.8325C19.408 17.7813 19.783 17.5102 19.9651 17.1155L26.2957 3.39102C26.7425 2.42244 28.1195 2.42224 28.5662 3.39084L34.8967 17.1152C35.0787 17.51 35.4515 17.7818 35.883 17.833L50.8927 19.6128C51.952 19.7383 52.3762 21.0479 51.5932 21.7721L40.498 32.0346C40.1787 32.3299 40.0367 32.7691 40.1212 33.1956L43.066 48.0196C43.274 49.0659 42.1605 49.8766 41.2297 49.3556L28.0412 41.9714C27.662 41.7591 27.2012 41.7601 26.8217 41.9724L13.6321 49.3536C12.7013 49.8746 11.5858 49.0659 11.7937 48.0196L14.7388 33.1964C14.8235 32.7701 14.6818 32.3296 14.3626 32.0346L3.26587 21.7719Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        </View>
    );
};

export default StarSvg;