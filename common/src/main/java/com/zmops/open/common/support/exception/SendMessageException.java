package com.zmops.open.common.support.exception;

/**
 * send message exception
 * @author tom from <a href="https://github.com/dromara/hertzbeat">hertzbeat</a>
 * @date 2022/5/8 17:59
 */
public class SendMessageException extends RuntimeException {
    public SendMessageException(String message) {
        super(message);
    }
}
