import React from 'react';
import { ActivityIndicator, Text } from 'react-native';

export interface AuthProps {
  isAuthenticating: boolean;
}

const login = (props: AuthProps): React.ReactElement<AuthProps> => {
  const { isAuthenticating } = props;

  if (isAuthenticating) {
    return <ActivityIndicator />;
  }

  return (
    <Text>
      <Text>Hello world!</Text>
      <Text>Please sign in</Text>
    </Text>
  );
};

export default login;
