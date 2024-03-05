# Payments

Este projeto permite ao usuário cadastrar saldos e pagamentos, sendo que cada pagamento consome de um saldo cadastrado, desde que este saldo tenha valor restante.

## Instalação

Para instalação deste projeto é necessario ter instalados:
- Git
- Docker
- Mysql

## Como instalar

- Clone o projeto em um diretorio da sua escolha.
![Git clone](https://github.com/frinhanifrinhani/image-repo/blob/main/payments/git_clone.png)
  
- Abra o terminal na raiz do projeto que foi clonado. Confirme que foram clonados os repositórios api e app, que são respectivamente o backend e o frontend.
![Projeto clonado](https://github.com/frinhanifrinhani/image-repo/blob/main/payments/cd_lsla.png) 

- Execute o comando `docker-compose up -d --build`
![Comando docker-compose](https://github.com/frinhanifrinhani/image-repo/blob/main/payments/docker-compose.png)

- Após a execução do docker-compose com sucesso, deverá aparece o resultado de sucesso.
![Comando docker-compose success](https://github.com/frinhanifrinhani/image-repo/blob/main/payments/containers.png)

- Verifique se os dois containers estão iniciados com o comando  `docker ps` 
![Comando docker ps](https://github.com/frinhanifrinhani/image-repo/blob/main/payments/docker-ps.png)


  
