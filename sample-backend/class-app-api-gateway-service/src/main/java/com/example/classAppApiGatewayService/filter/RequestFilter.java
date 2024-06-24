package com.example.classAppApiGatewayService.filter;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Objects;
import java.util.logging.Logger;

import static com.example.classAppApiGatewayService.constant.ConfigConstant.CACHED_REQUEST_BODY_OBJECT;

@Component
@Log4j2
public class RequestFilter implements GatewayFilter {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        Object body = exchange.getAttribute(CACHED_REQUEST_BODY_OBJECT);
        log.debug(body);
        return chain.filter(exchange);
    }
}
