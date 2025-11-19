package com.smartshopai.smartshopbackend.service;

import com.smartshopai.smartshopbackend.dto.LoginRequest;
import com.smartshopai.smartshopbackend.dto.LoginResponse;
import com.smartshopai.smartshopbackend.dto.RegisterRequest;
import com.smartshopai.smartshopbackend.entity.User;
import com.smartshopai.smartshopbackend.repository.UserRepository;
import com.smartshopai.smartshopbackend.security.JwtService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email đã tồn tại!";
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(encoder.encode(request.getPassword()))
                .build();

        userRepository.save(user);

        return "Đăng ký thành công!";
    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email không tồn tại!"));

        if (!encoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Sai mật khẩu!");
        }

        // 🔥 Tạo JWT token
        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponse(
                "Đăng nhập thành công!",
                token,
                user.getName(),
                user.getEmail());
    }

    public Map<String, Object> getCurrentUser(String token) {
        String email = jwtService.extractUsername(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));

        return Map.of(
                "message", "User fetched successfully",
                "name", user.getName(),
                "email", user.getEmail());
    }

}
