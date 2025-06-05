# Fluxos Críticos Adicionais - Plataforma de Delivery Coco Bambu

## Fluxos Já Identificados (3 fluxos iniciais)
1. **Fluxo de Definição de Endereço de Entrega**
2. **Fluxo de Adição de Itens ao Carrinho**
3. **Fluxo de Finalização da Compra (Checkout)**

## Fluxos Críticos Adicionais (7 novos fluxos)

### 4. Fluxo de Busca e Seleção de Restaurante

**Descrição:** Este fluxo envolve a busca e seleção de um restaurante Coco Bambu disponível para entrega no endereço informado. Após definir o endereço, o usuário precisa visualizar os restaurantes disponíveis, possivelmente filtrar por distância ou tempo de entrega, e selecionar um estabelecimento específico para visualizar o cardápio.

**Justificativa da Criticidade:** A seleção do restaurante é um passo obrigatório entre a definição do endereço e a visualização do cardápio. Se o usuário não conseguir encontrar ou selecionar um restaurante, não poderá avançar para a escolha de itens. Falhas neste fluxo podem ocorrer se a lista de restaurantes não carregar corretamente, se os filtros não funcionarem, ou se o clique no restaurante não redirecionar para o cardápio.

**Status de Validação:** Em validação na plataforma.

### 5. Fluxo de Aplicação de Cupons e Promoções

**Descrição:** Este fluxo permite ao usuário aplicar cupons de desconto ou acessar promoções disponíveis durante o processo de compra. Geralmente envolve a inserção de um código promocional em um campo específico, a validação deste código pelo sistema, e a aplicação do desconto correspondente ao valor total do pedido.

**Justificativa da Criticidade:** Embora não impeça completamente a finalização da compra, este fluxo é crítico para a conversão de vendas, pois muitos usuários decidem comprar motivados por descontos. Falhas na aplicação de cupons válidos podem levar à desistência da compra, especialmente quando o desconto é significativo ou quando o usuário recebeu o cupom como parte de uma campanha específica.

**Status de Validação:** Em validação na plataforma.

### 6. Fluxo de Personalização de Itens

**Descrição:** Este fluxo permite ao usuário personalizar os itens selecionados, como escolher o ponto da carne, adicionar ou remover ingredientes, selecionar acompanhamentos, ou especificar instruções especiais para o preparo. Geralmente é acessado após selecionar um item do cardápio e antes de adicioná-lo ao carrinho.

**Justificativa da Criticidade:** A personalização de itens é fundamental para a satisfação do cliente, especialmente em restaurantes como o Coco Bambu, onde os pratos podem ser adaptados às preferências individuais. Se o usuário não conseguir personalizar os itens conforme desejado, pode desistir da compra ou ficar insatisfeito com o pedido recebido, impactando negativamente a experiência e reduzindo a probabilidade de compras futuras.

**Status de Validação:** Em validação na plataforma.

### 7. Fluxo de Gerenciamento de Itens no Carrinho

**Descrição:** Este fluxo permite ao usuário visualizar, modificar quantidades, remover itens ou esvaziar completamente o carrinho de compras antes de prosseguir para o checkout. Inclui ações como aumentar/diminuir a quantidade de um item, excluir itens específicos, ou limpar todo o carrinho.

**Justificativa da Criticidade:** O gerenciamento eficiente do carrinho é essencial para que o usuário possa ajustar seu pedido antes da finalização. Falhas neste fluxo, como botões de aumento/diminuição de quantidade que não funcionam, ou a impossibilidade de remover itens, podem frustrar o usuário e levar ao abandono da compra, especialmente quando há necessidade de corrigir erros ou adaptar o pedido a novas circunstâncias (como orçamento ou número de pessoas).

**Status de Validação:** Em validação na plataforma.

### 8. Fluxo de Seleção de Método de Pagamento

**Descrição:** Este fluxo permite ao usuário escolher como deseja pagar pelo pedido, incluindo opções como cartão de crédito/débito, dinheiro, vouchers, ou pagamentos online (como PIX). Dependendo do método escolhido, o sistema pode solicitar informações adicionais, como dados do cartão ou confirmação de troco necessário.

**Justificativa da Criticidade:** A seleção do método de pagamento é um passo obrigatório no processo de checkout. Se o usuário não conseguir selecionar ou configurar corretamente o método de pagamento desejado, a finalização da compra será impossível. Problemas comuns incluem falhas na validação de dados de cartão, indisponibilidade de métodos de pagamento preferidos, ou erros na integração com gateways de pagamento.

**Status de Validação:** Em validação na plataforma.

### 9. Fluxo de Acompanhamento de Pedido

**Descrição:** Este fluxo permite ao usuário acompanhar o status do seu pedido após a finalização da compra, incluindo confirmação do restaurante, preparo, saída para entrega e entrega concluída. Pode incluir notificações push, atualizações por email/SMS, ou uma interface de rastreamento em tempo real.

**Justificativa da Criticidade:** Embora ocorra após a conversão da venda, este fluxo é crítico para a experiência do usuário e para futuras compras. Se o cliente não conseguir acompanhar o status do seu pedido, pode gerar ansiedade, ligações desnecessárias para o suporte, ou até mesmo cancelamentos. Um sistema de acompanhamento que não atualiza corretamente ou que fornece informações imprecisas pode prejudicar significativamente a confiança do cliente na plataforma.

**Status de Validação:** Em validação na plataforma.

### 10. Fluxo de Login e Cadastro Durante o Checkout

**Descrição:** Este fluxo permite que usuários não autenticados criem uma conta ou façam login durante o processo de checkout, sem perder os itens já adicionados ao carrinho. Inclui opções como "Continuar como convidado", "Fazer login" ou "Criar conta", com validações de email, senha e, possivelmente, verificação em duas etapas.

**Justificativa da Criticidade:** O momento do checkout é crítico para a conversão, e interrupções no fluxo para forçar login ou cadastro podem levar ao abandono do carrinho. Um fluxo bem projetado permite que o usuário decida como proceder (como convidado ou usuário registrado) sem perder o progresso já realizado. Falhas neste fluxo, como perda de dados do carrinho após login, formulários de cadastro com erros, ou processos de verificação muito complexos, podem resultar em desistência da compra.

**Status de Validação:** Em validação na plataforma.

## Próximos Passos

1. Validar a existência e funcionalidade de cada fluxo na plataforma
2. Documentar detalhadamente os fluxos validados
3. Selecionar 5 fluxos para automação com Cypress usando BDD
4. Implementar os testes automatizados
5. Validar e documentar as rotas de API do carrinho
