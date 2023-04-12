/**
 *  useMessage
 * @return MessageMethod
 */
export function useMessage() {

  const instance = getCurrentInstance();

  if (!instance) {
    throw new Error('useMessage must be called inside of setup()');
  }
  const Message = instance.appContext.config.globalProperties.$message;

  return Message;
}
