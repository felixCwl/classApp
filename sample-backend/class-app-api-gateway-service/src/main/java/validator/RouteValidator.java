package validator;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.function.Predicate;

import static com.example.classAppApiGatewayService.constant.ConfigConstant.UNAUTH_UTI_PATH_LIST;

@Component
public class RouteValidator {
    public Predicate<ServerHttpRequest> requireAuth = serverHttpRequest -> UNAUTH_UTI_PATH_LIST
            .stream()
            .noneMatch(unAuthUri -> serverHttpRequest
                    .getURI()
                    .getPath()
                    .contains(unAuthUri)
            );
}
