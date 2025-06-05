/// <reference types="cypress" />

describe('Coco Bambu Delivery - Fluxo Camarão Internacional', () => {
  // Seletores atualizados com base no HTML fornecido
  const SELECTORS = {
    loginButton: 'button:contains("ENTRAR")',
    addressInput: 'input[placeholder="Informe seu endereço"]',
    productCard: 'item-card',
    productName: 'span.item-name',
    addToCartButton: 'button[type="submit"]',
    productTitle: 'header-bar span.label',
    // Novos seletores baseados na estrutura HTML
    bagButton: 'bag-button',
    cartContainer: 'bag-button .container',
    cartItemsContainer: 'bag-button .items-container',
    cartIcon: 'bag-button img[src*="bag-white.svg"]',
    cartItemsQuantity: 'bag-button .bag-button-items-quantity',
    cartTotal: 'bag-button .bag-button-total',
    cartPanel: 'div.cart-panel, div.shopping-cart, div.cart-content',
    // Seletores para remoção do item
    itemOptionsButton: 'section.section-separator ion-button.edit-item-button',
    removeItemOption: 'ion-item:has(ion-label:contains("Remover"))',
    confirmationMessage: 'div:contains("Item removido do carrinho")'
  };

  const TEST_DATA = {
    address: 'Quadra 205, Lote 6, Aguas Claras',
    addressSuggestion: '6 - Q 205 - Águas Claras',
    productName: 'Camarão Internacional (Meio ou Inteiro)',
    productPartialName: 'Camarão Internacional',
    productDescription: 'Camarões (18 g/unid) servido sobre cremoso arroz com ervilhas e presunto',
    expectedPrice: '148,01',
    productImage: '0fa49965a4014061999b7b632a32c88a_thumb_100.jpg',
    expectedTotal: '153,01'
  };

  /**
   * Realiza o login com credenciais de teste
   */
  const performLogin = () => {
    cy.contains('Perfil').click();
    cy.contains('Entrar', { timeout: 10000 }).click();
    cy.get('input[placeholder="E-mail"]').type('123jccml@gmail.com');
    cy.get('input[placeholder="Senha"]').type('Senha@cocobambu10');
    cy.get(SELECTORS.loginButton).click();
    
    // 2FA
    cy.contains('button', 'FECHAR', { timeout: 10000 }).should('be.visible').click();
    cy.get('.otp-input', { timeout: 10000 }).should('be.visible');
    Cypress._.times(6, (i) => cy.get('.otp-input').eq(i).type('A'));
    cy.contains("button", "ACESSAR").click();
    
    // Verifica login
    cy.url().should("include", "/delivery", { timeout: 20000 });
  };

  /**
   * Configura o endereço de entrega
   */
  const setupDeliveryAddress = () => {
    cy.get(SELECTORS.addressInput, { timeout: 20000 })
      .should("be.visible")
      .type(TEST_DATA.address);
    
    cy.contains(TEST_DATA.addressSuggestion, { timeout: 10000 })
      .should("be.visible")
      .click();

    cy.get("body").then(($body) => {
      if ($body.find("button:contains('CONFIRMAR')").length > 0) {
        cy.contains("button", "CONFIRMAR").click();
      }
    });
  };

  /**
   * Navega até o produto
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
   * Seleciona o produto
   */
  const selectProduct = () => {
    cy.contains(TEST_DATA.productName, { timeout: 20000 })
      .parents(SELECTORS.productCard)
      .first()
      .as('productCard')
      .should('contain', TEST_DATA.productDescription)
      .and('contain', `A partir de R$ ${TEST_DATA.expectedPrice}`);

    cy.get('@productCard').within(() => {
      cy.get(`img[src*="${TEST_DATA.productImage}"]`)
        .should('exist');
    });

    cy.get('@productCard').click({ force: true });
  };

  /**
   * Verifica se a página do produto carregou corretamente
   */
  const verifyProductPage = () => {
    cy.url().should("include", "/item/", { timeout: 20000 });
    
    cy.get(SELECTORS.productTitle, { timeout: 15000 })
      .should('be.visible')
      .then(($title) => {
        expect($title.text()).to.include(TEST_DATA.productPartialName);
      });

    cy.get('body').then(($body) => {
      if (!$body.find(SELECTORS.productTitle).length) {
        cy.get('h1, [itemprop="name"], .product-title', { timeout: 10000 })
          .first()
          .should('contain', TEST_DATA.productPartialName);
      }
    });
  };

  /**
   * Adiciona ao carrinho com verificação explícita
   */
  const addToCart = () => {
    cy.get(SELECTORS.addToCartButton, { timeout: 20000 })
      .should('be.visible')
      .click({ force: true });
    
    // Aguarda a confirmação de que o item foi adicionado
    cy.contains('Item adicionado ao carrinho', { timeout: 10000 })
      .should('be.visible')
      .then(() => {
        cy.get('button:contains("FECHAR")').click({ force: true });
      });
  };

  /**
   * Verifica e interage com a sacola de compras
   */
  const verifyAndOpenCart = () => {
    // Verifica o elemento completo da sacola
    cy.get(SELECTORS.bagButton, { timeout: 15000 })
      .should('be.visible')
      .within(() => {
        // Verifica o ícone
        cy.get(SELECTORS.cartIcon).should('be.visible');
        
        // Verifica o texto "Ver sacola"
        cy.get(SELECTORS.cartItemsQuantity)
          .should('contain', 'Ver sacola')
          .and('be.visible');
        
        // Verifica a quantidade e valor total
        cy.get(SELECTORS.cartTotal)
          .should('contain', '1 Item')
          .and('contain', TEST_DATA.expectedTotal)
          .and('be.visible');
      });

    // Clica para abrir a sacola
    cy.get(SELECTORS.cartItemsContainer)
      .should('be.visible')
      .click();

    // Verifica se o painel da sacola abriu
    cy.get(SELECTORS.cartPanel, { timeout: 15000 })
      .should('be.visible');
  };

  /**com verificação explícita com os passos específicos fornecidos
   */
  const removeItemFromCart = () => {
    // 1. Clica no botão de opções do item
    cy.get(SELECTORS.itemOptionsButton)
      .first()
      .should('be.visible')
      .click({ force: true });
    
    // 2. Clica na opção "Remover"
    cy.get(SELECTORS.removeItemOption)
      .should('be.visible')
      .click({ force: true });
    
    // Verifica mensagem de confirmação
    cy.get(SELECTORS.confirmationMessage, { timeout: 10000 })
      .should('be.visible');
    
    // Verifica se o carrinho está vazio
    cy.get(SELECTORS.bagButton)
      .should('contain', '0 Itens');
  };

  // Contexto com login
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

  // Contexto sem login
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