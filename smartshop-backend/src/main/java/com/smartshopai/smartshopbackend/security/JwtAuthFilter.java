package com.smartshopai.smartshopbackend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    public JwtAuthFilter(JwtService jwtService, CustomUserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String requestPath = request.getRequestURI();
        final String method = request.getMethod();

        // 🔍 DEBUG: Log every request hitting the filter
        System.out.println(">>> JwtAuthFilter: " + method + " " + requestPath);

        String jwt = null;
        String username = null;

        // Check "Authorization: Bearer <token>"
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7);

            try {
                username = jwtService.extractUsername(jwt);
                System.out.println(">>> Username extracted: " + username);
            } catch (Exception e) {
                System.out.println(">>> JWT Extraction Failed: " + e.getMessage());
            }
        } else {
            // Only log for API requests to avoid noise
            if (requestPath.startsWith("/api/")) {
                System.out.println(">>> No Bearer token found in header: " + authHeader);
            }
        }

        // Nếu lấy được username và chưa có auth trong context
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (jwtService.isTokenValid(jwt, userDetails)) {
                System.out.println(">>> Token valid. Authorities: " + userDetails.getAuthorities());

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities());

                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request));

                // Gán user vào SecurityContext
                SecurityContextHolder.getContext().setAuthentication(authToken);
            } else {
                System.out.println(">>> Token INVALID for user: " + username);
            }
        }

        filterChain.doFilter(request, response);
    }
}
