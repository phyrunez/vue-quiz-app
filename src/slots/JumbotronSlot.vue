<template>
    <div class="jump">
        <slot></slot>
    </div>
</template>

<style scoped>
.jump {
    background: #0c7988;
    color: white;
    padding: 25px;
    width: 50%;
    margin: 13rem auto 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}

.jump h3 {
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    font-size: 30px;
}

form {
    margin: 50px auto 20px;
    width: 35rem;
    font-size: 16px;
}

.btn_wrapper {
    text-align: center;
}
.signup_btn, .login_btn {
    width: 100px;
    margin: 20px auto;
    padding: 10px;
    font-size: 15px;
    color: white;
    background: brown;
    border-color: transparent;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.5s;
}
.signup_btn span,
.login_btn span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.signup_btn span:after,
.login_btn span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.signup_btn:hover span,
.login_btn:hover span {
  padding-right: 20px;
}

.signup_btn:hover span:after,
.login_btn:hover span:after  {
  opacity: 1;
  right: 0;
}
.link_active {
    text-decoration: none;
    padding-left: 5px;
    font-size: 17px;
    color: brown
}

@media screen and (max-width: 1216px) {
    .jump {
        width: 100%;
    }
}

@media screen and (max-width: 1025px) {
    .jump {
        width: 100%;
        margin: 5rem auto 0;
    }
}

@media screen and (max-width: 913px) {
    .jump {
        width: 100%;
    }
}


@media screen and (max-width: 821px) {
    .jump {
        width: 100%;
    }
}


@media screen and (max-width: 769px) {
    .jump {
        width: 100%;
    }
}

@media screen and (max-width: 583px) {
    .jump {
        width: 100% !important;
        margin: 9rem auto 0;
    }
}

@media screen and (max-width: 541px) {
    .jump {
        width: 100% !important;
        margin: 9rem auto 0;
    }
}

@media screen and (max-width: 516px) {
    .jump {
        width: 100% !important;
        margin: 9rem auto 0;
    }
}

@media screen and (max-width: 480px) {
    .jump {
        width: 100% !important;
        margin: 9rem auto 0;
    }
}

@media screen and (max-width: 426px) {
    .jump {
        width: 100%;
    }
}

@media screen and (max-width: 281px) {
    .jump {
        width: 10rem;
    }
}

</style>