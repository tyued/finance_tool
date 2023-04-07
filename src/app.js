import { Modal, message } from 'antd';
import { HTTP_MESSAGE } from '../src/common/constants';

export const dva = {
    config: {
        onError(error) {
            if (error.status) {
                switch (error.status) {
                    case 401:
                        window.location = '/login';
                        break;
                    case 403:
                        message.error(`403 : ${HTTP_MESSAGE.NO_PERMISSIONS}`);
                        break;
                    case 404:
                        message.error(`404 : ${HTTP_MESSAGE.NOT_FOUND}`);
                        break;
                    case 409:
                        message.error(`409 : ${HTTP_MESSAGE.TOKEN_ERROR}`);
                        break;
                    case 504:
                        message.error(`504 : ${HTTP_MESSAGE.NET_ERROR}`);
                        break;
                    default:
                        Modal.error({ content: `${error.status} : ${error.response.data.error}` });
                }
            } else {
                Modal.error({ content: error.message });
            }
        },
    },
};

// Umi is the place you will put the runtime-config.
//export function render(oldRender) {
    // oldRender();
//}

