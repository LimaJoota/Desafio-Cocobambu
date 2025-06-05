# Desafio Técnico QA - Coco Bambu

Este repositório contém a solução para o desafio técnico proposto no processo seletivo de QA Engineer do Coco Bambu.

## Estrutura do Projeto

```
/coco_bambu_qa_challenge
|-- cypress/
|   |-- e2e/
|   |   |-- ui_add_to_cart.cy.js    # Teste automatizado UI (Fluxo Adicionar ao Carrinho)
|   |   |-- api_cart_tests.cy.js    # Testes automatizados API (DummyJSON Carts)
|   |-- fixtures/
|   |-- support/
|-- node_modules/
|-- critical_flows.md         # Documentação dos 3 fluxos críticos identificados
|-- api_test_scenarios.md     # Documentação dos cenários de teste da API
|-- package.json
|-- package-lock.json
|-- README.md                 # Este arquivo
```

## Ferramentas Utilizadas

*   **Node.js:** Ambiente de execução JavaScript.
*   **npm:** Gerenciador de pacotes Node.js.
*   **Cypress:** Framework de automação de testes para UI e API.

## Configuração do Ambiente

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/LimaJoota/Desafio-Cocobambu
    cd coco_bambu_qa_challenge
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```

## Execução dos Testes

Existem duas maneiras principais de executar os testes Cypress:

1.  **Via Cypress Test Runner (Interface Gráfica):**
    *   Abra o Cypress Test Runner:
        ```bash
        npx cypress open
        ```
    *   Na interface do Cypress, selecione "E2E Testing".
    *   Escolha o navegador desejado.
    *   Clique no arquivo de teste que deseja executar (`ui_add_to_cart.cy.js` ou `api_cart_tests.cy.js`).

2.  **Via Linha de Comando (Headless):**
    *   Execute todos os testes E2E:
        ```bash
        npx cypress run
        ```
    *   Execute um arquivo de teste específico:
        ```bash
        # Para o teste de UI
        npx cypress run --spec "cypress/e2e/ui_add_to_cart.cy.js"

        # Para os testes de API
        npx cypress run --spec "cypress/e2e/api_cart_tests.cy.js"
        ```

**Observações:**

*   O teste de UI (`ui_add_to_cart.cy.js`) utiliza as credenciais fornecidas no desafio (`123jccml@gmail.com` / `Senha@cocobambu10`) e o código de autenticação fixo `AAAAAA`. Certifique-se de que esta conta e o método de autenticação estejam ativos no ambiente de homologação (`https://app-hom.cocobambu.com`).
*   Os testes de API (`api_cart_tests.cy.js`) interagem com a API pública `https://dummyjson.com/carts`.

## Entregáveis

*   **Identificação de Fluxos Críticos:** Documentado em `critical_flows.md`.
*   **Teste de Automação UI:** Implementado em `cypress/e2e/ui_add_to_cart.cy.js`.
*   **Teste de Automação API:**
    *   Cenários e técnica documentados em `api_test_scenarios.md`.
    *   Implementação dos testes automatizados em `cypress/e2e/api_cart_tests.cy.js`.
*   **README:** Este arquivo com instruções claras.

