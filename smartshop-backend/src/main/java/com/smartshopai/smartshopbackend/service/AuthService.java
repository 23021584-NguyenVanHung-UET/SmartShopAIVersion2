package com.smartshopai.smartshopbackend.service;

import com.smartshopai.smartshopbackend.dto.ForgotPasswordRequest;
import com.smartshopai.smartshopbackend.dto.LoginRequest;
import com.smartshopai.smartshopbackend.dto.LoginResponse;
import com.smartshopai.smartshopbackend.dto.RegisterRequest;
import com.smartshopai.smartshopbackend.dto.ResetPasswordRequest;
import com.smartshopai.smartshopbackend.dto.UserProfileResponse;
import com.smartshopai.smartshopbackend.entity.PasswordResetToken;
import com.smartshopai.smartshopbackend.entity.User;
import com.smartshopai.smartshopbackend.repository.UserRepository;
import com.smartshopai.smartshopbackend.security.JwtService;
import com.smartshopai.smartshopbackend.exception.UserAlreadyExitsException;
import com.smartshopai.smartshopbackend.repository.PasswordResetTokenRepository;
import jakarta.transaction.Transactional;
import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.UUID;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    private final JwtService jwtService;
    private final PasswordResetTokenRepository tokenRepository;
    private static final Duration RESET_TOKEN_TTL = Duration.ofMinutes(30);

    public AuthService(UserRepository userRepository, JwtService jwtService, PasswordResetTokenRepository tokenRepository) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
    }

    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExitsException("Email đã tồn tại!");
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
                user.getEmail(),
                user.getRole());
    }

    public UserProfileResponse getCurrentUser(String token) {
        String email = jwtService.extractUsername(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));

        return new UserProfileResponse(user.getName(), user.getEmail(), user.getRole());
    }

    @Transactional
    public Map<String, Object> requestPasswordReset(ForgotPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user != null) {
            tokenRepository.deleteExpiredOrByUser(user.getId(), Instant.now());

            PasswordResetToken token = new PasswordResetToken();
            token.setToken(UUID.randomUUID().toString());
            token.setUser(user);
            token.setExpiresAt(Instant.now().plus(RESET_TOKEN_TTL));
            tokenRepository.save(token);

            // TODO: send email. For now, return token so it can be used during development.
            return Map.of(
                    "message", "Yêu cầu đặt lại mật khẩu đã được tạo",
                    "resetToken", token.getToken(),
                    "expiresAt", token.getExpiresAt());
        }

        // Do not reveal user existence
        return Map.of("message", "Nếu email tồn tại, liên kết đặt lại mật khẩu sẽ được gửi");
    }

    @Transactional
    public Map<String, Object> resetPassword(ResetPasswordRequest request) {
        PasswordResetToken token = tokenRepository.findByTokenAndUsedFalse(request.getToken())
                .orElseThrow(() -> new IllegalArgumentException("Token không hợp lệ"));

        if (token.getExpiresAt().isBefore(Instant.now())) {
            throw new IllegalArgumentException("Token đã hết hạn");
        }

        User user = token.getUser();
        user.setPassword(encoder.encode(request.getNewPassword()));
        token.setUsed(true);

        userRepository.save(user);
        tokenRepository.save(token);

        return Map.of("message", "Đặt lại mật khẩu thành công");
    }

}
