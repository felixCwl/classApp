package com.example.classAppApiGatewayService.constant;

import com.google.common.collect.ImmutableList;

import java.util.List;

public class ConfigConstant {
    public static final String CACHED_REQUEST_BODY_OBJECT = "cachedRequestBodyObject";

    public static final String LOGIN_URL_PATH = "/login";

    public static List<String> UNAUTH_UTI_PATH_LIST = ImmutableList.of(LOGIN_URL_PATH);

}
