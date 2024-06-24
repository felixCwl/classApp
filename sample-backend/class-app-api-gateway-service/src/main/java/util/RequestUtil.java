package util;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
@Log4j2
@Component
public class RequestUtil {

    @Autowired
    private RestTemplate restTemplate;

    public String getToken(String username, String role) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("username", username);
        headers.set("role", role);

        HttpEntity httpEntity = new HttpEntity(headers);
        log.debug(httpEntity);
        ResponseEntity<String> responseEntity = restTemplate.exchange("http://localhost:8083/login", HttpMethod.POST, httpEntity, String.class);
        log.debug(responseEntity);
        return responseEntity.getBody();
    }
}
