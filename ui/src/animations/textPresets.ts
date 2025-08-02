import { splitText } from "motion-plus";
import { animate, stagger } from "motion-v";
import type { Ref } from "vue"

export async function typingAnimation(containerRef: Ref<HTMLDivElement | null, HTMLDivElement | null>, htmlElement: string, type: string = 'decay') {
    await document.fonts.ready

    if (!containerRef.value)
        throw new Error(`The container reference for typing animation was not provided.`);

    const elements = containerRef.value.querySelectorAll(htmlElement)

    for (const el of elements) {
        const { words } = splitText(el)

        animate(
            words,
            {
                //@ts-ignore
                opacity: [0, 1], y: [10, 0]
            },
            {
                type: type,
                duration: 0.5,
                bounce: 0,
                delay: stagger(0.05)
            }
        )
    }
}