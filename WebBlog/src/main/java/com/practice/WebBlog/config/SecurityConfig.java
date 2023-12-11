package com.practice.WebBlog.config;

import com.practice.WebBlog.jwt.JwtAuthFilter;
import com.practice.WebBlog.repository.UserRepository;
import com.practice.WebBlog.services.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

import java.util.logging.Filter;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    @Autowired
    private UserRepository repository;

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserInfoService(repository);
    }


    @Autowired
    private JwtAuthFilter authFilter;

//    @Bean(
//            name = {"securityFilterChain"}
//    )
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//
//        http
//
//                .csrf(AbstractHttpConfigurer::disable) //.csrf(Customizer.withDefaults())
//                .cors(Customizer.withDefaults())
//                .authorizeHttpRequests((requests) -> requests
//                        .requestMatchers("/auth/generateToken", "/auth/signup", "/api/v1/public/**" ).permitAll()
//                        .requestMatchers("/api/v1/admin/**").authenticated()
//                        .requestMatchers("/api/v1/users/**").authenticated()
//                ).sessionManagement((session) -> session
//                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                )
//
//                .authenticationProvider(authenticationProvider())
//                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests((requests) -> requests
                    .requestMatchers(getPublicRequestMatcher1()).permitAll()
                    .requestMatchers(getPublicRequestMatcher2()).permitAll()
                    .requestMatchers(getPublicRequestMatcher3()).permitAll()
                    .requestMatchers(getAdminRequestMatcher()).authenticated()
                    .requestMatchers(getUsersRequestMatcher()).authenticated()
            )
            .sessionManagement((session) -> session
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
}

    private RequestMatcher getPublicRequestMatcher1(){
        return new AntPathRequestMatcher("/auth/generateToken");
    }
    private RequestMatcher getPublicRequestMatcher2(){
        return new AntPathRequestMatcher("/auth/signup");
    }private RequestMatcher getPublicRequestMatcher3(){
        return new AntPathRequestMatcher("/api/v1/public/**");
    }
    private RequestMatcher getAdminRequestMatcher() {
        return new AntPathRequestMatcher("/api/v1/admin/**");
        // Add setServletPath("/yourServletPath") here if needed
    }
    private RequestMatcher getUsersRequestMatcher() {
        return new AntPathRequestMatcher("/api/v1/users/**");
        // Add setServletPath("/yourServletPath") here if needed
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
