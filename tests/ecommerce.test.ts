import { describe, it, expect, beforeEach } from "vitest";
import {
  addProduct,
  addToCart,
  calculateTotal,
  applyShippingDiscount,
  clearCart,
} from "../src/ecommerce";
import { W } from "vitest/dist/chunks/reporters.C_zwCd4j.js";

let cart = {};

// describe is used to group tests
// expect is used as assertion
describe("E-commerce System", () => {
    // before every test allows you to setup everything.
  beforeEach(() => {
    addProduct("Soap", 100, 10);
    addProduct("Shampoo", 200, 5);
    clearCart();
  });

  it("should calculate price of all products", () => {
      // Arrange
    addToCart("Soap", 2);
    addToCart("Shampoo", 2);

    // Act
    const sum = calculateTotal();

    // Assert
    expect(sum).toBe(600);
  });

  it ("should add items to cart", () => {
      // Arrange
      let cart = {};
      // Act
      cart = addToCart("Soap", 2);
      // Assert
      expect(cart["Soap"]).toBe(2);
  });
  
  it("should give a 10$ off if total in cart reaches 500", () => {
    // Arrange
    let cart = {};
    // Act
    cart = addToCart("Soap", 5);
    cart = addToCart("Shampoo", 2);
    const total = calculateTotal();
    const discountedTotal = applyShippingDiscount(total);
    // Assert
    expect(discountedTotal).toBe(890);
  });

  it("should not give a 10$ off if total in cart reaches 500", () => {
    // Arrange
    let cart = {};
    // Act
    cart = addToCart("Soap", 1);
    cart = addToCart("Shampoo", 1);
    const total = calculateTotal();
    const discountedTotal = applyShippingDiscount(total);
    // Assert
    expect(discountedTotal).toBe(300);
  });
});
