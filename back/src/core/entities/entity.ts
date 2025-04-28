export abstract class Entity<Props> {
  private _id: string;
  protected readonly props: Props;
  get id() {
    return this._id;
  }

  protected constructor(props: Props, id?: string) {
    this.props = Object.freeze(props);
    this._id = id ?? Entity.generateId();
  }

  protected setProp<K extends keyof Props>(key: K, value: Props[K]): void {
    // @ts-ignore
    this.props = {
      ...this.props,
      [key]: value,
    };
  }

  protected setProps(props: Partial<Props>): void {
    // @ts-ignore
    this.props = {
      ...this.props,
      ...props,
    };
  }

 
  private static generateId(): string {
    return crypto.randomUUID(); 
  }

  public equals(entity: Entity<unknown>): boolean {
    if (entity === this) {
      return true;
    }

    if (entity.id === this._id) {
      return true;
    }

    return false;
  }

  public toJSON() {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
