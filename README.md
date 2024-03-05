# Payments

Este projeto permite ao usuário cadastrar saldos e pagamentos, onde um pagamento pode consumir parte de um saldo cadastrado ou até o valor total de um saldo, desde que este saldo tenha valor restante.

## Instalação

Para instalação deste projeto é necessario ter instalados:
- Git
- Docker

## Como instalar

- Clone o projeto em um diretorio da sua escolha.
  
![Git clone](https://github.com/frinhanifrinhani/image-repo/blob/main/payments/git_clone.png)


  
- Abra o terminal na raiz do projeto que foi clonado. Confirme que foram clonados os repositórios api e app, que são respectivamente o backend e o frontend.
  
![Projeto clonado](https://github.com/frinhanifrinhani/image-repo/blob/main/payments/cd_lsla.png) 



- Execute o comando `docker-compose up -d --build`
  
![Comando docker-compose](https://github.com/frinhanifrinhani/image-repo/blob/main/payments/docker-compose.png)



- Após a execução do docker-compose com sucesso, deverá aparece o resultado de sucesso.
  
![Comando docker-compose success](https://github.com/frinhanifrinhani/image-repo/blob/main/payments/containers.png)



- Verifique se os containers estão iniciados com o comando  `docker ps`
  
![Comando docker ps](https://github.com/frinhanifrinhani/image-repo/blob/main/payments/docker-ps.png)


- Acesse o container da API para executar as migrations, com o comando  `docker exec -it payments-api-1 bash`

  OBS: payments-api-1 é o nome do container, como mostra a imagem seguinte.
  
![API bash](https://github.com/frinhanifrinhani/image-repo/blob/main/payments/api_bash.png)


- Execute o comando `php artisan migrate --force`

![Migration](https://github.com/frinhanifrinhani/image-repo/blob/main/payments/migration.png)


- Ainda dentro do container, execute os teste unitários como comando `php artisan test --testsuite=Unit`

![Testes unitários](https://github.com/frinhanifrinhani/image-repo/blob/main/payments/teste-php-unit.png)



## Utilizando a API

Na raiz do projeto existe o arquivo Payments.postman_collection.json que pode ser importado em algum API Client desejado,
uma vez importando, você terá acesso os recurso da API, na imagem a seguir é possível ver os recursos atráves do Postman.

![Postman](https://github.com/frinhanifrinhani/image-repo/blob/main/payments/postman.png)
  


## Acessando a aplicação

- Acesse no http://localhost:3000 no navegador.

![Home](https://github.com/frinhanifrinhani/image-repo/blob/main/payments/home.png)

### Autenticação
- Acesse o menu Cadastar e realize o cadastro de um usuário.
  
![Cadastrar usuario](https://github.com/frinhanifrinhani/image-repo/blob/main/payments/register.png)


- Após cadastrar um usuário, você será redirecionado para a tela de login, utilize o e-mail e senha que foram cadastrados para realizar a autenticação.

![login](https://github.com/frinhanifrinhani/image-repo/blob/main/payments/login.png)



### Saldos

Através do menu Saldos, será possível listar os saldos, cadastrar um saldo, editar um saldo e excluír um saldo.
Saldos com pagamentos vinculados não podem ser excluídos.




### Pagamentos

Através do menu Pagamentos, será possível listar os pagamentos, cadastrar um pagamento, editar um pagamento e excluír um pagamento.
Os valores dos pagamentos excluídos são devolvidos os seus saldos.
  
  

  
