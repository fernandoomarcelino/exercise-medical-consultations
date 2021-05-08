<h1 align="center">
System for Medical Clinic and Appointment.</h1>

<p align="center">
  <img src="src/assets/img/brand/angular.png" alt="angular-logo" width="120px" height="120px"/>
  <br>
  <i>Angular is a development platform for building mobile and desktop web applications
    <br> using Typescript/JavaScript and other languages.</i>
  <br>
</p>


<p align="center">
  <a href="#Objective">Objective</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Installation">Installation</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>


## Objective
the goal is to solve a challenge. In short, a system that the user can register, login, mark and unmark consultation. Below original specification (pt-BR) 

#### Fluxo na marcação de consultas

1. O paciente escolhe a especialidade desejada para a consulta (ex: Dermatologista)
2. Com isso, deverão aparecer todos os médicos da especialidade escolhida para que o paciente possa selecionar
3. Uma vez escolhido o médico desejado, deverão aparecer os dias em que o médico está disponível para realizar uma consulta
4. Ao selecionar um dia específico, deverão aparecer os horário disponíveis do médico para a data escolhida
5. Ao final deste processo, o paciente poderá confirmar a marcação da consulta e voltar para a tela de listagem

#### Criar usuário
É necessário implementar a criação de usuário para acesso ao sistema

#### Obter token
Após criar um usuário é preciso implementar login para obter token para utilizar a API





#### Requisitos

* Não devem existir dois clientes com o mesmo email.
* O produto deve possuir foto.
* Os dados devem ser validados.
* O sistema deve conter uma série de tipos de produtos já definidos.
* O pedido deve contemplar N produtos.
* O cliente pode contemplar N pedidos.
* Os registros devem conter a funcionalidade de soft deleting.
* Padronização PSR
* Nomenclatura de classes, métodos e rotas no padrão americano.
* Não é necessário utilizar padrão de autenticação (ex. OAuth) para consumir a API

#### Fonte
- [test](https://github.com/Intmed-Software/desafio/tree/master/frontend)

## Installation
###### NodeJs + npm
```bash
$ sudo apt-get install nodejs
```

###### Angular CLI
Install the Angular CLI globally using a terminal/console window.
- To get `Angular`, go to [Angular.io](https://angular.io/).
```bash
npm install -g @angular/cli
```

###### Clone repo
``` bash
# Download
$ git clone https://github.com/fernandoomarcelino/exercise-medical-consultations.git
```

###### Install dependencies
``` bash
# Access the directory
cd exercise-medical-consultations

# install
npm i
```

###### Run the application:
``` bash
ng serve
```

## structure
I separated the architecture into: 
* container - reserved for layouts
* core - everything used for application as a whole. is loaded only once.
* shared - what is shared among the components of the application
* views - the pages (components)

I needed to set up a proxy to access the API server due to CORS.

## extras
I added to the requirements:
 * Proxy configuration (local and production)
 * Deploy production in heroku
 * Authentication with data storage in Local Storage
 * Lazy loading
 * Reactive Forms
 * (Guards) Routes
 * Angular interceptor
 * ngx-toastr
 * ngx-spinner
 * bootstrap
 * Angular Material
 * Font Awesome
 * Font Awesome

## Tests
* [Demo Video - Registration Cypress Test](https://exercise-medical-consultations.herokuapp.com/assets/cypress/register.ts.mp4)

### Cypress tests
```bash
# execute test with interface
npx cypress open

# execute test in terminal
npx cypress run
```

## Demo
* [Demo](https://exercise-medical-consultations.herokuapp.com/)
