export default class StyleList {
  constructor(classList) {
    this.classArray = classList.split(' ')
  }

  extend(classList) {
    this.classArray = this
      .classArray
      .concat(classList.split(' '))
    return this
  }

  reset(newClassList) {
    this.classArray = newClassList.split(' ')
    return this
  }

  remove(classNameRegex) {
    this.classArray = this
      .classArray
      .filter(className => !className.match(classNameRegex))
    return this
  }

  update(updateFunction) {
    if (typeof updateFunction === 'function')
      updateFunction(this)
    return this
  }

  toClassList() {
    return this.classArray.join(' ')
  }
}