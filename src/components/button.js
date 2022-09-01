import React from 'react';
import {Button} from 'react-native-elements';

const PrimaryButton = ({title, buttonStyle, textStyle, ...props}) => {
  return (
    <Button
      title={title}
      buttonStyle={buttonStyle}
      titleStyle={textStyle}
      loadingStyle={{
        backgroundColor: 'transparent',
      }}
      {...props}
    />
  );
};

export default PrimaryButton;
