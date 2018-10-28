/**
 * Describes paginated data
 */
export class Pagination<T> {
  /**
   * Total number of available items
   */
  public total: number;

  /**
   * Items on current page
   */
  public items: T[];
}
