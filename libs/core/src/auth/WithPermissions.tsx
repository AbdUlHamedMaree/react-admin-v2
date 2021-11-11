import React, {
  Children,
  FunctionComponent,
  ReactElement,
  ComponentType,
  createElement,
} from 'react';
import { Location } from 'history';

import warning from '../util/warning';
import useAuthenticated from './useAuthenticated';
import usePermissionsOptimized from './usePermissionsOptimized';
import { AnyObject } from '@smart-admin/types';

export interface WithPermissionsChildrenParams {
  permissions: AnyObject;
}

type WithPermissionsChildren = (params: WithPermissionsChildrenParams) => ReactElement;

interface Props {
  authParams?: AnyObject;
  children?: WithPermissionsChildren;
  component?: ComponentType<AnyObject>;
  location?: Location;
  render?: WithPermissionsChildren;
  staticContext?: AnyObject;
  [key: string]: unknown;
}

const isEmptyChildren = (children: React.ReactNode) => Children.count(children) === 0;

/**
 * After checking that the user is authenticated,
 * retrieves the user's permissions for a specific context.
 *
 * Useful for Route components ; used internally by Resource.
 * Use it to decorate your custom page components to require
 * a custom role. It will pass the permissions as a prop to your
 * component.
 *
 * You can set additional `authParams` at will if your authProvider
 * requires it.
 *
 * @example
 *     import { WithPermissions } from 'react-admin';
 *
 *     const Foo = ({ permissions }) => (
 *         {permissions === 'admin' ? <p>Sensitive data</p> : null}
 *         <p>Not sensitive data</p>
 *     );
 *
 *     const customRoutes = [
 *         <Route path="/foo" render={() =>
 *             <WithPermissions
 *                  authParams={{ foo: 'bar' }}
 *                  render={({ permissions, ...props }) => <Foo permissions={permissions} {...props} />}
 *              />
 *         } />
 *     ];
 *     const App = () => (
 *         <Admin customRoutes={customRoutes}>
 *             ...
 *         </Admin>
 *     );
 */
const WithPermissions: React.FC<Props> = ({
  authParams,
  children,
  render,
  component,
  staticContext,
  ...props
}) => {
  warning(
    (render && children && !isEmptyChildren(children)) ||
      (render && component) ||
      (component && children && !isEmptyChildren(children)),
    'You should only use one of the `component`, `render` and `children` props in <WithPermissions>'
  );

  useAuthenticated(authParams);
  const permissions: any = usePermissionsOptimized(authParams).permissions;
  // render even though the usePermissions() call isn't finished (optimistic rendering)
  if (component) {
    return createElement(component, { permissions, ...props });
  }
  // @deprecated
  if (render) {
    return render({ permissions, ...props });
  }
  // @deprecated
  if (children) {
    return children({ permissions, ...props });
  }
  return null;
};

export default WithPermissions as ComponentType<Props>;
