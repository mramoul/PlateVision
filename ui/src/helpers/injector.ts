import { inject, type InjectionKey } from "vue"

export default function useInjection<T>(key: InjectionKey<T>): T {
    const value: T | undefined = inject(key)

    if (value)
        return value;
    else
        throw new Error(`The ${key.description} context was not provided.`);
}