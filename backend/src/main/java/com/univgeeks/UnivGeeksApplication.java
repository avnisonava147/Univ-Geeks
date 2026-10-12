package com.univgeeks;

import com.univgeeks.config.DotenvLoader;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UnivGeeksApplication {

    static {
        DotenvLoader.load();
    }

    public static void main(String[] args) {
        DotenvLoader.load();
        SpringApplication.run(UnivGeeksApplication.class, args);
    }
}
