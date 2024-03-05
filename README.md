# Payments

Este projeto permite ao usuário cadastrar saldos e pagamentos, sendo que cada pagamento consome de um saldo cadastrado, desde que este saldo tenha valor restante.

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
  

- Acesse no http://localhost:3000 no navegador.

![Home](https://github.com/frinhanifrinhani/image-repo/blob/main/payments/home.png)


- Acesse o menu Cadastar e realize o cadastro de um usuário.
  
![Cadastrar usuario](https://github.com/frinhanifrinhani/image-repo/blob/main/payments/register.png)


- Após cadastrar um usuário, você será redirecionado para a tela de login, utilize o e-mail e senha que foram cadastrados.

![login](https://github.com/frinhanifrinhani/image-repo/blob/main/payments/login.png)
  
  
  

  
