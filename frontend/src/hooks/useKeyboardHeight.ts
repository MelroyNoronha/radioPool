import { useState, useEffect } from 'react';
import { KeyboardEventName, Keyboard } from 'react-native';

const useKeyboardHeight = () => {
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowEvent: KeyboardEventName = 'keyboardDidShow';
    const keyboardDidHideEvent: KeyboardEventName = 'keyboardDidHide';

    Keyboard.addListener(keyboardDidShowEvent, () => {
      setKeyboardIsVisible(true);
    });

    Keyboard.addListener(keyboardDidHideEvent, () => {
      setKeyboardIsVisible(false);
    });

    return () => {
      Keyboard.removeAllListeners(keyboardDidShowEvent);
      Keyboard.removeAllListeners(keyboardDidHideEvent);
    };
  }, []);

  useEffect(() => {
    if (keyboardIsVisible) {
      const height = Keyboard.metrics()?.height;
      setKeyboardHeight(height ?? 0);
    } else {
      setKeyboardHeight(0);
    }
  }, [keyboardIsVisible]);

  return keyboardHeight;
};

export default useKeyboardHeight;
