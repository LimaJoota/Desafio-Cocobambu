/// <reference types="cypress" />

/**
 * Test Suite: Coco Bambu Delivery - International Shrimp Flow
 * 
 * This test suite verifies the complete user journey for:
 * 1. Adding an International Shrimp product to cart (logged in and guest user)
 * 2. Verifying cart contents and totals
 * 3. Removing items from cart
 */
describe('Coco Bambu Delivery - Fluxo Camarão Internacional', () => {
  // --- SELECTORS ---
  // Centralized element selectors for easy maintenance
  const SELECTORS = {
    // Authentication
    loginButton: 'button:contains("ENTRAR")',
    
    // Address handling
    addressInput: 'input[placeholder="Informe seu endereço"]',
    
    // Product elements
    productCard: 'item-card',
    productName: 'span.item-name',
    addToCartButton: 'button[type="submit"]',
    productTitle: 'header-bar span.label',
    
    // Cart elements
    bagButton: 'bag-button',
    cartContainer: 'bag-button .container',
    cartItemsContainer: 'bag-button .items-container',
    cartIcon: 'bag-button img[src*="bag-white.svg"]',
    cartItemsQuantity: 'bag-button .bag-button-items-quantity',
    cartTotal: 'bag-button .bag-button-total',
    cartPanel: 'div.cart-panel, div.shopping-cart, div.cart-content',
    
    // Item removal flow
    itemOptionsButton: 'section.section-separator ion-button.edit-item-button',
    removeItemOption: 'ion-item:has(ion-label:contains("Remover"))',
    confirmationMessage: 'div:contains("Item removido do carrinho")'
  };

  // --- TEST DATA ---
  // Centralized test data for easy updates and maintenance
  const TEST_DATA = {
    // Address information
    address: 'Quadra 205, Lote 6, Aguas Claras',
    addressSuggestion: '6 - Q 205 - Águas Claras',
    
    // Product information
    productName: 'Camarão Internacional (Meio ou Inteiro)',
    productPartialName: 'Camarão Internacional',
    productDescription: 'Camarões (18 g/unid) servido sobre cremoso arroz com ervilhas e presunto',
    expectedPrice: '148,01',
    productImage: '0fa49965a4014061999b7b632a32c88a_thumb_100.jpg',
    expectedTotal: '153,01',
    
    // Authentication
    userEmail: '123jccml@gmail.com',
    userPassword: 'Senha@cocobambu10',
    otpCode: 'AAAAAA' // Mock OTP for 2FA
  };

  // --- HELPER FUNCTIONS ---

  /**
   * Performs user login with test credentials
   * Includes handling for 2FA verification
   */
  const performLogin = () => {
    // Navigate to profile and initiate login
    cy.contains('Perfil').click();
    cy.contains('Entrar', { timeout: 10000 }).click();
    
    // Fill in credentials
    cy.get('input[placeholder="E-mail"]').type(TEST_DATA.userEmail);
    cy.get('input[placeholder="Senha"]').type(TEST_DATA.userPassword);
    cy.get(SELECTORS.loginButton).click();
    
    // Handle 2FA flow
    cy.contains('button', 'FECHAR', { timeout: 10000 })
      .should('be.visible')
      .click();
    cy.get('.otp-input', { timeout: 10000 }).should('be.visible');
    cy.get('.otp-input').each(($input) => {
      cy.wrap($input).type('A');
    });
    cy.contains("button", "ACESSAR").click();
    
    // Verify successful login
    cy.url().should("include", "/delivery", { timeout: 20000 });
  };

  /**
   * Sets up the delivery address
   * Handles both new address entry and confirmation if needed
   */
  const setupDeliveryAddress = () => {
    // Enter and select address
    cy.get(SELECTORS.addressInput, { timeout: 20000 })
      .should("be.visible")
      .type(TEST_DATA.address);
    
    cy.contains(TEST_DATA.addressSuggestion, { timeout: 10000 })
      .should("be.visible")
      .click();

    // Handle address confirmation if prompted
    cy.get("body").then(($body) => {
      if ($body.find("button:contains('CONFIRMAR')").length > 0) {
        cy.contains("button", "CONFIRMAR").click();
      }
    });
  };

  /**
   * Navigates to the target product in the menu
   * Handles scrolling if product is not initially visible
   */
  const navigateToProduct = () => {
    cy.contains(TEST_DATA.productName, { timeout: 20000 })
      .should('exist')
      .then(($el) => {
        if (!$el.is(':visible')) {
          cy.wrap($el).scrollIntoView();
        }
      });
  };

  /**
   * Selects the product and verifies its details
   */
  const selectProduct = () => {
    // Find and verify product card
    cy.contains(TEST_DATA.productName, { timeout: 20000 })
      .parents(SELECTORS.productCard)
      .first()
      .as('productCard')
      .should('contain', TEST_DATA.productDescription)
      .and('contain', `A partir de R$ ${TEST_DATA.expectedPrice}`);

    // Verify product image
    cy.get('@productCard').within(() => {
      cy.get(`img[src*="${TEST_DATA.productImage}"]`)
        .should('exist');
    });

    // Click to view product details
    cy.get('@productCard').click({ force: true });
  };

  /**
   * Verifies the product page loaded correctly
   * Includes fallback selectors for robustness
   */
  const verifyProductPage = () => {
    // Verify URL
    cy.url().should("include", "/item/", { timeout: 20000 });
    
    // Verify product title
    cy.get(SELECTORS.productTitle, { timeout: 15000 })
      .should('be.visible')
      .then(($title) => {
        expect($title.text()).to.include(TEST_DATA.productPartialName);
      });

    // Fallback title verification
    cy.get('body').then(($body) => {
      if (!$body.find(SELECTORS.productTitle).length) {
        cy.get('h1, [itemprop="name"], .product-title', { timeout: 10000 })
          .first()
          .should('contain', TEST_DATA.productPartialName);
      }
    });
  };

  /**
   * Adds product to cart and verifies success
   */
  const addToCart = () => {
    // Click add to cart button
    cy.get(SELECTORS.addToCartButton, { timeout: 20000 })
      .should('be.visible')
      .click({ force: true });
    
    // Verify success notification
    cy.contains('Item adicionado ao carrinho', { timeout: 10000 })
      .should('be.visible')
      .then(() => {
        cy.get('button:contains("FECHAR")').click({ force: true });
      });
  };

  /**
   * Verifies cart contents and opens cart panel
   */
  const verifyAndOpenCart = () => {
    // Verify cart button state
    cy.get(SELECTORS.bagButton, { timeout: 15000 })
      .should('be.visible')
      .within(() => {
        cy.get(SELECTORS.cartIcon).should('be.visible');
        cy.get(SELECTORS.cartItemsQuantity)
          .should('contain', 'Ver sacola')
          .and('be.visible');
        cy.get(SELECTORS.cartTotal)
          .should('contain', '1 Item')
          .and('contain', TEST_DATA.expectedTotal)
          .and('be.visible');
      });

    // Open cart panel
    cy.get(SELECTORS.cartItemsContainer)
      .should('be.visible')
      .click();

    // Verify cart panel is visible
    cy.get(SELECTORS.cartPanel, { timeout: 15000 })
      .should('be.visible');
  };

  /**
   * Removes item from cart and verifies removal
   */
  const removeItemFromCart = () => {
    // Open item options
    cy.get(SELECTORS.itemOptionsButton)
      .first()
      .should('be.visible')
      .click({ force: true });
    
    // Select remove option
    cy.get(SELECTORS.removeItemOption)
      .should('be.visible')
      .click({ force: true });
    
    // Verify removal confirmation
    cy.get(SELECTORS.confirmationMessage, { timeout: 10000 })
      .should('be.visible');
    
    // Verify cart is empty
    cy.get(SELECTORS.bagButton)
      .should('contain', '0 Itens');
  };

  // --- TEST CASES ---

  // Authenticated user flow
  context('Fluxo com Autenticação', () => {
    beforeEach(() => {
      cy.visit('https://app-hom.cocobambu.com/delivery');
      performLogin();
    });

    it('deve adicionar e remover item do carrinho quando logado', () => {
      navigateToProduct();
      selectProduct();
      verifyProductPage();
      addToCart();
      verifyAndOpenCart();
      removeItemFromCart();
    });
  });

  // Guest user flow
  context('Fluxo sem Autenticação', () => {
    beforeEach(() => {
      cy.visit("https://app-hom.cocobambu.com/delivery");
      setupDeliveryAddress();
    });

    it('deve adicionar e remover item do carrinho sem login', () => {
      navigateToProduct();
      selectProduct();
      verifyProductPage();
      addToCart();
      verifyAndOpenCart();
      removeItemFromCart();
    });
  });
});