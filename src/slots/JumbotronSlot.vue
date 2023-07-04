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
}

form {
    margin: 10px auto 20px;
    width: 35rem;
    text-align: center;
}
#email {
    padding: 70px 70px 40px 60px;
    font-size: 15px;
    font-weight: bold;
}
.email {
    height: 38px;
    /* margin: 10px 0; */
    width: 19.8rem;
    outline: none;
    border: none;
    margin-left: 5px;
    padding-left: 10px;
}
#password, #user-type {
    padding: 0px 30px 30px 55px;
    font-size: 15px;
    font-weight: bold;
}
.password, .user-type {
    height: 38px;
    margin: 10px 0;
    border: none;
    outline: none;
    width: 20rem;
    margin-left: 20px;
    appearance: none;
    padding-left: 10px;
}
.signup_btn, .login_btn {
    width: 100px;
    margin: 20px 0;
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

</style>