/* eslint-disable @typescript-eslint/ban-types */
import { ThemeOptions } from '@mui/material';
import { History, Location } from 'history';
import { RouteProps } from 'react-router';

import { AuthProvider } from './auth/auth-provider';
import { DataProvider } from './data/data-provider';
import { I18nProvider } from './i18n/i18n-provider';

// From an old version of `react-router`
export interface StaticContext {
  statusCode?: number;
}
// From the history change lock, they says `LocationState` will replaced with unknown in newer versions.
type LocationState = unknown;

// From an old `history` package version.
export interface Match<Params extends { [K in keyof Params]?: string } = {}> {
  params: Params;
  isExact: boolean;
  path: string;
  url: string;
}

// From an old `react-router` package version.
export interface RouteComponentProps<
  Params extends { [K in keyof Params]?: string } = {},
  C extends StaticContext = StaticContext,
  // I don't remove it because there some type use `RouteComponentProps` append three generics.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  S = LocationState
> {
  history: History;
  location: Location;
  match: Match<Params>;
  staticContext?: C;
}

export interface WithPermissionsChildrenParams {
  permissions: Record<string, unknown>;
}

export type InitialState = Record<string, unknown> | (() => Record<string, unknown>);

export type Dispatch<T> = T extends (...args: infer A) => unknown
  ? (...args: A) => void
  : never;

export type ResourceElement = React.ReactElement<ResourceProps>;
export type RenderResourcesFunction = (
  permissions: unknown
) => ResourceElement[] | Promise<ResourceElement[]>;
export type AdminChildren = RenderResourcesFunction | React.ReactNode;

export interface CustomRoute extends RouteProps {
  noLayout?: boolean;
  [key: string]: unknown;
}

export type CustomRoutes = Array<React.ReactElement<CustomRoute>>;

export type TitleComponent = string | React.ReactElement<unknown>;
export type CatchAllComponent = React.ComponentType<{ title?: TitleComponent }>;

interface LoginComponentProps extends RouteComponentProps {
  title?: TitleComponent;
  theme?: Record<string, unknown>;
}
export type LoginComponent = React.ComponentType<LoginComponentProps>;
export type DashboardComponent = React.ComponentType<WithPermissionsChildrenParams>;

export interface CoreLayoutProps {
  children?: React.ReactNode;
  dashboard?: DashboardComponent;
  logout?: React.ReactNode;
  menu?: React.ComponentType<{
    logout?: React.ReactNode;
    hasDashboard?: boolean;
  }>;
  theme?: ThemeOptions;
  title?: TitleComponent;
}

export type LayoutComponent = React.ComponentType<CoreLayoutProps>;
export type LoadingComponent = React.ComponentType<{
  theme?: ThemeOptions;
  loadingPrimary?: string;
  loadingSecondary?: string;
}>;

export interface ResourceComponentInjectedProps {
  basePath?: string;
  permissions?: unknown;
  resource?: string;
  options?: unknown;
  hasList?: boolean;
  hasEdit?: boolean;
  hasShow?: boolean;
  hasCreate?: boolean;
}

export interface ResourceComponentProps<
  Params extends { [K in keyof Params]?: string } = {},
  C extends StaticContext = StaticContext,
  S = LocationState
> extends Partial<RouteComponentProps<Params, C, S>>,
    ResourceComponentInjectedProps {}

// deprecated name, use ResourceComponentProps instead
export type ReactAdminComponentProps = ResourceComponentProps;

export interface ResourceComponentPropsWithId<
  Params extends { id?: string } = {},
  C extends StaticContext = StaticContext,
  S = LocationState
> extends Partial<RouteComponentProps<Params, C, S>>,
    ResourceComponentInjectedProps {
  id?: string;
}

// deprecated name, use ResourceComponentPropsWithId instead
export type ReactAdminComponentPropsWithId = ResourceComponentPropsWithId;

export type ResourceMatch = Match<{
  id?: string;
}>;

export interface ResourceProps {
  intent?: 'route' | 'registration';
  match?: ResourceMatch;
  name: string;
  list?: React.ComponentType<ResourceComponentProps>;
  create?: React.ComponentType<ResourceComponentProps>;
  edit?: React.ComponentType<ResourceComponentPropsWithId>;
  show?: React.ComponentType<ResourceComponentPropsWithId>;
  icon?: React.ComponentType<unknown>;
  options?: Record<string, unknown>;
}

export interface AdminProps {
  appLayout?: LayoutComponent;
  authProvider?: AuthProvider;
  catchAll?: CatchAllComponent;
  children?: AdminChildren;
  customReducers?: Record<string, unknown>;
  customRoutes?: CustomRoutes;
  customSagas?: unknown[];
  dashboard?: DashboardComponent;
  dataProvider: DataProvider;
  disableTelemetry?: boolean;
  history?: History;
  i18nProvider?: I18nProvider;
  initialState?: InitialState;
  layout?: LayoutComponent;
  loading?: React.ComponentType;
  locale?: string;
  loginPage?: LoginComponent | boolean;
  logoutButton?: React.ComponentType;
  menu?: React.ComponentType;
  ready?: React.ComponentType;
  theme?: ThemeOptions;
  title?: TitleComponent;
}

export type Exporter = (
  data: unknown,
  fetchRelatedRecords: (
    data: unknown,
    field: string,
    resource: string
  ) => Promise<unknown>,
  dataProvider: DataProvider,
  resource?: string
) => void | Promise<void>;

export type SetOnSave = (
  onSave?: (values: Record<string, unknown>, redirect: unknown) => void
) => void;

export type FormContextValue = {
  setOnSave?: SetOnSave;
  registerGroup: (name: string) => void;
  unregisterGroup: (name: string) => void;
  registerField: (source: string, group?: string) => void;
  unregisterField: (source: string, group?: string) => void;
  getGroupFields: (name: string) => string[];
};

export type FormFunctions = {
  setOnSave?: SetOnSave;
};
