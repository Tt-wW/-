<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <ValidationObserver tag="form" ref="obs">
        <ValidationProvider
          class="content"
          name="phone"
          tag="div"
          rules="required|isPhone"
          v-slot="{ errors }"
        >
          <label>手机号:</label>
          <input type="text" placeholder="请输入你的手机号" v-model="phone" />
          <span class="error-msg">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          class="content"
          name="code"
          tag="div"
          rules="required"
          v-slot="{ errors }"
        >
        <!-- 一般这里会发个请求，这里省略 -->
          <label>验证码:</label>
          <input type="text" placeholder="请输入验证码" v-model="code" />
          <button
            style="height: 38px; width: 100px"
            :disabled="disabled"
            @click="sendCode"
          >
            {{ btnText }}
          </button>
          <span class="error-msg">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          class="content"
          name="password"
          tag="div"
          rules="required"
          v-slot="{ errors }"
          vid="confirmation"
        >
          <label>登录密码:</label>
          <input
            type="text"
            placeholder="请输入你的登录密码"
            v-model="password"
          />
          <span class="error-msg">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          class="content"
          name="password1"
          tag="div"
          rules="required|confirmed:confirmation"
          v-slot="{ errors }"
        >
          <label>确认密码:</label>
          <input type="text" placeholder="请输入确认密码" v-model="password1" />
          <span class="error-msg">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          name="isCheck"
          tag="div"
          rules="required|isCheck"
          v-slot="{ errors }"
          class="controls"
        >
          <input type="checkbox" v-model="agree" />
          <span>同意协议并注册《尚品汇用户协议》</span>
          <span class="error-msg">{{ errors[0] }}</span>
        </ValidationProvider>
      </ValidationObserver>

      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      time: 60,
      btnText: "发送验证码",
      disabled: false,
      // 表单数据
      phone: "",
      code: "",
      password: "",
      password1: "",
      agree: true,
    };
  },
  methods: {
    sendCode() {
      this.time = 60;
      this.timer();
      this.$store.dispatch("getCode", this.phone);
    },
    timer() {
      if (this.time > 0) {
        this.disabled = true;
        this.time--;
        this.btnText = `(${this.time})s后重新发送`;
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btnText = "发送验证码";
        this.disabled = false;
      }
    },
    async userRegister() {
      const isValid = await this.$refs.obs.validate();
      if (!isValid) {
        // 没有通过校验
        console.log("no");
        return false;
      }
      const { phone, password, code } = this;

      await this.$store
        .dispatch("userRegister", { phone, code, password })
        .then(
          () => {
            this.$router.push({ name: "login", query: { phone } });
          },
          (error) => {
            console.log(error);
            return Promise.reject(new Error(error));
          }
        );
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>