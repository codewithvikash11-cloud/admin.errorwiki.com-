export const LANGUAGE_TEMPLATES = {
    // Frontend (Internal Playground)
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DevFixer Playground</title>
  <style>
    body { font-family: sans-serif; background: #0f0f12; color: white; display: grid; place-items: center; height: 100vh; margin: 0; }
    h1 { background: linear-gradient(to right, #60a5fa, #a855f7); -webkit-background-clip: text; color: transparent; }
  </style>
</head>
<body>
  <div style="text-align: center">
    <h1>Hello World</h1>
    <p>Edit this code to see live changes!</p>
  </div>
</body>
</html>`,

    css: `body {
  background: #111;
  color: white;
}`,

    javascript: `console.log("Hello from JavaScript!");

function sum(a, b) {
  return a + b;
}

console.log("Sum of 5 + 3 =", sum(5, 3));`,

    // Backend (Piston Execution)
    python: `def greet(name):
    return f"Hello, {name}!"

print(greet("DevFixer User"))
print("Calculations:", 2 ** 10)`,

    cpp: `#include <iostream>

int main() {
    std::cout << "Hello from C++" << std::endl;
    return 0;
}`,

    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Java");
    }
}`,

    csharp: `using System;

public class Program {
    public static void Main() {
        Console.WriteLine("Hello from C#");
    }
}`,

    go: `package main
import "fmt"

func main() {
    fmt.Println("Hello from Go")
}`,

    rust: `fn main() {
    println!("Hello from Rust");
}`,

    php: `<?php
echo "Hello from PHP";
?>`,

    sql: `-- SQL support coming soon with in-memory SQLite`
};
