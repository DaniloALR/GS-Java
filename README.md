# 🚀 Plataforma de Upskilling/Reskilling 2030+

<div align="center">

![Java](https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.0-brightgreen?style=for-the-badge&logo=springboot)
![H2 Database](https://img.shields.io/badge/H2-Database-lightgrey?style=for-the-badge&logo=h2)

Solução completa para preparação profissional para as carreiras do futuro

Instalação • Documentação da API • Testes

</div>

## 📋 Sobre o Projeto

### 🧠 Contexto
O futuro do trabalho está sendo transformado por tecnologias como IA, automação, análise de dados e ambientes híbridos/remotos. Esta plataforma aborda as necessidades críticas de:

- Reskilling — Requalificação de profissionais  
- Upskilling — Aperfeiçoamento contínuo  
- Educação Permanente — Competências do futuro  

### 💡 Solução
API RESTful para uma plataforma de Upskilling/Reskilling com gestão de usuários e trilhas personalizadas.

---

## 🛠 Tecnologias

- Java 21  
- Spring Boot 3.2.0  
- Spring Data JPA  
- H2 Database (Dev)  
- MySQL (Prod)  
- Maven  
- RESTful API  

---

## 🚀 Instalação e Execução

Pré-requisitos:  
- Java 21+  
- Maven 3.6+  
- Git  

Passo a passo:

1. Clone o repositório  
git clone https://github.com/seu-usuario/upskilling-platform.git  
cd upskilling-platform  

2. Instale dependências  
mvn clean install  

3. Execute a aplicação  
mvn spring-boot:run  

4. Acesse no navegador:  
http://localhost:8080

---

## 📚 Documentação da API

Swagger UI:  
http://localhost:8080/swagger-ui/index.html

Recursos principais:
- /usuarios — CRUD de usuários  
- /trilhas — Trilhas de aprendizado  
- /inscricoes — Inscrições de usuários nas trilhas  

---

## 🧪 Testando a API

Rodar testes:  
mvn test

---

## 📦 Banco de Dados

Ambiente Dev (H2)  
Console H2:  
http://localhost:8080/h2-console  

JDBC URL: jdbc:h2:mem:testdb  
Usuário: sa  
Senha: (vazia)

Ambiente Prod (MySQL) — variáveis necessárias:  
DB_HOST=  
DB_USER=  
DB_PASS=  
DB_NAME=

---

## 🤝 Contribuição

1. Faça um fork  
2. Crie uma branch (feature/minha-feature)  
3. Commit (git commit -m "feat: minha nova funcionalidade")  
4. Envie um PR  

---

## 📄 Licença

Este projeto está sob a licença MIT.
