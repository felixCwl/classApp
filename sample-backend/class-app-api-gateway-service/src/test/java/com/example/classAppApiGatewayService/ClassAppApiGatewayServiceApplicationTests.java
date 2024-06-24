package com.example.classAppApiGatewayService;

import com.example.classAppApiGatewayService.filter.RequestFilter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ClassAppApiGatewayServiceApplicationTests {

	@Autowired
	RequestFilter requestFilter;

	@Test
	void contextLoads() {
	}

}
