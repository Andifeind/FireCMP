/**
 * FireCMP Utils
 */

export default class Utils {
  static snakeCase(str) {
    return str.replace(/[A-Z]/g, (match, offset) => {
      return (offset ? '-' : '') + match.toLowerCase();
    });
  }
}
