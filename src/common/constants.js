'use strict'

export const HTTP_MESSAGE = {
    NO_PERMISSIONS: 'You do not have sufficient permissions to view this application.',
    NOT_FOUND: 'Not found Page',
    TOKEN_ERROR: 'Service upgrade, please login again',
    NET_ERROR: 'There is something wrong with the network',
};

export const ROLE_CONTROL = {
    ADMIN: ["reserve"]
}
export const permission = ["view", "create", "edit"]

export const RESTRICTE = [];

// recordOperateLog WhiteList
export const WHITELIST = ['/'];
