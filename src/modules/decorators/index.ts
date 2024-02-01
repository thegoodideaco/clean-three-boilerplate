/* eslint-disable @typescript-eslint/no-unused-vars */
// import { inject } from 'vue'

export const deprecated = (deprecationReason: string) => {
  return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
    return {
      get() {
        const wrapperFn = (..._args: any[]) => {
          propertyDescriptor.get = () => {
            console.warn(`Method ${memberName} is deprecated with reason: ${deprecationReason}`)
          }
        }

        Object.defineProperty(this, memberName, {
          value: wrapperFn,
          configurable: true,
          writable: true
        })
        return wrapperFn
      }
    }

    console.log({ deprecationReason, target, memberName, propertyDescriptor })
  }
}
