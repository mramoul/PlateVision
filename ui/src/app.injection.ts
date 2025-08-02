import { type InjectionKey, type Ref, ref } from 'vue'

export interface AppInjectionContext {
    isAppLoading: Ref<boolean, boolean>
}

export const appInjectionKey: InjectionKey<AppInjectionContext> = Symbol('AppInjectionContext')

export function useAppProvider(): AppInjectionContext {
    const isAppLoading = ref<boolean>(false);

    return {
        isAppLoading,
    }
}