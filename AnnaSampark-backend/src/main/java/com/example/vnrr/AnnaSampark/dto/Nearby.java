package com.example.vnrr.AnnaSampark.dto;


import java.util.List;
import java.util.Map;

public class Nearby {
    private List<Map<String, Object>> users; // Each user is a Map

    public List<Map<String, Object>> getUsers() {
        return users;
    }

    public void setUsers(List<Map<String, Object>> users) {
        this.users = users;
    }
}

