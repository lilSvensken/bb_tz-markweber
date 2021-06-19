export class DynamicTemplateUtils {
  static create<TData>(data: TData, containerId: string, template: any): void {
    const container = document.querySelector(`#${ containerId }`);
    container.innerHTML = template({ data: data });
  }
}
