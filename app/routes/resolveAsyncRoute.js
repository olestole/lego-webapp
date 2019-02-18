// @flow

type ComponentFn = () => Promise<Object>;

type AsyncOrSyncRouteConfig =
  | {
      getComponent: (
        location: string,
        cb: (Object | null, ?Object) => void
      ) => void
    }
  | { component: Object };

/**
 * Utility function for creating React-Router 3 config for async routes using
 * import()-statements but transforming these imports to require using babel
 * in development for better hot-reloadability.
 *
 * The function requires an import function that can be called at appropriate times.
 * We can not simply pass in the path as a string as webpack don't fully support
 * expressions inside these statements to make them statically analyzable.
 *
 *
 * It should be used as follows:
 * ```js
 * resolveAsyncRoute(
 *   () => import('./Route'),
 * )
 * ```
 */
export default function resolveAsyncRoute(
  componentFn: ComponentFn
): AsyncOrSyncRouteConfig {
  return {
    getComponent(
      location,
      callback: (error: Object | null, component?: Object) => void
    ) {
      componentFn()
        .then(module => callback(null, module.default))
        .catch(error => callback(error));
    }
  };
}
