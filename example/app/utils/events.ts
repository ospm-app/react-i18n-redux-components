export function createCustomEvent(
  type: string,
  data: CustomEventInit
// eslint-disable-next-line n/no-unsupported-features/node-builtins
): CustomEvent {
   
  return new window.CustomEvent(type, data);
}
