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
    if (element.className.includes(className)) {
        const newClassNames: string[] = []
        element.className.split(' ').forEach((className) => {
            const trimmedClassName = className.trim()
            if (trimmedClassName.length > 0 && trimmedClassName !== className) {
                newClassNames.push(trimmedClassName)
            }
        })
        element.className = newClassNames.join(' ')
    }
}

export function prefixedClassName(className: string, prefix: string | undefined) {
    if (prefix === undefined) {
        return className
    } else {
        return `${prefix}${className}`
    }
}
