package com.phamquyen.luanvan.security;

import com.phamquyen.luanvan.security.jwt.CustomAuthenticationEntryPoint;
import com.phamquyen.luanvan.security.jwt.CustomAuthenticationFilter;
import com.phamquyen.luanvan.service.impl.UserServiceImpl;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@AllArgsConstructor
@EnableGlobalMethodSecurity(securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

//    @Autowired
//    private OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;
//
//    @Autowired
//    private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
//
//    @Autowired
//    private CustomOAuth2UserService customOAuth2UserService;
//
//    @Autowired
//    private HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;

    @Bean
    public CustomAuthenticationFilter customAuthenticationFilter(){
        return new CustomAuthenticationFilter();
    }

//    @Bean
//    public HttpCookieOAuth2AuthorizationRequestRepository cookieAuthorizationRequestRepository() {
//        return new HttpCookieOAuth2AuthorizationRequestRepository();
//    }
    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider(){
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setPasswordEncoder(bCryptPasswordEncoder);
        daoAuthenticationProvider.setUserDetailsService(userService);

        return daoAuthenticationProvider;
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .exceptionHandling().authenticationEntryPoint(customAuthenticationEntryPoint).and()
                .authorizeRequests()
                .antMatchers("/api-public/v1/**", "/**/**/**/public/**", "/login/**", "/oauth2/**", "/auth/**").permitAll()
                .anyRequest().authenticated();
//                .and()
//                .oauth2Login()
////                .loginPage("/login/oauth2")
//                .authorizationEndpoint()
//                .authorizationRequestRepository(cookieAuthorizationRequestRepository())
//                .baseUri("/oauth2/authorize")
//                .and()
//                .redirectionEndpoint()
//                .baseUri("/oauth2/callback/*")
//                .and()
//                .userInfoEndpoint()
//                .userService(customOAuth2UserService)
//                .and()
//                .successHandler(oAuth2AuthenticationSuccessHandler)
//                .failureHandler(oAuth2AuthenticationFailureHandler);

        http.addFilterBefore(customAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}
