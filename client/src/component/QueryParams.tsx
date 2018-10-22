import { createBrowserHistory, UnregisterCallback } from "history";
import * as qs from "query-string";
import * as React from "react";

/**
 * Props passed to render function
 */
interface RenderProps {
  /**
   * Object containing query params
   */
  query: qs.OutputParams;

  /**
   * Query params updater.
   *
   * Merges provided params with existing query similar to setState.
   */
  updateQuery: (query: qs.InputParams) => void;
}

/**
 * Component Props
 *
 * Recognized options for query-string's parse and stringify will be
 * passed to their corrspoding calls.
 */
interface Props extends qs.ParseOptions, qs.StringifyOptions {
  /**
   * Render-prop function
   */
  children: (props: RenderProps) => React.ReactNode;
}

/**
 * Provides access to query params in form of render props
 */
export class QueryParams extends React.Component<Props> {
  /**
   * Use History API to avoid page reload on query update
   */
  private readonly history = createBrowserHistory();

  /**
   * Unregisters history listener when component unmounts
   */
  private unlisten?: UnregisterCallback;

  /**
   * Parse current location's query
   */
  public parseQueryString() {
    const { arrayFormat, decode } = this.props;

    return qs.parse(location.search, { arrayFormat, decode });
  }

  /**
   * Update query string
   *
   * Shallowly merges provided params with existing query.
   */
  public handleUpdate = (query: qs.InputParams) => {
    const { strict, encode, arrayFormat } = this.props;

    this.history.push({
      pathname: window.location.pathname,
      search: qs.stringify(
        {
          ...this.parseQueryString(),
          ...query
        },
        { strict, encode, arrayFormat }
      )
    });
  };

  /**
   * Listen to location changes and update the component
   */
  public componentDidMount() {
    this.unlisten = this.history.listen(location => this.forceUpdate());
  }

  /**
   * Unregister the above callback
   */
  public componentWillUnmount() {
    if (this.unlisten !== undefined) {
      this.unlisten();
    }
  }

  public render() {
    return this.props.children({
      query: this.parseQueryString(),
      updateQuery: this.handleUpdate
    });
  }
}
