import { ResourceDefinition } from './data/data-provider';
import { Identifier } from './data/identifier';
import { RecordMap } from './data/record-map';

export interface ReduxState {
  admin: {
    ui: {
      automaticRefreshEnabled: boolean;
      optimistic: boolean;
      sidebarOpen: boolean;
      viewVersion: number;
    };
    resources: {
      [name: string]: {
        props: ResourceDefinition;
        data: RecordMap;
        list: {
          cachedRequests?: {
            ids: Identifier[];
            total: number;
            validity: Date;
          };
          expanded: Identifier[];
          ids: Identifier[];
          loadedOnce: boolean;
          params: unknown;
          selectedIds: Identifier[];
          total: number;
        };
        validity: {
          [key: string]: Date;
          [key: number]: Date;
        };
      };
    };
    references: {
      oneToMany: {
        [relatedTo: string]: { ids: Identifier[]; total: number };
      };
    };
    loading: number;
    customQueries: {
      [key: string]: unknown;
    };
  };
  router: {
    location: Location;
  };

  // leave space for custom reducers
  [key: string]: unknown;
}
