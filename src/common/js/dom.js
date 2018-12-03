export function hasClass(el, className) {
    return el.classList.contains(className)
}
  
export function addClass(el, className) {
    el.classList.add(className)
}

export function getDate(el, name, val) {
    let profix = 'data-'
    name = profix + name
    if (val) {
        return el.setAttribute(name, val)
    } else {
        return el.getAttribute(name)
    }
}