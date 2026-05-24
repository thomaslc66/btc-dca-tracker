import { cssInterop } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable } from 'react-native';

cssInterop(SafeAreaView, { className: 'style' });
cssInterop(Pressable, { className: 'style' });