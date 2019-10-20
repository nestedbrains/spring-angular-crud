package com.sio.crud.repository;

import com.sio.crud.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository  extends JpaRepository<User, Integer> {

    List<User> findByEmail(String email);
}
