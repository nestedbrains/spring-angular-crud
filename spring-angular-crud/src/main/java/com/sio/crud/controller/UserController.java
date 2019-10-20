package com.sio.crud.controller;

import com.sio.crud.model.User;
import com.sio.crud.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    ResponseEntity<String> register(@RequestBody User user) {
        if (null != user.getEmail()) {
            userRepository.save(user);
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Hi " + user.getName() + " your Registration process successfully completed");
        } else {
            return ResponseEntity.badRequest()
                    .body("Sorry invalid value. Please Enter the correct values");
        }
    }

    @GetMapping("/getAllUsers")
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/findUser/{email}")
    public List<User> findUser(@PathVariable String email) {
        return userRepository.findByEmail(email);
    }

    @DeleteMapping("/cancel/{id}")
    public List<User> cancelRegistration(@PathVariable int id) {
        userRepository.deleteById(id);
        return userRepository.findAll();
    }
}
