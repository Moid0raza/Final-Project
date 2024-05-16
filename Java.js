"use strict";

// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Parallax scrolling effect
    window.addEventListener("scroll", function() {
        let scrolled = window.scrollY;
        document.querySelectorAll(".parallax").forEach(function(parallax) {
            let speed = parallax.getAttribute("data-speed");
            let yPos = -(scrolled * speed);
            parallax.style.backgroundPosition = `center ${yPos}px`;
        });
    });

    // Get a reference to the membership form
    let membershipForm = document.getElementById("membershipForm");

    // Add event listener for form submission
    membershipForm.addEventListener("submit", function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        
        // Perform form validation
        validateForm();
    });

    // Function to perform form validation
    function validateForm() {
        // Get form elements by their IDs
        let fullNameInput = document.getElementById("fullName");
        let cardNumberInput = document.getElementById("cardNumber");

        // Validate full name
        if (fullNameInput.value.trim() === "") {
            alert("Please enter your full name.");
            fullNameInput.focus();
            return false;
        }

        // Validate credit card number using Luhn algorithm
        let cardNumber = cardNumberInput.value.replace(/\s/g, ""); // Remove whitespace
        if (!isValidCardNumber(cardNumber)) {
            alert("Please enter a valid credit card number.");
            cardNumberInput.focus();
            return false;
        }

        // If all validations pass, submit the form
        membershipForm.submit();
    }

    // Function to validate credit card number using Luhn algorithm
    function isValidCardNumber(cardNumber) {
        let sum = 0;
        let double = false;
        
        // Iterate through each digit in reverse order
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber.charAt(i));
            
            // Double every second digit
            if (double) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            
            // Add the digit to the sum
            sum += digit;
            double = !double;
        }
        
        // The card number is valid if the sum is a multiple of 10
        return (sum % 10 === 0);
    }
});