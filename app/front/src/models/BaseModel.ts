export type BaseModelFields = {
  id: string;
  createTime?: Date;
  updateTime?: Date;
};

export default abstract class BaseModel {
  public readonly id: string;
  public createTime?: Date;
  public updateTime?: Date;

  constructor(id: string, createTime?: Date, updateTime?: Date) {
    this.id = id;
    this.createTime = createTime;
    this.updateTime = updateTime;
  }

  /**
   * 转化为 JSON 对象
   * @param unTransientProperties 新增需要排除的属性名数组
   * @returns 传递对象
   */
  public toJSON(unTransientProperties?: string[]): Record<string, any> {
    const outData: Partial<typeof this> = {};
    const unTransientArray = unTransientProperties?.slice() ?? [];
    for (const property in this)
      if (Object.hasOwn(this, property) && !unTransientArray.includes(property))
        outData[property] = this[property];
    return outData;
  }
}
