import {TouchableOpacityProps} from 'react-native';

import {theme} from '@/emotion/theme';

export interface ButtonProps extends TouchableOpacityProps {
  themeColor?: keyof (typeof theme)['colors'];
}
