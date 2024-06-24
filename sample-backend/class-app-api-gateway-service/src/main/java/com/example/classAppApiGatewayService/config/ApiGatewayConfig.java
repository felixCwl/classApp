package com.example.classAppApiGatewayService.config;

import com.example.classAppApiGatewayService.filter.AuthFilter;
import com.example.classAppApiGatewayService.filter.RequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.RequestContextFilter;

@Configuration
public class ApiGatewayConfig {

    @Autowired
    RequestFilter requestFilter;

    @Autowired
    AuthFilter authFilter;

    @Bean
    public RouteLocator routeLocator(RouteLocatorBuilder routeLocatorBuilder){
        return routeLocatorBuilder
                .routes()
                .route("${file-service-endpoint.file-converter-path}",
                        route -> route.path("/*")
                                .and()
                                .method("POST")
                                //.and()
                                //.readBody(b -> true)
                                .filters(filter -> filter.filters(requestFilter, authFilter))
                                .uri("http://localhost:8081")
                ).build();
    }
}
