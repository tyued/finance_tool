import { notification } from "antd";
import { useEffect, useRef, useCallback } from 'react';
/**
 * smooth scrolling
 */
export function scrollToTop() {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
}

// Hints for handling server responses
export function success(data) {
    try {
        if (data.status !== 'success') {
            notification.error({
                message: 'An error has occured',
                description: data.data.message + '.',
                placement: 'bottomRight',
            })
            return false;
        }
        return true;
    } catch (e) {
        notification.error({
            message: 'An error has occured',
            description: 'Refresh the page and try again',
            placement: 'bottomRight',
        })
    }
}
// Configure pagination
export function setPage({
    curPage,
    pageSize = 10,
    total,
    action,
    others = {},
    onChange,
    dispatch
}) {
    return {
        current: curPage,
        total,
        pageSize,
        onChange: onChange ? onChange : ((page) => {
            others.curPage = page;
            others.pageSize = pageSize;
            dispatch({
                type: action,
                payload: others
            });
            scrollToTop();
        })
    };
}

export function useDebounce(fn, delay, dep = []) {
    const { current } = useRef({ fn, timer: null });
    useEffect(() => {
      current.fn = fn;
    }, [current.fn, fn]);
  
    return useCallback((...args) => {
      if (current.timer) {
        clearTimeout(current.timer);
      }
      current.timer = setTimeout(() => {
        current.fn.call(this, ...args);
      }, delay);
    }, [current.fn, current.timer, delay])
}

export function redirectToLogin(){
    window.location =
        process.env.REACT_APP_LOGIN_URL +
        '/redirect/' +
        encodeURIComponent(window.location);
}

export function isEmpty(input){
    return input === null || input === undefined || input === '' || JSON.stringify(input) === '{}'
}