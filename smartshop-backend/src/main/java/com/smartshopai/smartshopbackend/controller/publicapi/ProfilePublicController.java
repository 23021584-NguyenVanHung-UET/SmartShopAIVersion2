package com.smartshopai.smartshopbackend.controller.publicapi;

import com.smartshopai.smartshopbackend.dto.request.UpdateProfileRequest;
import com.smartshopai.smartshopbackend.dto.response.UserProfileResponse;
import com.smartshopai.smartshopbackend.entity.User;
import com.smartshopai.smartshopbackend.service.UserService;
import jakarta.validation.Valid;
import java.security.Principal;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/profile")
public class ProfilePublicController {

    private final UserService userService;

    public ProfilePublicController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<UserProfileResponse> me(Principal principal) {
        User user = userService.getByEmailOrThrow(principal.getName());
        return ResponseEntity.ok(userService.toResponse(user));
    }

    @PutMapping
    public ResponseEntity<UserProfileResponse> update(@Valid @RequestBody UpdateProfileRequest request, Principal principal) {
        User user = userService.getByEmailOrThrow(principal.getName());
        return ResponseEntity.ok(userService.updateProfile(user, request));
    }
}
