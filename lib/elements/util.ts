import type { Locator, Page } from 'playwright-core';

function isString(arg: any) {
  return Object.prototype.toString.call(arg) === '[object String]';
}

function isFunction(arg: any) {
  return Object.prototype.toString.call(arg) === '[object Function]';
}

function isPromise(arg: any) {
  return Object.prototype.toString.call(arg) === '[object Promise]';
}

const buildBy = (selector: any, getExecuteScriptArgs?: () => any[]): any => {
  getExecuteScriptArgs = isFunction(getExecuteScriptArgs) ? getExecuteScriptArgs : () => [];

  if (isString(selector) && (selector as string).includes('xpath=')) {
    const sel = selector as string;
    if (sel.startsWith('xpath=//')) {
      return sel.replace('xpath=', '');
    }
    if (sel.startsWith('xpath=.') && !sel.includes('|.')) {
      return sel.replace('xpath=.', '');
    }
    if (sel.startsWith('xpath=.') && sel.includes('|.')) {
      return sel.replace('xpath=.', '').replace(/\|\./gi, '|');
    }
  } else if (isString(selector) && (selector as string).includes('js=')) {
    return [(selector as string).replace('js=', ''), ...getExecuteScriptArgs()];
  } else if (isPromise(selector)) {
    return selector;
  } else if (isFunction(selector)) {
    return [selector, ...getExecuteScriptArgs()];
  }

  return selector;
};

export { buildBy };
