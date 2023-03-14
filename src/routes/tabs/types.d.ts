import type {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';

export type TopBarParamList = {
  Dashboard: undefined;
  Maps: undefined;
  Institutional: undefined;
};

export type TopBarNavigationProp =
  MaterialTopTabNavigationProp<TopBarParamList>;
