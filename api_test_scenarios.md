# Cenários de Teste e Automação para API DummyJSON (Carrinho)

Conforme solicitado no desafio, esta seção detalha os cenários de teste criados para as rotas de adicionar, atualizar e remover itens do carrinho da API DummyJSON, a técnica utilizada e a implementação da automação com Cypress.

## API Endpoints (DummyJSON):

*   **Adicionar Item:** `POST /carts/add` (Documentação: https://dummyjson.com/docs/carts#carts-add)
*   **Atualizar Carrinho:** `PUT /carts/{cartId}` (Documentação: https://dummyjson.com/docs/carts#carts-update)
*   **Remover Item do Carrinho:** `DELETE /carts/{cartId}` (Documentação: https://dummyjson.com/docs/carts#carts-delete)

## Técnica de Teste Utilizada: Teste Funcional e de Validação de Esquema (Schema Validation)

**Justificativa:**

*   **Teste Funcional:** O objetivo principal é verificar se cada endpoint da API executa a função esperada corretamente (adicionar, atualizar, deletar) com dados válidos e como lida com dados inválidos ou cenários de erro.
*   **Validação de Esquema:** Garante que a estrutura da resposta da API (JSON) esteja em conformidade com o contrato esperado (documentação). Isso ajuda a detectar alterações inesperadas na estrutura da resposta que poderiam quebrar integrações.

## Cenários de Teste Detalhados:

**1. Adicionar Item ao Carrinho (`POST /carts/add`)**

*   **Cenário 1.1 (Sucesso):** Adicionar um produto válido a um carrinho para um usuário específico.
    *   **Dados:** `userId` válido, `products` array com pelo menos um produto contendo `id` e `quantity` válidos.
    *   **Validação Esperada:** Status Code `200 OK` ou `201 Created` (conforme a API). Resposta contém os detalhes do carrinho atualizado, incluindo o produto adicionado. Validar o esquema da resposta.
*   **Cenário 1.2 (Erro - Usuário Inválido):** Tentar adicionar um produto com `userId` inválido ou inexistente.
    *   **Dados:** `userId` inválido (e.g., string, negativo), `products` válidos.
    *   **Validação Esperada:** Status Code de erro apropriado (e.g., `400 Bad Request`, `404 Not Found`). Mensagem de erro clara na resposta.
*   **Cenário 1.3 (Erro - Produto Inválido):** Tentar adicionar um produto com `id` inválido ou inexistente no array `products`.
    *   **Dados:** `userId` válido, `products` array com `id` inválido.
    *   **Validação Esperada:** Status Code de erro apropriado (e.g., `400 Bad Request`). Mensagem de erro indicando produto inválido.
*   **Cenário 1.4 (Erro - Quantidade Inválida):** Tentar adicionar um produto com `quantity` inválida (e.g., zero, negativa, string).
    *   **Dados:** `userId` válido, `products` array com `quantity` inválida.
    *   **Validação Esperada:** Status Code de erro apropriado (e.g., `400 Bad Request`). Mensagem de erro indicando quantidade inválida.
*   **Cenário 1.5 (Erro - Corpo da Requisição Inválido):** Enviar requisição com corpo malformado ou faltando campos obrigatórios.
    *   **Dados:** Corpo JSON inválido (e.g., faltando `userId` ou `products`).
    *   **Validação Esperada:** Status Code `400 Bad Request`. Mensagem de erro indicando problema na requisição.

**2. Atualizar Carrinho (`PUT /carts/{cartId}`)**

*   **Cenário 2.1 (Sucesso):** Atualizar a quantidade de um produto existente em um carrinho específico.
    *   **Dados:** `cartId` válido, corpo da requisição com `merge: true` (para não sobrescrever) e `products` array contendo o `id` do produto a ser atualizado e a nova `quantity`.
    *   **Validação Esperada:** Status Code `200 OK`. Resposta contém os detalhes do carrinho atualizado com a nova quantidade. Validar esquema.
*   **Cenário 2.2 (Sucesso - Substituir):** Substituir todos os produtos de um carrinho (usando `merge: false` ou omitindo).
    *   **Dados:** `cartId` válido, corpo da requisição com `products` array contendo os novos produtos.
    *   **Validação Esperada:** Status Code `200 OK`. Resposta contém apenas os novos produtos. Validar esquema.
*   **Cenário 2.3 (Erro - Carrinho Inválido):** Tentar atualizar um carrinho com `cartId` inválido ou inexistente.
    *   **Dados:** `cartId` inválido (e.g., 9999).
    *   **Validação Esperada:** Status Code `404 Not Found`. Mensagem de erro indicando carrinho não encontrado.
*   **Cenário 2.4 (Erro - Produto Inválido na Atualização):** Tentar atualizar um produto com `id` inválido.
    *   **Dados:** `cartId` válido, `products` array com `id` inválido.
    *   **Validação Esperada:** Status Code de erro apropriado (e.g., `400 Bad Request`). Mensagem de erro.
*   **Cenário 2.5 (Erro - Corpo da Requisição Inválido):** Enviar requisição PUT com corpo malformado.
    *   **Dados:** Corpo JSON inválido.
    *   **Validação Esperada:** Status Code `400 Bad Request`. Mensagem de erro.

**3. Remover Item do Carrinho (`DELETE /carts/{cartId}`)**

*   **Cenário 3.1 (Sucesso):** Remover um carrinho existente com sucesso.
    *   **Dados:** `cartId` válido.
    *   **Validação Esperada:** Status Code `200 OK`. Resposta indica que o carrinho foi removido (e.g., contém `isDeleted: true`). Validar esquema da resposta de deleção.
*   **Cenário 3.2 (Erro - Carrinho Inválido):** Tentar remover um carrinho com `cartId` inválido ou inexistente.
    *   **Dados:** `cartId` inválido (e.g., 9999).
    *   **Validação Esperada:** Status Code `404 Not Found`. Mensagem de erro indicando carrinho não encontrado.
*   **Cenário 3.3 (Erro - Carrinho Já Removido):** Tentar remover um carrinho que já foi removido.
    *   **Dados:** `cartId` válido de um carrinho previamente removido.
    *   **Validação Esperada:** Status Code `404 Not Found` ou `200 OK` com indicação de que já estava removido (depende da implementação da API).

## Automação com Cypress:

Os cenários acima serão automatizados utilizando a funcionalidade `cy.request()` do Cypress para interagir diretamente com os endpoints da API DummyJSON. As validações incluirão a verificação do Status Code, propriedades específicas do corpo da resposta e, quando aplicável, a validação do esquema da resposta contra um esquema JSON definido.

