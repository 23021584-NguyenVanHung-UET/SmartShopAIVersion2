package com.smartshopai.smartshopbackend.repository;

import com.smartshopai.smartshopbackend.entity.PasswordResetToken;
import java.time.Instant;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByTokenAndUsedFalse(String token);

    @Modifying
    @Query("delete from PasswordResetToken t where t.user.id = :userId or t.expiresAt < :now")
    void deleteExpiredOrByUser(@Param("userId") Long userId, @Param("now") Instant now);
}
