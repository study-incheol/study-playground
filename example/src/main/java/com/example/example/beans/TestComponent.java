package com.example.example.beans;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Configuration
public class TestComponent {
	@Autowired
	ApplicationContext applicationContext;

	@Bean
	public void test() {
		BeanFactory beanFactory = applicationContext.getParentBeanFactory();
		System.out.println("test");
	}
}
