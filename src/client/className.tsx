function concatClassName(original: string, newClassNames: string) {
    if (original.length > 0) {
        return `${original} ${newClassNames}`
    } else {
        return newClassNames
    }
}

export function insertClassName(element: HTMLElement, className: string) {
    if (!element.className.includes(className)) {
        const trimmedClassName = element.className.trim()
        element.className = concatClassName(trimmedClassName, className)
    }
}

export function insertClassNames(element: HTMLElement, classNames: string[]) {
    const trimmedClassName = element.className.trim()
    const newClassNames = classNames.filter((className) => !trimmedClassName.includes(className))
    if (newClassNames.length > 0) {
        element.className = concatClassName(trimmedClassName, newClassNames.join(' '))
    }
}

export function removeClassName(element: HTMLElement, className: string) {

}
