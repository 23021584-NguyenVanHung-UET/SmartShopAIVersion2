package com.smartshopai.smartshopbackend.service;

import com.smartshopai.smartshopbackend.entity.User;
import com.smartshopai.smartshopbackend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.smartshopai.smartshopbackend.dto.request.UpdateProfileRequest;
import com.smartshopai.smartshopbackend.dto.response.UserProfileResponse;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getByEmailOrThrow(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    @Transactional
    public UserProfileResponse updateProfile(User user, UpdateProfileRequest request) {
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setWard(request.getWard());
        user.setDistrict(request.getDistrict());
        user.setCity(request.getCity());
        user.setPostalCode(request.getPostalCode());

        userRepository.save(user);
        return toResponse(user);
    }

    @Transactional(readOnly = true)
    public UserProfileResponse toResponse(User user) {
        return new UserProfileResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getAddress(),
                user.getWard(),
                user.getDistrict(),
                user.getCity(),
                user.getPostalCode()
        );
    }
}
